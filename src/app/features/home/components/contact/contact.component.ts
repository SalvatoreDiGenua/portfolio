import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface Social {
  name: string;
  color: string;
  iconUrl: string;
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
        color: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
      },
      {
        name: 'Facebook',
        iconUrl: '/assets/social-icons/facebook.svg',
        color: '#3B5998'
      },
      {
        name: 'LinkedIn',
        iconUrl: '/assets/social-icons/linkedin.svg',
        color: '#0a66c2'
      },
    ]

    this.socialRows.row2 = [
      {
        name: 'WhatsApp',
        iconUrl: '/assets/social-icons/whatsapp.svg',
        color: '#25d366'
      },
      {
        name: 'GitHub',
        iconUrl: '/assets/social-icons/github.svg',
        color: '#fff'
      },
    ]
  }

}
