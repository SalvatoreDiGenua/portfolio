import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseService } from 'src/shared/services/firebase.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  private firebaseService = inject(FirebaseService);

  constructor() {
    this.firebaseService.initFirebase();
  }
}
