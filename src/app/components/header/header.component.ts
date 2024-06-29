import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme.service';
import { scrollToElement } from 'src/shared/utility/utility';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, FormsModule, AsyncPipe]
})
export class HeaderComponent {
  public themeService = inject(ThemeService);

  scrollToElement(id: string) {
    scrollToElement(id);
  }
}
