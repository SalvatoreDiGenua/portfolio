import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { getRandomInt } from 'src/shared/utility/utility';
import Typed from 'typed.js';
import { EXAMPLE_JAVASCRIPT, EXAMPLE_HTML, EXAMPLE_CSS, EXAMPLE_ANGULAR, EXAMPLE_SCSS, EXAMPLE_TYPESCRIPT, EXAMPLE_RXJS, EXAMPLE_NODEJS, EXAMPLE_SQL } from './example_preview_code';
import { PortfolioState, Skill } from 'src/shared/models/sdg-portfolio-models';
import { Store, select } from '@ngrx/store';
import { getSkill } from 'src/shared/stores/skill/skill.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';


@Component({
  selector: 'sdg-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe]
})
export class SkillsComponent implements AfterViewInit {

  @ViewChildren('skillRef') skillRefList: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('wrapPreviewCode') wrapPreviewCode: ElementRef<HTMLSpanElement>;

  public skills$: Observable<Skill[]>;
  public intervalAnimation$: Observable<number>;
  public skillActive: Skill = null;
  public previewCode: string = null;
  private typed: Typed = null;
  private animations: string[] = ['vibrate', 'shake-horizontal', 'shake-lr', 'jello-diagonal-1', 'jello-diagonal-2', 'wobble-hor-bottom', 'bounce-top'];

  constructor(private portfolioStore: Store<PortfolioState>) {
    this.skills$ = this.portfolioStore.pipe(select(getSkill));
    this.intervalAnimation$ = interval(1500).pipe(takeUntilDestroyed());
  }

  ngAfterViewInit() {
    this.startAnimations();
  }

  startAnimations() {
    this.intervalAnimation$.subscribe(() => {
      const skillRef = this.skillRefList.get(getRandomInt(0, this.skillRefList.length - 1))
      const animation = this.animations[getRandomInt(0, this.animations.length - 1)];
      skillRef.nativeElement.addEventListener('animationend', () => {
        skillRef.nativeElement.style.animation = '';
      })
      skillRef.nativeElement.style.animation = `${animation} 0.8s ease both`;
    })
  }

  onSelectedSkillActive(skill: Skill) {
    if (skill.name === this.skillActive?.name) { return; }

    this.skillActive = skill;
    this.buildPreviewCode();
    this.writePreviewCode();
  }

  buildPreviewCode() {
    this.previewCode = null;
    const nameSkill = this.skillActive.name.toLowerCase();

    switch (nameSkill) {
      case 'javascript':
        this.previewCode = EXAMPLE_JAVASCRIPT;
        break;
      case 'html':
        this.previewCode = EXAMPLE_HTML;
        break;
      case 'css':
        this.previewCode = EXAMPLE_CSS;
        break;
      case 'scss':
        this.previewCode = EXAMPLE_SCSS;
        break;
      case 'angular':
        this.previewCode = EXAMPLE_ANGULAR;
        break;
      case 'typescript':
        this.previewCode = EXAMPLE_TYPESCRIPT;
        break;
      case 'rxjs':
        this.previewCode = EXAMPLE_RXJS;
        break;
      case 'ngrx':
        this.previewCode = null;
        break;
      case 'nodejs':
        this.previewCode = EXAMPLE_NODEJS;
        break;
      case 'sql':
        this.previewCode = EXAMPLE_SQL;
        break;

      default:
        break;
    }
  }

  writePreviewCode() {
    if (this.typed) {
      this.typed.destroy();
    }

    if (!this.previewCode || !this.skillActive) { return; }

    this.typed = new Typed(this.wrapPreviewCode.nativeElement, {
      strings: [this.previewCode],
      typeSpeed: 2,
      contentType: null
    })
  }

}
