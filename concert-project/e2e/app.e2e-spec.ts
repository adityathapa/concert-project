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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for concert-project', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be concert-project', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('concert-project');
    })
  });

  it('network-name should be concert-project@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('concert-project@0.0.1.bna');
    });
  });

  it('navbar-brand should be concert-project',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('concert-project');
    });
  });

  
    it('ConcertEvent component should be loadable',() => {
      page.navigateTo('/ConcertEvent');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ConcertEvent');
      });
    });

    it('ConcertEvent table should have 9 columns',() => {
      page.navigateTo('/ConcertEvent');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('TicketListing component should be loadable',() => {
      page.navigateTo('/TicketListing');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TicketListing');
      });
    });

    it('TicketListing table should have 5 columns',() => {
      page.navigateTo('/TicketListing');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Ticket component should be loadable',() => {
      page.navigateTo('/Ticket');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Ticket');
      });
    });

    it('Ticket table should have 9 columns',() => {
      page.navigateTo('/Ticket');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Buyer component should be loadable',() => {
      page.navigateTo('/Buyer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Buyer');
      });
    });

    it('Buyer table should have 6 columns',() => {
      page.navigateTo('/Buyer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('EventHost component should be loadable',() => {
      page.navigateTo('/EventHost');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EventHost');
      });
    });

    it('EventHost table should have 6 columns',() => {
      page.navigateTo('/EventHost');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateEvent component should be loadable',() => {
      page.navigateTo('/CreateEvent');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateEvent');
      });
    });
  
    it('SellTicket component should be loadable',() => {
      page.navigateTo('/SellTicket');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SellTicket');
      });
    });
  
    it('ResellTicket component should be loadable',() => {
      page.navigateTo('/ResellTicket');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ResellTicket');
      });
    });
  
    it('UseTicket component should be loadable',() => {
      page.navigateTo('/UseTicket');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UseTicket');
      });
    });
  

});