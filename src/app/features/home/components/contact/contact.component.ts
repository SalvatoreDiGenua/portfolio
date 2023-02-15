import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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

  public socialRows: { row1: Social[], row2: Social[] } = { row1: [], row2: [] };

  public originalKeyValueOrder = () => {
    return 0;
  }

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

}
