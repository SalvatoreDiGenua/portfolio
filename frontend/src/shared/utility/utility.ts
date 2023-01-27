import { Subscription } from "rxjs";

export function unsubscribe(subscription: Subscription) {
    if (!subscription) { return; }
    subscription.unsubscribe();
}

export function scrollToElement(id: string) {
    if (!id) { return; }
    const element = document.getElementById(id);
    if (!element) { return; }
    element.scrollIntoView({ behavior: 'smooth' });
}