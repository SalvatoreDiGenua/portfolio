import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PROJECTS } from '../../core/profile.data';

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
          <h2 id="projects-title" class="text-3xl sm:text-4xl lg:text-5xl">
            {{ 'projects.title' | transloco }}
          </h2>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          @for (project of projects; track project.name; let index = $index) {
            <article
              class="group flex flex-col justify-between"
              [class.card-highlight]="project.accent === 'primary'"
              [class.card]="project.accent === 'accent'"
            >
              <div>
                <div
                  class="mb-4 flex items-start justify-between gap-4 border-b border-white/[0.06] pb-4"
                >
                  <div>
                    <span
                      class="font-mono text-[10px] font-semibold uppercase tracking-wider"
                      [class.text-primary-300]="project.accent === 'primary'"
                      [class.text-accent-300]="project.accent === 'accent'"
                    >
                      {{ (index + 1).toString().padStart(2, '0') }} —
                      {{ project.category }}
                    </span>
                    <h3
                      class="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl"
                    >
                      {{ project.name }}
                    </h3>
                  </div>
                </div>

                <p
                  class="text-sm leading-relaxed text-slate-300/90 sm:text-base"
                >
                  {{ project.key + '.description' | transloco }}
                </p>

                <div
                  class="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4"
                >
                  @for (tag of project.tags; track tag; let tagIndex = $index) {
                    <span
                      [class.chip-accent]="tagIndex < 2"
                      [class.chip]="tagIndex >= 2"
                      >{{ tag }}</span
                    >
                  }
                </div>
              </div>

              <div class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  class="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent-400 transition-colors hover:text-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400"
                  [href]="project.repositoryUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="'projects.viewProject' | transloco"
                >
                  {{ 'projects.viewProject' | transloco }}
                  <span aria-hidden="true">↗</span>
                </a>
                <span class="text-slate-600" aria-hidden="true">/</span>
                <a
                  class="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-primary-300 transition-colors hover:text-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300"
                  [href]="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="project.liveLabel | transloco"
                >
                  {{ project.liveLabel | transloco }}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly projects = PROJECTS;
}
