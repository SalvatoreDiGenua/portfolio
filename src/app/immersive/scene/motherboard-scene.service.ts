import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';
import { createMotherboardScene, MotherboardComponents } from '../motherboard/motherboard-geometry';
import { CameraRigService, CameraTargetName } from '../camera/camera-rig.service';
import { AssemblyController } from '../animation/assembly-controller';

@Injectable({
  providedIn: 'root',
})
export class MotherboardSceneService {
  private readonly cameraRig = inject(CameraRigService);
  readonly assembly = inject(AssemblyController);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private components!: MotherboardComponents;

  private animationFrameId: number | null = null;
  private isVisible = true;
  private clock = new THREE.Clock();

  // Mouse / Touch tracking
  private mouse = new THREE.Vector2();

  init(canvas: HTMLCanvasElement): void {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const isMobile = width < 768 || width < height;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = null; // transparent so it blends with dark CSS background

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.cameraRig.init(this.camera, isMobile);

    // 3. Renderer with mobile optimizations
    const pixelRatio = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2.0);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile, // Disable MSAA on mobile for 60fps battery efficiency
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.shadowMap.enabled = !isMobile;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lights
    this.setupLights();

    // 5. Build procedural motherboard
    this.components = createMotherboardScene();
    this.scene.add(this.components.root);

    // 6. Connect assembly controller — start at step 0 (unassembled)
    // The ScrollOrchestratorService drives assembly steps on scroll
    this.assembly.init(this.components);

    // 7. Event Listeners (visibility change for battery preservation)
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // 8. Start Render Loop
    this.clock.start();
    this.startLoop();
  }

  private setupLights(): void {
    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    this.scene.add(ambientLight);

    // Key Light (Main white spotlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(10, 20, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    // Brand Emerald Fill Light (Highlights circuits & PCB)
    const emeraldFill = new THREE.DirectionalLight(0x10b981, 1.5);
    emeraldFill.position.set(-15, 12, -10);
    this.scene.add(emeraldFill);

    // Electric Cyan Point Light near bus traces & southbridge
    const cyanPoint = new THREE.PointLight(0x38bdf8, 2.2, 18);
    cyanPoint.position.set(4, 2.5, 4);
    this.scene.add(cyanPoint);

    // Golden Accent Point Light above CPU socket
    const goldPoint = new THREE.PointLight(0xf59e0b, 1.8, 14);
    goldPoint.position.set(-2, 3.5, -2);
    this.scene.add(goldPoint);
  }

  resize(width: number, height: number): void {
    if (!this.renderer || !this.camera) return;
    this.renderer.setSize(width, height, false);
    this.cameraRig.updateScreenSize(width, height);
  }

  setPointer(normalizedX: number, normalizedY: number): void {
    this.mouse.x = normalizedX;
    this.mouse.y = normalizedY;
    this.cameraRig.setParallax(normalizedX, normalizedY);
  }

  focusComponent(target: CameraTargetName): void {
    this.cameraRig.setTarget(target);
  }

  private handleVisibilityChange = (): void => {
    this.isVisible = !document.hidden;
    if (this.isVisible) {
      this.clock.start();
      this.startLoop();
    } else {
      this.stopLoop();
    }
  };

  private startLoop(): void {
    if (this.animationFrameId !== null) return;

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      if (!this.isVisible) return;

      const delta = this.clock.getDelta();
      const elapsedTime = this.clock.getElapsedTime();

      // Subtle pulse effect on status diagnostic LEDs
      if (this.components?.statusLeds) {
        this.components.statusLeds.forEach((led, idx) => {
          const mat = led.material as THREE.MeshBasicMaterial;
          mat.opacity = 0.6 + Math.sin(elapsedTime * 4 + idx * 1.2) * 0.4;
          mat.transparent = true;
        });
      }

      // Update camera physics
      this.cameraRig.update();

      // Render scene
      this.renderer.render(this.scene, this.camera);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  dispose(): void {
    this.stopLoop();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    if (this.components) {
      this.components.disposableGeometries.forEach((g) => g.dispose());
      this.components.disposableMaterials.forEach((m) => m.dispose());
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}
