import { Component, ElementRef, inject, viewChildren } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/i18n/language.service';
import { AGENTIC_RAG, PROJECTS } from '../../core/profile.data';
import { ProjectPreview } from './project-preview';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe, ProjectPreview],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly languageService = inject(LanguageService);
  readonly projects = PROJECTS;
  readonly upcoming = AGENTIC_RAG;
  readonly chapters = viewChildren<ElementRef<HTMLElement>>('chapter');
}
