import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { getRandomInt, unsubscribe } from 'src/shared/utility/utility';
import Typed from 'typed.js';
import { EXAMPLE_JAVASCRIPT, EXAMPLE_HTML, EXAMPLE_CSS, EXAMPLE_ANGULAR, EXAMPLE_SCSS, EXAMPLE_TYPESCRIPT, EXAMPLE_RXJS, EXAMPLE_NODEJS, EXAMPLE_SQL } from './example_preview_code';

interface Skill {
  name: string;
  iconUrl: string;
}

@Component({
  selector: 'sdg-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('skillRef') skillRefList: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('wrapPreviewCode') wrapPreviewCode: ElementRef<HTMLSpanElement>;

  public skills: Skill[] = []
  public skillActive: Skill = null;
  public previewCode: string = null;
  private typed: Typed = null;
  private animations: string[] = ['vibrate', 'shake-horizontal', 'shake-lr', 'jello-diagonal-1', 'jello-diagonal-2', 'wobble-hor-bottom', 'bounce-top'];
  private subIntervalAnimation: Subscription;

  ngOnInit() {
    this.getSkills();
  }

  ngAfterViewInit() {
    this.startAnimations();
  }

  getSkills() {
    this.skills = [
      {
        name: 'JavaScript',
        iconUrl: '/assets/skills-icons/javascript.svg'
      },
      {
        name: 'HTML',
        iconUrl: '/assets/skills-icons/html5.svg'
      },
      {
        name: 'CSS',
        iconUrl: '/assets/skills-icons/css3.svg'
      },
      {
        name: 'SCSS',
        iconUrl: '/assets/skills-icons/scss.svg'
      },
      {
        name: 'Angular',
        iconUrl: '/assets/skills-icons/angular.svg'
      },
      {
        name: 'TypeScript',
        iconUrl: '/assets/skills-icons/typescript.svg'
      },
      {
        name: 'RxJS',
        iconUrl: '/assets/skills-icons/rxjs.svg'
      },
      // {
      //   name: 'NgRx',
      //   iconUrl: '/assets/skills-icons/ngrx.svg'
      // },
      {
        name: 'NodeJS',
        iconUrl: '/assets/skills-icons/nodejs.svg'
      },
      {
        name: 'SQL',
        iconUrl: '/assets/skills-icons/sql.svg'
      }
    ]
  }

  startAnimations() {
    const intervalObs = interval(1500);
    this.subIntervalAnimation = intervalObs.subscribe(() => {
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

    this.typed = new Typed(this.wrapPreviewCode.nativeElement, {
      strings: [this.previewCode],
      typeSpeed: 20,
      contentType: null
    })
  }

  ngOnDestroy() {
    unsubscribe(this.subIntervalAnimation);
  }
}
