/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ConcertEventComponent } from './ConcertEvent/ConcertEvent.component';
import { TicketListingComponent } from './TicketListing/TicketListing.component';
import { TicketComponent } from './Ticket/Ticket.component';

import { BuyerComponent } from './Buyer/Buyer.component';
import { EventHostComponent } from './EventHost/EventHost.component';

import { CreateEventComponent } from './CreateEvent/CreateEvent.component';
import { SellTicketComponent } from './SellTicket/SellTicket.component';
import { ResellTicketComponent } from './ResellTicket/ResellTicket.component';
import { UseTicketComponent } from './UseTicket/UseTicket.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConcertEventComponent,
    TicketListingComponent,
    TicketComponent,
    BuyerComponent,
    EventHostComponent,
    CreateEventComponent,
    SellTicketComponent,
    ResellTicketComponent,
    UseTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
