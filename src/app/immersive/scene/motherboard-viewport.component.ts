import {
  Component,
  ElementRef,
  viewChild,
  afterNextRender,
  inject,
  PLATFORM_ID,
  DestroyRef,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MotherboardSceneService } from './motherboard-scene.service';
import { CameraRigService } from '../camera/camera-rig.service';
import { AssemblyController } from '../animation/assembly-controller';
import { ScrollOrchestratorService } from '../scroll/scroll-orchestrator.service';

@Component({
  selector: 'app-motherboard-viewport',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Fixed 3D Canvas Stage -->
    <div
      class="fixed inset-0 z-0 w-full h-full transition-opacity duration-700 overflow-hidden"
      [ngClass]="{
        'pointer-events-auto': isFreeOrbitMode(),
        'pointer-events-none': !isFreeOrbitMode()
      }"
      (mousemove)="onMouseMove($event)"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
    >
      <canvas
        #canvasRef
        class="h-full w-full block outline-none cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      ></canvas>

      <!-- Ambient dark radial gradients for text contrast (lets 3D show through nicely) -->
      <div
        class="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Floating HUD Hardware Telemetry Dock (Always visible, responsive) -->
    <aside
      aria-label="3D Hardware Assembly Telemetry"
      class="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-24px)] sm:max-w-md transition-all duration-300 pointer-events-auto"
    >
      <div
        class="rounded-2xl border border-brand-500/25 bg-ink-950/85 p-3 sm:p-4 backdrop-blur-xl shadow-2xl shadow-black/80"
      >
        <!-- Header: Status indicator & Mode switch -->
        <div class="flex items-center justify-between gap-3 mb-2">
          <div class="flex items-center gap-2">
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"
              ></span>
            </span>
            <span class="font-mono text-xs font-bold uppercase tracking-wider text-brand-300">
              {{ scrollOrchestrator.activeTelemetry().tag }}
            </span>
            <span
              class="hidden sm:inline-block font-mono text-[10px] text-content-muted border-l border-white/10 pl-2"
            >
              {{ scrollOrchestrator.activeTelemetry().code }}
            </span>
          </div>

          <!-- Free Orbit Interaction Toggle -->
          <button
            type="button"
            (click)="toggleFreeOrbit()"
            class="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-mono font-medium text-content-primary transition-all hover:border-brand-400/50 hover:bg-brand-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400"
            [ngClass]="{
              'bg-brand-600 text-white border-brand-400 shadow-glow-brand': isFreeOrbitMode(),
              'bg-ink-900/80': !isFreeOrbitMode()
            }"
            [title]="
              isFreeOrbitMode()
                ? 'Torna alla modalità scrollytelling'
                : 'Abilita rotazione interattiva del modello 3D'
            "
          >
            <svg
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <span>{{ isFreeOrbitMode() ? 'Blocca 3D' : 'Ispeziona 3D' }}</span>
          </button>
        </div>

        <!-- Description of currently focused component -->
        <p class="text-xs text-content-secondary line-clamp-2 leading-relaxed mb-2.5">
          {{ scrollOrchestrator.activeTelemetry().desc }}
        </p>

        <!-- Hardware Assembly Stage Progress Bar -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[10px] font-mono text-content-muted">
            <span>Fase di Montaggio</span>
            <span class="text-brand-300 font-semibold">
              0{{ scrollOrchestrator.activeTelemetry().step + 1 }} / 07
            </span>
          </div>
          <div class="flex gap-1 h-1.5 w-full">
            @for (sec of scrollOrchestrator.sectionsConfig; track sec.id; let idx = $index) {
              <div
                class="flex-1 rounded-full transition-all duration-500"
                [ngClass]="{
                  'bg-brand-400 shadow-glow-brand': idx <= scrollOrchestrator.activeTelemetry().step,
                  'bg-white/10': idx > scrollOrchestrator.activeTelemetry().step
                }"
              ></div>
            }
          </div>
        </div>

        <!-- Component Quick Waypoint Jump Pills (Horizontal scrollable) -->
        <div class="mt-2.5 flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
          @for (sec of scrollOrchestrator.sectionsConfig; track sec.id) {
            <button
              type="button"
              (click)="scrollOrchestrator.jumpToSection(sec.id)"
              class="px-2 py-1 rounded-md text-[10px] font-mono whitespace-nowrap transition-all duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent-400"
              [ngClass]="{
                'bg-brand-500/30 text-brand-300 border border-brand-400/50 font-semibold':
                  scrollOrchestrator.activeTelemetry().id === sec.id,
                'text-content-muted hover:text-white hover:bg-white/[0.06]':
                  scrollOrchestrator.activeTelemetry().id !== sec.id
              }"
            >
              {{ sec.tag }}
            </button>
          }
        </div>
      </div>
    </aside>
  `,
  styles: [
    `
      .bg-radial-vignette {
        background: radial-gradient(
          circle at center,
          transparent 20%,
          rgba(7, 10, 8, 0.4) 60%,
          rgba(7, 10, 8, 0.9) 100%
        );
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `,
  ],
})
export class MotherboardViewportComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sceneService = inject(MotherboardSceneService);
  private readonly cameraRig = inject(CameraRigService);
  readonly assembly = inject(AssemblyController);
  readonly scrollOrchestrator = inject(ScrollOrchestratorService);

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');
  readonly isFreeOrbitMode = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas) return;

      // 1. Initialize 3D Engine
      this.sceneService.init(canvas);

      // 2. Initialize Scrollytelling Orchestrator
      this.scrollOrchestrator.init();

      // 3. Handle window resize
      const handleResize = () => {
        this.sceneService.resize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // 4. Subtle mouse parallax on body
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!this.isFreeOrbitMode()) {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          this.sceneService.setPointer(x, y);
        }
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        this.scrollOrchestrator.disconnect();
        this.sceneService.dispose();
      });
    });
  }

  toggleFreeOrbit(): void {
    this.isFreeOrbitMode.update((v) => !v);
  }

  onMouseMove(e: MouseEvent): void {
    if (this.isFreeOrbitMode()) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      this.sceneService.setPointer(x, y);
    }
  }

  onTouchStart(_e: TouchEvent): void {
    //
  }

  onTouchMove(e: TouchEvent): void {
    if (this.isFreeOrbitMode() && e.touches.length > 0) {
      const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      const y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      this.sceneService.setPointer(x, y);
    }
  }
}
