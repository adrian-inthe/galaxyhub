const cache = window.localStorage;

export function get(key: string) {
  const value = cache.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

export function set(key: string, value: any) {
  cache.setItem(key, JSON.stringify(value));
}
