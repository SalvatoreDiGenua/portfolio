import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { scrollToElement } from '../utility/utility';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  scrollToElement(id: string) {
    scrollToElement(id);
  }
}
