import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface Experience {
  company: string;
  employment: string;
  siteUrl: string;
  faviconUrl: string;
  permanence: string;
  description: string;
  stack: string[];
}

@Component({
  selector: 'sdg-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit {

  public experiences: Experience[] = [];

  ngOnInit() {
    this.getExperiences();
  }

  getExperiences() {
    this.experiences = [
      {
        company: 'SCAI Tecno',
        employment: 'Web Developer',
        description: 'Frontend Developer che si occupa di progettazione di interfacce web e di user-experience.',
        permanence: '2023 / in corso',
        siteUrl: 'https://www.grupposcai.it/company/scai-tecno/',
        faviconUrl: '/assets/experience-icons/scai_tecno/logo_scai_tecno.svg',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular(2+)', 'Typescript', 'Bootstrap']
      },
      {
        company: 'ACCA Software',
        employment: 'Web Developer',
        description: 'Frontend Developer che si occupa di progettazione di interfacce web e di user-experience. Backend developer che si occupa dello sviluppo server delle applicazioni.',
        permanence: '2019 / 2023',
        siteUrl: 'https://acca.it',
        faviconUrl: '/assets/experience-icons/acca/logo_acca.svg',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Angular(2+)', 'Typescript', 'Node']
      }
    ]
  }
}
