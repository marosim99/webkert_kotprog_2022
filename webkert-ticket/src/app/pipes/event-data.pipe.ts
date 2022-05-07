import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/Event';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'eventData'
})
export class EventDataPipe implements PipeTransform {
  
  transform(event: Event): string {
    let newDate = new Date(event.eventDate);
    const datePipe = new DatePipe('en-US');
    let date = datePipe.transform(newDate,'MMM d, y')?.toString();

    return event.eventLocation+ ", " + date;
  }

}
