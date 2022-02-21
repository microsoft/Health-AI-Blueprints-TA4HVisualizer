import { Axios } from 'axios-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {
    getSasToken(): Observable<BlobStorageRequest> {
        // @ts-ignore
        return Axios.get<BlobStorageRequest>('generateSasToken')
        // @ts-ignore
        .pipe(map(res => res.data));
    }
}
