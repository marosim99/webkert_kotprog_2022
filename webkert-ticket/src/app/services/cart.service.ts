import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartItemFireStore } from '../models/CartItemFireStore';
import { EventService } from './event.service';
import { EventFireStore } from '../models/EventFireStore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private fs: AngularFirestore, private eventService: EventService) { }
  
  getTicketsFromCart(userEmail: string){
    return this.fs.collection<CartItemFireStore>('Cart', ref => 
      ref.where('userEmail', '==' , userEmail)
      .orderBy('ticketPrice','desc'))
    .valueChanges({ idField: 'itemId' });
  }

  deleteFromCartFS(cartItem: CartItemFireStore){
    return this.fs.collection<CartItemFireStore>('Cart').doc(cartItem.itemId).delete();
  }

  increaseTicketNumber(cartItem: CartItemFireStore, event: EventFireStore){
    this.fs.collection('Events').doc(event.eventId).update({ unsoldTickets: event.unsoldTickets + 1 });
  }
}
