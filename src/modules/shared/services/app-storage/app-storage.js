/**
 * App Storage class
 * @description This will be responsible for storing data into the application.
 * Commonly, people use LocalStorage or SessionStorage. This is just a wrapper over them
 * because to restrict the usage of Global window storage throughtout the application
 * Default, this is just using the LocalStorage
 */
export class AppStorage {
  constructor(storage) {
    this.storage = storage || window.localStorage;

    /** Is storage is supported or not */
    if (!this.isSupported()) {
      throw new Error('Storage is not supported by browser!');
    }
  }

  setItem(key, value) {
    let serializedValue = '';
    try {
      serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (err) {
      console.error(err);
    }
  }

  getItem(key) {
    const serializedValue = this.storage.getItem(key);
    try {
      const value = JSON.parse(serializedValue);
      return value;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  isStorageAvailable() {
    try {
      this.storage.setItem('test', 'test');
      this.storage.removeItem('test');
      return true;
    } catch (exception) {
      return false;
    }
  }

  /**
   * @description Check for storage support
   * @returns {boolean} supported
   * */
  isSupported() {
    if (!this.storage) { return false; }

    return this.isStorageAvailable();
  }
}
/**
 * Creating the instance of storage. Default will be localStorage
 * but if you want to create instance for session storage then pass window.sessionStorage as parameter
 */
const appLocalStorage = new AppStorage();
const appSessionStorage = new AppStorage(window.sessionStorage);

export { appLocalStorage, appSessionStorage };
