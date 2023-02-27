import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme/theme.service';
import { scrollToElement } from 'src/shared/utility/utility';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) { }

  scrollToElement(id: string) {
    scrollToElement(id);
  }
}
