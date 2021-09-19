import { BehaviorSubject, Observable } from 'rxjs';
import { State } from './State';

export class TableDataSource<T> {
    public data = new BehaviorSubject<T[]>([]);
    public loading = new BehaviorSubject<boolean>(false);

    connect(): Observable<T[]> {
        return this.data.asObservable();
    }

    disconnect(): void {
        this.data.complete();
        this.data.complete();
    }

    load(state: State): void{

    }
}

