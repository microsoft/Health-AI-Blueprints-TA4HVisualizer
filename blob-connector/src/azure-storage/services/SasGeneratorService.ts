import { Observable } from 'rxjs';
import { BlobStorageRequest } from '../types/azure-storage';
import { from } from 'rxjs';

export class SasGeneratorService {
  getSasToken(): 
  Observable<BlobStorageRequest> {
    return from(new Promise<BlobStorageRequest>((resolve, reject) => {
        resolve({
          storageUri: process.env.storageUri!,
          storageAccessToken: process.env.storageAccessToken!
        })
    }));
  }
}

