import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SkillsModule } from './components/skills/skills.module';
import { ExperienceModule } from './components/experience/experience.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SkillsModule,
    ExperienceModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
