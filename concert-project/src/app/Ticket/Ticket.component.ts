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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TicketService } from './Ticket.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ticket',
  templateUrl: './Ticket.component.html',
  styleUrls: ['./Ticket.component.css'],
  providers: [TicketService]
})
export class TicketComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  ticketID = new FormControl('', Validators.required);
  seatID = new FormControl('', Validators.required);
  ticketState = new FormControl('', Validators.required);
  faceValue = new FormControl('', Validators.required);
  salePrice = new FormControl('', Validators.required);
  concertEvent = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  lastOwner = new FormControl('', Validators.required);

  constructor(public serviceTicket: TicketService, fb: FormBuilder) {
    this.myForm = fb.group({
      ticketID: this.ticketID,
      seatID: this.seatID,
      ticketState: this.ticketState,
      faceValue: this.faceValue,
      salePrice: this.salePrice,
      concertEvent: this.concertEvent,
      owner: this.owner,
      lastOwner: this.lastOwner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTicket.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.concert.network.Ticket',
      'ticketID': this.ticketID.value,
      'seatID': this.seatID.value,
      'ticketState': this.ticketState.value,
      'faceValue': this.faceValue.value,
      'salePrice': this.salePrice.value,
      'concertEvent': this.concertEvent.value,
      'owner': this.owner.value,
      'lastOwner': this.lastOwner.value
    };

    this.myForm.setValue({
      'ticketID': null,
      'seatID': null,
      'ticketState': null,
      'faceValue': null,
      'salePrice': null,
      'concertEvent': null,
      'owner': null,
      'lastOwner': null
    });

    return this.serviceTicket.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'ticketID': null,
        'seatID': null,
        'ticketState': null,
        'faceValue': null,
        'salePrice': null,
        'concertEvent': null,
        'owner': null,
        'lastOwner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.concert.network.Ticket',
      'seatID': this.seatID.value,
      'ticketState': this.ticketState.value,
      'faceValue': this.faceValue.value,
      'salePrice': this.salePrice.value,
      'concertEvent': this.concertEvent.value,
      'owner': this.owner.value,
      'lastOwner': this.lastOwner.value
    };

    return this.serviceTicket.updateAsset(form.get('ticketID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceTicket.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceTicket.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'ticketID': null,
        'seatID': null,
        'ticketState': null,
        'faceValue': null,
        'salePrice': null,
        'concertEvent': null,
        'owner': null,
        'lastOwner': null
      };

      if (result.ticketID) {
        formObject.ticketID = result.ticketID;
      } else {
        formObject.ticketID = null;
      }

      if (result.seatID) {
        formObject.seatID = result.seatID;
      } else {
        formObject.seatID = null;
      }

      if (result.ticketState) {
        formObject.ticketState = result.ticketState;
      } else {
        formObject.ticketState = null;
      }

      if (result.faceValue) {
        formObject.faceValue = result.faceValue;
      } else {
        formObject.faceValue = null;
      }

      if (result.salePrice) {
        formObject.salePrice = result.salePrice;
      } else {
        formObject.salePrice = null;
      }

      if (result.concertEvent) {
        formObject.concertEvent = result.concertEvent;
      } else {
        formObject.concertEvent = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.lastOwner) {
        formObject.lastOwner = result.lastOwner;
      } else {
        formObject.lastOwner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'ticketID': null,
      'seatID': null,
      'ticketState': null,
      'faceValue': null,
      'salePrice': null,
      'concertEvent': null,
      'owner': null,
      'lastOwner': null
      });
  }

}
