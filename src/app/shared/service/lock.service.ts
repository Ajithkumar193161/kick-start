import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LockService {
  private lockQueue: Array<Promise<boolean>> = [];

  constructor() { }
  
  // Acquires the lock for token-related operations
  async acquireLock(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.lockQueue.length === 0) {
        // If no lock exists, immediately resolve
        this.lockQueue.push(new Promise<boolean>((resolve) => resolve(true)));

      } else {
        // Otherwise, resolve the lock once the previous one finishes
        this.lockQueue[this.lockQueue.length - 1].then(() => {
          this.lockQueue.push(new Promise<boolean>((resolve) => resolve(true)));
        });
      }
    });
  }

  // Releases the lock after the operation is complete
  releaseLock() {
    if (this.lockQueue.length > 0) {
      this.lockQueue.shift(); // Remove the lock after the operation completes
    }
  }

  // Optional: Add a timeout for acquiring lock (e.g., 5000ms)
  async acquireLockWithTimeout(timeout: number = 5000): Promise<any> {
    const timeoutPromise = new Promise<any>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: Could not acquire token lock')), timeout);
    });

    const lockPromise = this.acquireLock();
    return Promise.race([lockPromise, timeoutPromise]); // Return the race of lock and timeout promises
  }
}

