import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe],
  template: `
    <section
      id="projects"
      class="relative border-t border-white/[0.06] bg-ink-900/40 py-24 sm:py-32"
      aria-labelledby="projects-title"
    >
      <div
        class="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary-600/10 blur-[130px]"
        aria-hidden="true"
      ></div>

      <div class="section-container relative z-10">
        <div class="mb-12 flex flex-col gap-2">
          <span class="section-label">
            <span class="h-1.5 w-1.5 rounded-full bg-primary-400"></span>
            {{ 'projects.label' | transloco }}
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl">
            {{ 'projects.title' | transloco }}
          </h2>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article class="card-highlight group flex flex-col justify-between">
            <div>
              <div class="mb-4 flex items-start justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div>
                  <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-300">01 — Angular</span>
                  <h3 class="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">angular-boilerplate</h3>
                </div>
                <span class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary-500/20 bg-primary-500/10 text-primary-300" aria-hidden="true">↗</span>
              </div>

              <p class="text-sm leading-relaxed text-slate-300/90 sm:text-base">{{ 'projects.angular.description' | transloco }}</p>

              <div class="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                <span class="chip-accent">Angular</span><span class="chip-accent">Signals</span><span class="chip">SSR</span><span class="chip">Hydration</span><span class="chip">Tailwind CSS</span>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-2">
              <a class="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent-400 transition-colors hover:text-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400" href="https://github.com/SalvatoreDiGenua/angular-boilerplate" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'projects.viewProject' | transloco">
                {{ 'projects.viewProject' | transloco }} <span aria-hidden="true">↗</span>
              </a>
              <span class="text-slate-600" aria-hidden="true">/</span>
              <a class="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-primary-300 transition-colors hover:text-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300" href="https://stackblitz.com/fork/github/SalvatoreDiGenua/angular-boilerplate/tree/main?startScript=start&title=Angular%20Boilerplate" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'projects.liveDemo' | transloco">
                {{ 'projects.liveDemo' | transloco }} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article class="card group flex flex-col justify-between">
            <div>
              <div class="mb-4 flex items-start justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div>
                  <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-300">02 — Angular Library</span>
                  <h3 class="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">ngx-request-lock</h3>
                </div>
                <span class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-500/20 bg-accent-500/10 text-accent-300" aria-hidden="true">↗</span>
              </div>

              <p class="text-sm leading-relaxed text-slate-300/90 sm:text-base">{{ 'projects.requestLock.description' | transloco }}</p>

              <div class="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                <span class="chip-accent">Angular</span><span class="chip-accent">Signals</span><span class="chip">HttpClient</span><span class="chip">Interceptors</span>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-2">
              <a class="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent-400 transition-colors hover:text-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400" href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'projects.viewProject' | transloco">
                {{ 'projects.viewProject' | transloco }} <span aria-hidden="true">↗</span>
              </a>
              <span class="text-slate-600" aria-hidden="true">/</span>
              <a class="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-primary-300 transition-colors hover:text-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300" href="https://ngx-request-lock-docs.netlify.app/" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'projects.liveDemo' | transloco">
                {{ 'projects.liveDemo' | transloco }} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {}
