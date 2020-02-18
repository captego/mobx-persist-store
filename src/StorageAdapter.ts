import { StorageAdapterOptions } from './types';

export default class StorageAdapter {
  private write: StorageAdapterOptions['write'];
  private read: StorageAdapterOptions['read'];

  constructor(options: StorageAdapterOptions) {
    this.write = options.write;
    this.read = options.read;
  }

  writeInStorage<T>(name: string, content: T): Promise<void | Error> {
    return new Promise((resolve, reject) => {
      const contentString = JSON.stringify(content);
      this.write(name, contentString)
        .then(() => resolve())
        .catch((error) => {
          console.log('StorageAdapter.writeInStorage', error);
          reject(error);
        });
    });
  }

  readFromStorage<T>(name: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.read(name)
        .then((content) => {
          if (content) {
            const contentObject = JSON.parse(content);
            return resolve(contentObject);
          }
          resolve(undefined);
        })
        .catch((error) => {
          console.log('StorageAdapter.readFromStorage', error);
          reject(error);
        });
    });
  }
}
