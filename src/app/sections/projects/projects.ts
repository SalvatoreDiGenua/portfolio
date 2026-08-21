import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe],
  template: `
    <section
      id="projects"
      class="section-container py-24 sm:py-32"
      aria-labelledby="projects-title"
    >
      <div class="mb-14 flex flex-col gap-2">
        <span class="section-label">
          <span class="h-1.5 w-1.5 rounded-full bg-primary-400"></span>
          {{ 'projects.label' | transloco }}
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl">
          {{ 'projects.title' | transloco }}
        </h2>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <article
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.05]"
        >
          <div
            class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20"
          ></div>
          <div class="relative flex h-full flex-col">
            <div class="flex items-start justify-between gap-4">
              <span
                class="text-xs font-semibold uppercase tracking-[0.18em] text-primary"
                >01</span
              >
              <span
                class="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                >Angular</span
              >
            </div>
            <h3 class="mt-6 text-2xl font-semibold text-white">
              angular-boilerplate
            </h3>
            <p class="mt-4 flex-1 text-sm leading-7 text-slate-400">
              {{ 'projects.angular.description' | transloco }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span>Angular</span><span>Signals</span><span>SSR</span
              ><span>Hydration</span><span>Tailwind CSS</span>
            </div>
            <a
              class="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition hover:text-white"
              href="https://github.com/SalvatoreDiGenua/angular-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ 'projects.viewProject' | transloco }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <article
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.05]"
        >
          <div
            class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20"
          ></div>
          <div class="relative flex h-full flex-col">
            <div class="flex items-start justify-between gap-4">
              <span
                class="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                >02</span
              >
              <span
                class="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs text-accent"
                >Angular Library</span
              >
            </div>
            <h3 class="mt-6 text-2xl font-semibold text-white">
              ngx-request-lock
            </h3>
            <p class="mt-4 flex-1 text-sm leading-7 text-slate-400">
              {{ 'projects.requestLock.description' | transloco }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span>Angular</span><span>Signals</span><span>HttpClient</span
              ><span>Interceptors</span>
            </div>
            <a
              class="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition hover:text-white"
              href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ 'projects.viewProject' | transloco }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {}
