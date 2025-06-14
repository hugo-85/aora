type KeyType = "REFRESH";

type NotifyDataType = "HOME" | "PROFILE" | "BOOKMARKS";

export type NotifyObserversType = {
  key: KeyType;
  paths?: NotifyDataType[];
  data?: Record<string, unknown>;
};

let observers: Function[] = [];
/**
 * Observable pattern implementation
 * @param {Function} observer - The observer function to be called when the observable changes
 */
export function subscribe(observer: Function) {
  observers.push(observer);
}
export function unsubscribe(observer: Function) {
  const index = observers.indexOf(observer);
  if (index > -1) {
    observers.splice(index, 1);
  }
}
export function notifyObservers({ key, paths, data }: NotifyObserversType) {
  observers.forEach((observer) => {
    if (typeof observer === "function") {
      observer({ key, paths, data });
    }
  });
}
export function clearObservers() {
  observers = [];
}
export function getObservers() {
  return observers;
}
export function setObservers(newObservers: Function[]) {
  observers = newObservers;
}
