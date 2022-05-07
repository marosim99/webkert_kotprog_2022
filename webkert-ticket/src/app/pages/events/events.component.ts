import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { AuthenticationService } from '../../services/authentication.service';
import { EventFireStore } from 'src/app/models/EventFireStore';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private router: Router, private eventService: EventService, private auth: AuthenticationService) { }
  
  email: string = "";
  events: Array<EventFireStore> = [];

  ngOnInit(): void {
    this.eventService.getAvailableEvents().subscribe(events => {
      this.events = events;
    });
  }

  addToCart(event: EventFireStore){
    this.email = this.auth.getLoggedInUserEmail();
    this.eventService.addToCart(event,this.email).then(l => {
      this.eventService.decreaseTicketNumber(event)
    }).catch(e => {
      window.alert(e);
    });
  }

}
