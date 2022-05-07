import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Event } from '../../models/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  newEventForm = new FormGroup({
    date: new FormControl(''),
    location: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    tickets: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthenticationService, private eventService: EventService) { }

  ngOnInit(): void {
  }

  createEvent(){
    if(this.newEventForm.get('date')?.value && this.newEventForm.get('location')?.value
        && this.newEventForm.get('name')?.value && this.newEventForm.get('price')?.value && this.newEventForm.get('tickets')?.value){

        const event: Event = {
          eventDate: this.newEventForm.get('date')?.value as string,
          eventLocation: this.newEventForm.get('location')?.value as string,
          eventName: this.newEventForm.get('name')?.value as string,
          ticketPrice: this.newEventForm.get('price')?.value as number,
          unsoldTickets: this.newEventForm.get('tickets')?.value as number
        }

        this.eventService.create(event).then(_ => {
          this.router.navigateByUrl('/events');
        }).catch(error => {
          window.alert("Hiba történt! " + error);
        });

    }else{
      window.alert("Tölts ki minden mezőt!");
    }

  }

}
