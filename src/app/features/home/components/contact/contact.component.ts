import { ChangeDetectionStrategy, Component, EmbeddedViewRef, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment.development';
import { PortfolioState, Social } from 'src/shared/models/sdg-portfolio-models';
import { getSocial } from 'src/shared/stores/social/solcial.selectors';

interface ContactFormGroup {
  name: FormControl<string>;
  userEmail: FormControl<string>;
  text: FormControl<string>;
}

@Component({
  selector: 'sdg-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {

  @ViewChild('emailSendSuccesfully') emailSendSuccesfully: TemplateRef<HTMLElement>;
  @ViewChild('emailNotSend') emailNotSend: TemplateRef<HTMLElement>;
  @ViewChild('contactForm') contactForm: NgForm;

  public socialRows: { row1: Social[], row2: Social[] } = { row1: [], row2: [] };
  public matSnackBarRef: MatSnackBarRef<EmbeddedViewRef<any>> = null;
  public contactFormGroup = new FormGroup<ContactFormGroup>({
    name: new FormControl('', Validators.required),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', Validators.required)
  });
  public disableBtnSendEmail: boolean = false;

  public originalKeyValueOrder = () => {
    return 0;
  }

  constructor(
    private portfolioStore: Store<PortfolioState>,
    private matSnackBar: MatSnackBar
  ) {
    this.getSocial();
  }

  getSocial() {
    this.portfolioStore.pipe(takeUntilDestroyed(), select(getSocial)).subscribe(social => {
      this.socialRows.row1 = social.slice(0, 3);
      this.socialRows.row2 = social.slice(3);
    });
  }

  submitForm() {
    if (this.contactFormGroup.invalid) { return; }

    this.contactFormGroup.disable();
    this.disableBtnSendEmail = true;

    emailjs.send(environment.emailJsKey.serviceId, environment.emailJsKey.templateId, this.contactFormGroup.value, environment.emailJsKey.publicKey)
      .then(() => {
        this.disableBtnSendEmail = false;
        this.contactFormGroup.enable();
        this.matSnackBarRef = this.matSnackBar.openFromTemplate(this.emailSendSuccesfully, { duration: 8 * 1000 });
        this.contactForm.resetForm();
      },
        () => {
          this.disableBtnSendEmail = false;
          this.contactFormGroup.enable();
          this.matSnackBarRef = this.matSnackBar.openFromTemplate(this.emailNotSend, { duration: 8 * 1000 });
          this.contactForm.resetForm();
        });
  }

}
