import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[];

  //obtener reservaciones desde firebase
  constructor(private firestore: AngularFirestore) { 
    this.getReservations().subscribe(res => {
      this.reservations = res
    })
  }

  //Obtener reservaciones para mostrar en la ventana del admin
  public getReservations(): Observable<Reservation[]> {
    return this.firestore.collection('reservation').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Reservation
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }
  //obtener reservacion(si lo necesitas no estoy seguro creo que solo necesitas todas las reservaciones para mostrar en la venta admin)
  public getReservation(id: string): Observable<Reservation> {
    return this.firestore.collection('reservation').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Reservation
        const id = a.payload.id;
        return { id, ...data };
      })
    )
  }

  //agregar reservacion
  public newReservation(reservation: Reservation): Observable<Reservation[]> {
    this.firestore.collection('reservation').add(reservation);
    return this.getReservations();
  }

}
