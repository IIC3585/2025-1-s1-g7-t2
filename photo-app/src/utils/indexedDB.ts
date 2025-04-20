export const saveImageToDB = async (imageData: string): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction(['images'], 'readwrite');
  const store = transaction.objectStore('images');
  
  return new Promise((resolve, reject) => {
    const request = store.add({ data: imageData });
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PhotoAppDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}; 