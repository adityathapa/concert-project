import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.concert.network{
   export class Buyer extends Participant {
      buyerID: string;
      firstName: string;
      lastName: string;
      email: string;
      SSN: number;
   }
   export class EventHost extends Participant {
      eventHostID: string;
      firstName: string;
      lastName: string;
      email: string;
      SSN: number;
   }
   export class ConcertEvent extends Asset {
      eventID: string;
      date: string;
      description: string;
      venue: string;
      eventType: EventType;
      noOfTickets: number;
      marketPrice: number;
      eventHost: EventHost;
   }
   export class TicketListing extends Asset {
      ticketListingID: string;
      state: string;
      listingPrice: number;
      ticket: Ticket;
   }
   export class Ticket extends Asset {
      ticketID: string;
      seatID: string;
      ticketState: TicketState;
      faceValue: number;
      salePrice: number;
      concertEvent: ConcertEvent;
      owner: Buyer;
      lastOwner: Buyer;
   }
   export class CreateEvent extends Transaction {
      eventID: string;
      date: string;
      description: string;
      venue: string;
      eventType: EventType;
      noOfTickets: number;
      faceValue: number;
      eventHost: EventHost;
   }
   export class SellTicket extends Transaction {
      orderID: string;
      salePrice: string;
      ticket: Ticket;
      buyer: Buyer;
   }
   export class ResellTicket extends Transaction {
      orderID: string;
      salePrice: string;
      ticketListing: TicketListing;
      buyer: Buyer;
   }
   export class UseTicket extends Transaction {
      ticket: Ticket;
   }
   export enum EventType {
      RESERVED,
      OPEN_SEATING,
   }
   export enum TicketState {
      UNSOLD,
      SALE,
      RESALE,
      USED,
   }
// }
