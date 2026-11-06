import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AGENTIC_RAG, AI_TOOLS } from '../../core/profile.data';

@Component({
  selector: 'app-ai',
  imports: [TranslocoPipe],
  templateUrl: './ai.html',
  host: { class: 'block' },
})
export class Ai {
  readonly project = AGENTIC_RAG;
  readonly tools = AI_TOOLS;
}
