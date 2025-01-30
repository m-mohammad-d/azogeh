export function setItemLocal<T>(key: string, value: T): void {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}
export function getItemLocal<T>(key: string): T {
  try {
    const stringValue = localStorage.getItem(key);

    if (stringValue === null) {
      return [] as unknown as T;
    }

    return JSON.parse(stringValue) as T;
  } catch (error) {
    console.error("Error retrieving from localStorage", error);

    return [] as unknown as T;
  }
}
