import { Component, ElementRef, viewChildren } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AGENTIC_RAG, PROJECTS } from '../../core/profile.data';
import { ProjectPreview } from './project-preview';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe, ProjectPreview],
  templateUrl: './projects.html',
})
export class Projects {
  readonly projects = PROJECTS;
  readonly upcoming = AGENTIC_RAG;
  readonly chapters = viewChildren<ElementRef<HTMLElement>>('chapter');
}
