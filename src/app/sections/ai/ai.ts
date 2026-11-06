import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AGENTIC_RAG, AI_TOOL_GROUPS } from '../../core/profile.data';

@Component({
  selector: 'app-ai',
  imports: [TranslocoPipe],
  templateUrl: './ai.html',
  styleUrl: './ai.css',
  host: { class: 'block' },
})
export class Ai {
  readonly project = AGENTIC_RAG;
  readonly toolGroups = AI_TOOL_GROUPS;
}
