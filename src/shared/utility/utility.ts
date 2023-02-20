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

export function replaceAll(value: string, find: string, replace: string) {
    return value.replace(new RegExp(find, 'g'), replace);
}

export function getRandomInt(min: number = 0, max: number = 10) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}