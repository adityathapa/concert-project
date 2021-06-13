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
import { ConcertEventService } from './ConcertEvent.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-concertevent',
  templateUrl: './ConcertEvent.component.html',
  styleUrls: ['./ConcertEvent.component.css'],
  providers: [ConcertEventService]
})
export class ConcertEventComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  eventID = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  venue = new FormControl('', Validators.required);
  eventType = new FormControl('', Validators.required);
  noOfTickets = new FormControl('', Validators.required);
  marketPrice = new FormControl('', Validators.required);
  eventHost = new FormControl('', Validators.required);

  constructor(public serviceConcertEvent: ConcertEventService, fb: FormBuilder) {
    this.myForm = fb.group({
      eventID: this.eventID,
      date: this.date,
      description: this.description,
      venue: this.venue,
      eventType: this.eventType,
      noOfTickets: this.noOfTickets,
      marketPrice: this.marketPrice,
      eventHost: this.eventHost
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceConcertEvent.getAll()
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
      $class: 'org.concert.network.ConcertEvent',
      'eventID': this.eventID.value,
      'date': this.date.value,
      'description': this.description.value,
      'venue': this.venue.value,
      'eventType': this.eventType.value,
      'noOfTickets': this.noOfTickets.value,
      'marketPrice': this.marketPrice.value,
      'eventHost': this.eventHost.value
    };

    this.myForm.setValue({
      'eventID': null,
      'date': null,
      'description': null,
      'venue': null,
      'eventType': null,
      'noOfTickets': null,
      'marketPrice': null,
      'eventHost': null
    });

    return this.serviceConcertEvent.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'eventID': null,
        'date': null,
        'description': null,
        'venue': null,
        'eventType': null,
        'noOfTickets': null,
        'marketPrice': null,
        'eventHost': null
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
      $class: 'org.concert.network.ConcertEvent',
      'date': this.date.value,
      'description': this.description.value,
      'venue': this.venue.value,
      'eventType': this.eventType.value,
      'noOfTickets': this.noOfTickets.value,
      'marketPrice': this.marketPrice.value,
      'eventHost': this.eventHost.value
    };

    return this.serviceConcertEvent.updateAsset(form.get('eventID').value, this.asset)
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

    return this.serviceConcertEvent.deleteAsset(this.currentId)
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

    return this.serviceConcertEvent.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'eventID': null,
        'date': null,
        'description': null,
        'venue': null,
        'eventType': null,
        'noOfTickets': null,
        'marketPrice': null,
        'eventHost': null
      };

      if (result.eventID) {
        formObject.eventID = result.eventID;
      } else {
        formObject.eventID = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.venue) {
        formObject.venue = result.venue;
      } else {
        formObject.venue = null;
      }

      if (result.eventType) {
        formObject.eventType = result.eventType;
      } else {
        formObject.eventType = null;
      }

      if (result.noOfTickets) {
        formObject.noOfTickets = result.noOfTickets;
      } else {
        formObject.noOfTickets = null;
      }

      if (result.marketPrice) {
        formObject.marketPrice = result.marketPrice;
      } else {
        formObject.marketPrice = null;
      }

      if (result.eventHost) {
        formObject.eventHost = result.eventHost;
      } else {
        formObject.eventHost = null;
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
      'eventID': null,
      'date': null,
      'description': null,
      'venue': null,
      'eventType': null,
      'noOfTickets': null,
      'marketPrice': null,
      'eventHost': null
      });
  }

}
