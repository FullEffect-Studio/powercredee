import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {BusPosition} from "./simulator/busPosition";

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private dbPath = '/busPositions';

  busPositionsRef: AngularFirestoreCollection<BusPosition>;

  constructor(private db: AngularFirestore) {
    this.busPositionsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<BusPosition> {
    return this.busPositionsRef;
  }

  create(data: BusPosition): any {
    return this.busPositionsRef.add({ ...data });
  }

  upsert(data: BusPosition): any {
    // return this.busPositionsRef.doc({ ...data });
  }

  update(id: string, data: Partial<BusPosition>): Promise<void> {
    return this.busPositionsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.busPositionsRef.doc(id).delete();
  }
}
