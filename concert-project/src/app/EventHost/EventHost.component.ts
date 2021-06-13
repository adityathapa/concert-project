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
import { EventHostService } from './EventHost.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-eventhost',
  templateUrl: './EventHost.component.html',
  styleUrls: ['./EventHost.component.css'],
  providers: [EventHostService]
})
export class EventHostComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  eventHostID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  SSN = new FormControl('', Validators.required);


  constructor(public serviceEventHost: EventHostService, fb: FormBuilder) {
    this.myForm = fb.group({
      eventHostID: this.eventHostID,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      SSN: this.SSN
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEventHost.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.concert.network.EventHost',
      'eventHostID': this.eventHostID.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'email': this.email.value,
      'SSN': this.SSN.value
    };

    this.myForm.setValue({
      'eventHostID': null,
      'firstName': null,
      'lastName': null,
      'email': null,
      'SSN': null
    });

    return this.serviceEventHost.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'eventHostID': null,
        'firstName': null,
        'lastName': null,
        'email': null,
        'SSN': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.concert.network.EventHost',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'email': this.email.value,
      'SSN': this.SSN.value
    };

    return this.serviceEventHost.updateParticipant(form.get('eventHostID').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceEventHost.deleteParticipant(this.currentId)
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

    return this.serviceEventHost.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'eventHostID': null,
        'firstName': null,
        'lastName': null,
        'email': null,
        'SSN': null
      };

      if (result.eventHostID) {
        formObject.eventHostID = result.eventHostID;
      } else {
        formObject.eventHostID = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.SSN) {
        formObject.SSN = result.SSN;
      } else {
        formObject.SSN = null;
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
      'eventHostID': null,
      'firstName': null,
      'lastName': null,
      'email': null,
      'SSN': null
    });
  }
}
