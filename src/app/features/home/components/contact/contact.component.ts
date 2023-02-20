import { ChangeDetectionStrategy, Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

interface Social {
  name: string;
  iconUrl: string;
  socialUrl: string;
}

@Component({
  selector: 'sdg-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  @ViewChild('emailSendSuccesfully') emailSendSuccesfully: TemplateRef<HTMLElement>;
  @ViewChild('emailNotSend') emailNotSend: TemplateRef<HTMLElement>;
  @ViewChild('contactForm') contactForm: NgForm;

  public socialRows: { row1: Social[], row2: Social[] } = { row1: [], row2: [] };
  public matSnackBarRef: MatSnackBarRef<EmbeddedViewRef<any>> = null;
  public contactFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', Validators.required)
  });
  public disableBtnSendEmail: boolean = false;

  public originalKeyValueOrder = () => {
    return 0;
  }


  constructor(private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSocial();
  }

  getSocial() {
    this.socialRows.row1 = [
      {
        name: 'Instagram',
        iconUrl: '/assets/social-icons/instagram.svg',
        socialUrl: 'https://www.instagram.com/salvatore_di_genua/'
      },
      {
        name: 'Facebook',
        iconUrl: '/assets/social-icons/facebook.svg',
        socialUrl: 'https://www.facebook.com/profile.php?id=100008219641807'
      },
      {
        name: 'LinkedIn',
        iconUrl: '/assets/social-icons/linkedin.svg',
        socialUrl: 'https://www.linkedin.com/in/salvatore-di-genua-b664b716a'
      },
    ]

    this.socialRows.row2 = [
      {
        name: 'WhatsApp',
        iconUrl: '/assets/social-icons/whatsapp.svg',
        socialUrl: 'https://api.whatsapp.com/send?phone=3277868017'
      },
      {
        name: 'GitHub',
        iconUrl: '/assets/social-icons/github.svg',
        socialUrl: 'https://github.com/SalvatoreDiGenua'
      },
    ]
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
