import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AGENTIC_RAG, PROJECTS } from '../../core/profile.data';

@Component({
  selector: 'app-project-preview',
  imports: [TranslocoPipe],
  templateUrl: './project-preview.html',
  host: { class: 'block', '[class.project-preview-ready]': 'ready()' },
})
export class ProjectPreview {
  readonly chapters = input.required<readonly ElementRef<HTMLElement>[]>();
  readonly active = signal(0);
  readonly ready = signal(false);
  readonly total = PROJECTS.length + 1;
  readonly project = computed(() => PROJECTS.at(this.active()));
  readonly upcoming = AGENTIC_RAG;

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const view = host.ownerDocument.defaultView;
      if (!view) return;

      const controller = new AbortController();
      let frame: number | undefined;

      const update = () => {
        frame = undefined;
        if (host.getClientRects().length === 0) return;

        const readingLine = view.innerHeight / 2;
        let active = 0;
        for (const [index, chapter] of this.chapters().entries()) {
          if (chapter.nativeElement.getBoundingClientRect().top > readingLine) {
            break;
          }
          active = index;
        }
        this.active.set(active);
        this.ready.set(true);
      };

      const schedule = () => {
        frame ??= view.requestAnimationFrame(update);
      };

      view.addEventListener('scroll', schedule, {
        passive: true,
        signal: controller.signal,
      });
      view.addEventListener('resize', schedule, { signal: controller.signal });
      schedule();

      destroyRef.onDestroy(() => {
        controller.abort();
        if (frame !== undefined) view.cancelAnimationFrame(frame);
      });
    });
  }
}
