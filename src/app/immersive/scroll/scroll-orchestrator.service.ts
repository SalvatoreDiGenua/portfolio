import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CameraRigService, CameraTargetName } from '../camera/camera-rig.service';
import { AssemblyController } from '../animation/assembly-controller';

export interface SectionTelemetry {
  id: string;
  step: number;
  target: CameraTargetName;
  title: string;
  tag: string;
  code: string;
  desc: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScrollOrchestratorService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cameraRig = inject(CameraRigService);
  private readonly assembly = inject(AssemblyController);

  readonly sectionsConfig: SectionTelemetry[] = [
    {
      id: 'top',
      step: 0,
      target: 'overview',
      title: 'Scheda Madre & Architettura',
      tag: 'SYSTEM_POST',
      code: '0x00_INIT',
      desc: 'Inizializzazione del bus di sistema, architettura zoneless e stack tecnologico reattivo.',
    },
    {
      id: 'about',
      step: 1,
      target: 'cpu',
      title: 'CPU Core Architecture',
      tag: 'CORE_ENGINE',
      desc: 'Salvatore Di Genua - Senior Frontend Engineer. Socket ZIF e die in silicio con logica e leadership tecnica.',
      code: '0x01_SOCKET_LOCKED',
    },
    {
      id: 'skills',
      step: 2,
      target: 'ram',
      title: 'DDR5 Reactive Memory',
      tag: 'RAM_CHANNELS',
      desc: 'Banchi memoria ad altissimo throughput: Angular Signals, RxJS, NgRx, TypeScript e performance UI.',
      code: '0x02_SIGNALS_ACTIVE',
    },
    {
      id: 'experience',
      step: 3,
      target: 'nvme',
      title: 'M.2 Persistent Storage',
      tag: 'STORAGE_NVME',
      desc: 'Memoria persistente ad alta affidabilità: esperienza su larga scala in Orbyta, SCAI e ACCA Software.',
      code: '0x03_PERSISTENT_MEM',
    },
    {
      id: 'projects',
      step: 4,
      target: 'gpu',
      title: 'PCIe Graphics & Output',
      tag: 'EXPANSION_BUS',
      desc: 'Librerie open-source, micro-frontends e visual performance: ngx-request-lock e angular-boilerplate.',
      code: '0x04_PERFORMANCE_MAX',
    },
    {
      id: 'education',
      step: 5,
      target: 'chipset',
      title: 'Power Delivery & VRM',
      tag: 'VRM_DELIVERY',
      desc: 'Fondamenta accademiche, laurea, master e formazione continua a supporto della stabilità architetturale.',
      code: '0x05_ACADEMIC_BASE',
    },
    {
      id: 'contact',
      step: 6,
      target: 'contact',
      title: 'I/O Connectivity & POST Ready',
      tag: 'CONNECTIVITY',
      desc: 'Porte I/O pronte per nuove collaborazioni: canale email, LinkedIn e terminale attivo.',
      code: '0x00_DEPLOY_READY',
    },
  ];

  readonly activeTelemetry = signal<SectionTelemetry>(this.sectionsConfig[0]);
  private observer: IntersectionObserver | null = null;
  private scrollListener: (() => void) | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.disconnect();

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-15% 0px -25% 0px',
      threshold: [0.1, 0.3, 0.6],
    };

    this.observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const topEntry = visibleEntries[0];
      const sectionId = topEntry.target.id;

      const config = this.sectionsConfig.find((s) => s.id === sectionId);
      if (config) {
        this.transitionToSection(config);
      }
    }, options);

    this.sectionsConfig.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        this.observer?.observe(el);
      }
    });

    // Boundary check for scroll extremes (top and bottom of page)
    let scrollTicking = false;
    this.scrollListener = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          if (scrollY < 180) {
            this.transitionToSection(this.sectionsConfig[0]);
          } else if (
            window.innerHeight + scrollY >=
            document.documentElement.scrollHeight - 120
          ) {
            this.transitionToSection(this.sectionsConfig[this.sectionsConfig.length - 1]);
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  transitionToSection(config: SectionTelemetry): void {
    if (this.activeTelemetry().id === config.id) return;

    this.activeTelemetry.set(config);
    this.cameraRig.setTarget(config.target);
    this.assembly.setAssemblyStep(config.step);
  }

  jumpToSection(id: string): void {
    const config = this.sectionsConfig.find((s) => s.id === id);
    if (config) {
      this.transitionToSection(config);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
  }
}
