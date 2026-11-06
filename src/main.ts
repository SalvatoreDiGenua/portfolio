import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { legacyLanguageRedirect } from './app/core/i18n/locale';

const redirect = legacyLanguageRedirect(new URL(window.location.href));
if (redirect) {
  window.location.replace(redirect);
} else {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
}
