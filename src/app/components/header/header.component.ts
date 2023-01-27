import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) { }

  onToggleTheme() {
    if (this.themeService.getCurrentTheme() === this.themeService.typeTheme.SDG_THEME_LIGHT) {
      this.themeService.setDarkTheme();
    } else {
      this.themeService.setLightTheme();
    }
  }
}
