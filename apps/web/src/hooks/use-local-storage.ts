export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value);
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
