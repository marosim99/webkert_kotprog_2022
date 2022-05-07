import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '../models/Event';
import { EventFireStore } from '../models/EventFireStore';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private fs: AngularFirestore) { }

  create(event: Event){
    return this.fs.collection<Event>('Events').add(event);
  }

  getAvailableEvents(){
    return this.fs.collection<EventFireStore>('Events', ref => 
      ref.where('unsoldTickets', '>', 0)
      .orderBy('unsoldTickets','asc')
      .limit(10))
    .valueChanges({ idField: 'eventId' });
  }

  getEventByName(eventName: string){
    return this.fs.collection<EventFireStore>('Events', ref => 
      ref.where('eventName', '==', eventName)
      .limit(1))
    .valueChanges({ idField: 'eventId' });
  }

  addToCart(event: EventFireStore, email: string){
    const cartItem: CartItem = {
      eventDate: event.eventDate,
      eventId: event.eventId,
      eventLocation: event.eventLocation,
      eventName: event.eventName,
      ticketPrice: event.ticketPrice,
      userEmail: email
    };

    return this.fs.collection<CartItem>('Cart').add(cartItem);  
  }

  decreaseTicketNumber(event: EventFireStore){
    this.fs.collection('Events').doc(event.eventId).update({ unsoldTickets: event.unsoldTickets - 1 })
  }
}