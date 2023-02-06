import { ChangeDetectionStrategy, Component } from '@angular/core';
import { scrollToElement } from 'src/shared/utility/utility';

@Component({
  selector: 'sdg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  scrollToElement(id: string) {
    scrollToElement(id);
  }

}
