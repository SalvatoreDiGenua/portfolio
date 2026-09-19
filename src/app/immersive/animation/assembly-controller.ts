import { Injectable, signal } from '@angular/core';
import gsap from 'gsap';
import { MotherboardComponents } from '../motherboard/motherboard-geometry';

@Injectable({
  providedIn: 'root',
})
export class AssemblyController {
  private components!: MotherboardComponents;
  readonly currentStep = signal<number>(0);
  readonly isAnimating = signal<boolean>(false);

  init(components: MotherboardComponents): void {
    this.components = components;
    this.setAssemblyStep(0, true);
  }

  private prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Sets the assembly progress step (0 = Hero, 1 = About/CPU, 2 = Skills/RAM, 3 = Experience/NVMe, 4 = Projects/GPU, 5 = Education, 6 = Contact)
   */
  setAssemblyStep(step: number, immediate = false): void {
    if (!this.components) return;
    const prevStep = this.currentStep();
    this.currentStep.set(step);

    const { cpuGroup, cpuLever, ram1Group, ram2Group, nvmeGroup, gpuGroup } = this.components;
    const noMotion = immediate || this.prefersReducedMotion();

    // 1. CPU Component (mounts if step >= 1)
    if (step >= 1) {
      if (noMotion) {
        cpuGroup.position.set(-2, 0.25, -2);
        cpuGroup.rotation.set(0, 0, 0);
        cpuLever.rotation.z = 0;
      } else if (prevStep < 1) {
        gsap.to(cpuGroup.position, {
          y: 0.25,
          duration: 0.8,
          ease: 'power3.inOut',
        });
        gsap.to(cpuGroup.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
        gsap.to(cpuLever.rotation, {
          z: 0,
          duration: 0.35,
          delay: 0.7,
          ease: 'bounce.out',
        });
      }
    } else {
      // Step 0: CPU unassembled/hovering
      if (noMotion) {
        cpuGroup.position.set(-2, 5.5, -2);
        cpuGroup.rotation.set(0.1, 0.2, -0.1);
        cpuLever.rotation.z = -Math.PI / 3;
      } else if (prevStep >= 1) {
        gsap.to(cpuLever.rotation, {
          z: -Math.PI / 3,
          duration: 0.3,
          ease: 'power2.inOut',
        });
        gsap.to(cpuGroup.position, {
          y: 5.5,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out',
        });
      }
    }

    // 2. RAM Sticks (mount if step >= 2)
    if (step >= 2) {
      if (noMotion) {
        ram1Group.position.set(3.4, 0.4, -2);
        ram1Group.rotation.set(0, 0, 0);
        ram2Group.position.set(4.6, 0.4, -2);
        ram2Group.rotation.set(0, 0, 0);
      } else if (prevStep < 2) {
        gsap.to(ram1Group.position, {
          y: 0.4,
          duration: 0.6,
          ease: 'back.out(1.4)',
        });
        gsap.to(ram1Group.rotation, {
          z: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to(ram2Group.position, {
          y: 0.4,
          duration: 0.6,
          delay: 0.15,
          ease: 'back.out(1.4)',
        });
        gsap.to(ram2Group.rotation, {
          z: 0,
          duration: 0.6,
          delay: 0.15,
          ease: 'power2.out',
        });
      }
    } else {
      // Step < 2: RAM unassembled/hovering
      if (noMotion) {
        ram1Group.position.set(3.4, 4.8, -2);
        ram1Group.rotation.set(0, 0, 0.08);
        ram2Group.position.set(4.6, 5.8, -2);
        ram2Group.rotation.set(0, 0, 0.08);
      } else if (prevStep >= 2) {
        gsap.to(ram1Group.position, {
          y: 4.8,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to(ram2Group.position, {
          y: 5.8,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }

    // 3. M.2 NVMe SSD (mounts if step >= 3)
    if (step >= 3) {
      if (noMotion) {
        nvmeGroup.position.set(3.5, 0.25, 3.3);
        nvmeGroup.rotation.set(0, 0, 0);
      } else if (prevStep < 3) {
        gsap.to(nvmeGroup.position, {
          y: 0.25,
          duration: 0.6,
          ease: 'power2.inOut',
        });
        gsap.to(nvmeGroup.rotation, {
          x: 0,
          duration: 0.6,
          ease: 'bounce.out',
        });
      }
    } else {
      if (noMotion) {
        nvmeGroup.position.set(3.5, 1.8, 3.3);
        nvmeGroup.rotation.set(-Math.PI / 8, 0, 0);
      } else if (prevStep >= 3) {
        gsap.to(nvmeGroup.position, {
          y: 1.8,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(nvmeGroup.rotation, {
          x: -Math.PI / 8,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }

    // 4. PCIe x16 GPU (mounts if step >= 4)
    if (step >= 4) {
      if (noMotion) {
        gpuGroup.position.set(-2, 0.4, 4.5);
        gpuGroup.rotation.set(0, 0, 0);
      } else if (prevStep < 4) {
        gsap.to(gpuGroup.position, {
          y: 0.4,
          duration: 0.7,
          ease: 'back.out(1.3)',
        });
        gsap.to(gpuGroup.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      }
    } else {
      if (noMotion) {
        gpuGroup.position.set(-2, 6.0, 4.5);
        gpuGroup.rotation.set(0.1, 0, 0.05);
      } else if (prevStep >= 4) {
        gsap.to(gpuGroup.position, {
          y: 6.0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }
  }

  isFullyAssembled(): boolean {
    return this.currentStep() >= 4;
  }
}
