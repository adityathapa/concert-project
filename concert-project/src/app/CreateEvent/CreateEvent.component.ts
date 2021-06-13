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
import { CreateEventService } from './CreateEvent.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createevent',
  templateUrl: './CreateEvent.component.html',
  styleUrls: ['./CreateEvent.component.css'],
  providers: [CreateEventService]
})
export class CreateEventComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  eventID = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  venue = new FormControl('', Validators.required);
  eventType = new FormControl('', Validators.required);
  noOfTickets = new FormControl('', Validators.required);
  faceValue = new FormControl('', Validators.required);
  eventHost = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceCreateEvent: CreateEventService, fb: FormBuilder) {
    this.myForm = fb.group({
      eventID: this.eventID,
      date: this.date,
      description: this.description,
      venue: this.venue,
      eventType: this.eventType,
      noOfTickets: this.noOfTickets,
      faceValue: this.faceValue,
      eventHost: this.eventHost,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreateEvent.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.concert.network.CreateEvent',
      'eventID': this.eventID.value,
      'date': this.date.value,
      'description': this.description.value,
      'venue': this.venue.value,
      'eventType': this.eventType.value,
      'noOfTickets': this.noOfTickets.value,
      'faceValue': this.faceValue.value,
      'eventHost': this.eventHost.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'eventID': null,
      'date': null,
      'description': null,
      'venue': null,
      'eventType': null,
      'noOfTickets': null,
      'faceValue': null,
      'eventHost': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCreateEvent.addTransaction(this.Transaction)
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
        'faceValue': null,
        'eventHost': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.concert.network.CreateEvent',
      'eventID': this.eventID.value,
      'date': this.date.value,
      'description': this.description.value,
      'venue': this.venue.value,
      'eventType': this.eventType.value,
      'noOfTickets': this.noOfTickets.value,
      'faceValue': this.faceValue.value,
      'eventHost': this.eventHost.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceCreateEvent.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceCreateEvent.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceCreateEvent.getTransaction(id)
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
        'faceValue': null,
        'eventHost': null,
        'transactionId': null,
        'timestamp': null
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

      if (result.faceValue) {
        formObject.faceValue = result.faceValue;
      } else {
        formObject.faceValue = null;
      }

      if (result.eventHost) {
        formObject.eventHost = result.eventHost;
      } else {
        formObject.eventHost = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'faceValue': null,
      'eventHost': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
