import { Injectable } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';

export type CameraTargetName =
  | 'overview'
  | 'cpu'
  | 'ram'
  | 'nvme'
  | 'gpu'
  | 'chipset'
  | 'contact';

export interface CameraWaypoint {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fovDesktop: number;
  fovMobile: number;
}

@Injectable({
  providedIn: 'root',
})
export class CameraRigService {
  private camera!: THREE.PerspectiveCamera;

  // Waypoints tuned for each section of the portfolio
  private readonly waypoints: Record<CameraTargetName, CameraWaypoint> = {
    overview: {
      // Hero: Aerial macro overview
      position: new THREE.Vector3(0, 22, 18),
      target: new THREE.Vector3(0, 0, 1),
      fovDesktop: 42,
      fovMobile: 58,
    },
    cpu: {
      // About: Close-up on the CPU Socket & Silicon Die
      position: new THREE.Vector3(0, 8.5, 5.0),
      target: new THREE.Vector3(-2, 0.4, -2),
      fovDesktop: 38,
      fovMobile: 52,
    },
    ram: {
      // Skills: Dual-channel DDR5 DIMM slots
      position: new THREE.Vector3(6.5, 9.0, 4.0),
      target: new THREE.Vector3(4, 1.2, -2),
      fovDesktop: 38,
      fovMobile: 50,
    },
    nvme: {
      // Experience: M.2 NVMe PCIe SSD slot
      position: new THREE.Vector3(5.5, 7.5, 9.0),
      target: new THREE.Vector3(3.5, 0.6, 3.5),
      fovDesktop: 36,
      fovMobile: 48,
    },
    gpu: {
      // Projects: PCIe x16 GPU expansion card & fans
      position: new THREE.Vector3(0, 8.0, 11.5),
      target: new THREE.Vector3(-2, 1.5, 4.5),
      fovDesktop: 40,
      fovMobile: 54,
    },
    chipset: {
      // Education: Southbridge chipset & VRM power delivery
      position: new THREE.Vector3(8.0, 9.0, 11.0),
      target: new THREE.Vector3(6.0, 0.6, 6.0),
      fovDesktop: 38,
      fovMobile: 50,
    },
    contact: {
      // Contact: I/O Shield & POST Diagnostic LEDs
      position: new THREE.Vector3(-4.0, 10.0, 15.0),
      target: new THREE.Vector3(2.0, 0.5, 2.0),
      fovDesktop: 40,
      fovMobile: 54,
    },
  };

  private currentTargetName: CameraTargetName = 'overview';
  private currentLookAt = new THREE.Vector3(0, 0, 1);
  private targetLookAt = new THREE.Vector3(0, 0, 1);
  private targetPosition = new THREE.Vector3(0, 22, 18);

  // Parallax / Orbit interactive offsets
  private parallaxOffset = new THREE.Vector2(0, 0);
  private isMobile = false;

  init(camera: THREE.PerspectiveCamera, isMobileScreen: boolean): void {
    this.camera = camera;
    this.isMobile = isMobileScreen;
    this.setTarget('overview', true);
  }

  updateScreenSize(width: number, height: number): void {
    this.isMobile = width < 768 || width < height;
    if (!this.camera) return;

    this.camera.aspect = width / height;
    const waypoint = this.waypoints[this.currentTargetName];
    const targetFov = this.isMobile ? waypoint.fovMobile : waypoint.fovDesktop;

    gsap.to(this.camera, {
      fov: targetFov,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix(),
    });

    // Re-adjust camera distance if portrait mobile
    if (this.isMobile && width < height) {
      const portraitMultiplier = Math.min(1.4, Math.max(1.1, (height / width) * 0.7));
      const basePos = waypoint.position.clone();
      basePos.y *= portraitMultiplier;
      basePos.z *= portraitMultiplier;
      gsap.to(this.targetPosition, {
        x: basePos.x,
        y: basePos.y,
        z: basePos.z,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }

  setTarget(targetName: CameraTargetName, immediate = false): void {
    this.currentTargetName = targetName;
    const waypoint = this.waypoints[targetName];
    if (!waypoint || !this.camera) return;

    const aspect = this.camera.aspect;
    const isPortrait = aspect < 1;
    const targetFov = this.isMobile ? waypoint.fovMobile : waypoint.fovDesktop;

    const basePos = waypoint.position.clone();
    if (isPortrait) {
      const mult = Math.min(1.35, 1 / Math.max(0.6, aspect));
      basePos.y *= mult;
      basePos.z *= mult;
    }

    if (immediate) {
      this.camera.fov = targetFov;
      this.camera.updateProjectionMatrix();
      this.camera.position.copy(basePos);
      this.targetPosition.copy(basePos);
      this.currentLookAt.copy(waypoint.target);
      this.targetLookAt.copy(waypoint.target);
      this.camera.lookAt(this.currentLookAt);
      return;
    }

    // Smooth cinematic transition
    gsap.to(this.camera, {
      fov: targetFov,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => this.camera.updateProjectionMatrix(),
    });

    gsap.to(this.targetPosition, {
      x: basePos.x,
      y: basePos.y,
      z: basePos.z,
      duration: 1.5,
      ease: 'power3.out',
    });

    gsap.to(this.targetLookAt, {
      x: waypoint.target.x,
      y: waypoint.target.y,
      z: waypoint.target.z,
      duration: 1.5,
      ease: 'power3.out',
    });
  }

  setParallax(normalizedX: number, normalizedY: number): void {
    const intensity = this.isMobile ? 0.6 : 1.2;
    this.parallaxOffset.x = normalizedX * intensity;
    this.parallaxOffset.y = -normalizedY * intensity;
  }

  update(): void {
    if (!this.camera) return;

    // Damp camera position towards targetPosition + parallax
    const finalTargetPos = this.targetPosition.clone();
    finalTargetPos.x += this.parallaxOffset.x;
    finalTargetPos.y += this.parallaxOffset.y * 0.5;

    this.camera.position.lerp(finalTargetPos, 0.08);

    // Damp lookAt
    this.currentLookAt.lerp(this.targetLookAt, 0.08);
    this.camera.lookAt(this.currentLookAt);
  }

  getCurrentTarget(): CameraTargetName {
    return this.currentTargetName;
  }
}
