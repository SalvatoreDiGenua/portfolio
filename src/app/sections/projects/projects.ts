import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AGENTIC_RAG, PROJECTS } from '../../core/profile.data';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe],
  templateUrl: './projects.html',
})
export class Projects {
  readonly projects = PROJECTS;
  readonly upcoming = AGENTIC_RAG;
}
