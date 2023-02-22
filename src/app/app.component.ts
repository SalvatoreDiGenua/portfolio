import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirebaseService } from './services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.initFirebase();
  }
}
