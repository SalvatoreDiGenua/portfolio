import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/shared/services/theme.service';
import { scrollToElement, unsubscribe } from 'src/shared/utility/utility';
import * as THREE from 'three';

@Component({
  selector: 'sdg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  private subOnChangedTheme: Subscription;

  constructor(private themeService: ThemeService) { }

  ngAfterViewInit() {
    // this.subOnChangedTheme = this.themeService.onThemeChanged.subscribe(() => this.buildScene());
  }

  buildScene() {
    const style = getComputedStyle(document.body)

    const background_waves_background_color = `${style.getPropertyValue('--sdg-color-1')}`.trim();
    const background_waves_mesh_color = `${style.getPropertyValue('--sdg-color-4')}`.trim();

    // altezza delle montagne
    const vertex_height = 18_000;
    // densità montagne
    const plane_segments_size = 90;
    // altezza animazione
    const plane_size = 942000;
    const container: Element = document.querySelector('.sdg-home__three-animation');
    const canvas = container.getElementsByTagName('canvas')[0];
    if (canvas) { canvas.remove(); }
    const inital_Z: number[] = [];
    let count = 0;
    const aspectRatio = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(55, aspectRatio, 1, 400000);
    camera.position.z = 10000;
    camera.position.y = 10000;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(background_waves_background_color, 1, 300000);
    const geometry = new THREE.PlaneGeometry(plane_size, plane_size, plane_segments_size, plane_segments_size);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color: background_waves_mesh_color,
      wireframe: true
    }));
    mesh.rotation.x -= Math.PI * .5;
    scene.add(mesh);
    const renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(background_waves_background_color, 1);
    container.appendChild(renderer.domElement);

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      const z = Math.random() * vertex_height - vertex_height;
      geometry.attributes['position'].setZ(i, z);
      inital_Z[i] = z;
    }

    const render = () => {
      requestAnimationFrame(render);
      const x = camera.position.x;
      const z = camera.position.z;
      camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
      camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
      camera.lookAt(new THREE.Vector3(0, 9000, 0))
      for (let i = 0; i < geometry.attributes['position'].count; i++) {
        const next_z = Math.sin((i + count * 0.00002)) * (inital_Z[i] - (inital_Z[i] * 0.6));
        if (next_z !== next_z) return;
        geometry.attributes['position'].setZ(i, next_z);
        geometry.attributes['position'].needsUpdate = true;
        count += 0.075
      }
      renderer.render(scene, camera)
    }
    render();

    const resize = () => {
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', resize, false)
  }

  scrollToElement(id: string) {
    scrollToElement(id);
  }

  ngOnDestroy() {
    unsubscribe(this.subOnChangedTheme);
  }
}
