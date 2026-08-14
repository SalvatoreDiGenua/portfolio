import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { SKILLS } from '../../core/profile.data';

@Component({ selector: 'app-skills', standalone: true, imports: [TranslocoModule], templateUrl: './skills.html' })
export class SkillsComponent { readonly skillGroups = SKILLS; }
