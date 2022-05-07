import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartItemFireStore } from 'src/app/models/CartItemFireStore';
import { EventFireStore } from '../../models/EventFireStore';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private eventService: EventService, private auth: AuthenticationService) {
  }

  email: string = this.auth.getLoggedInUserEmail();
  cartItems: Array<CartItemFireStore> = [];
  events: Array<EventFireStore> = [];

  ngOnInit(): void {
    if(this.auth.isUserLoggedIn()){
      this.cartService.getTicketsFromCart(this.email+"").subscribe(items => {
        this.cartItems = items;
      });
    }
  }

  deleteFromCart(cartItem: CartItemFireStore){
    this.eventService.getEventByName(cartItem.eventName).subscribe(e => {
      this.events = e;
    });

    this.cartService.deleteFromCartFS(cartItem).then(l => {
      window.alert('Jegy törölve');
      this.cartService.increaseTicketNumber(cartItem,this.events[0]);
    });
  }

}
