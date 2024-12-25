import {defineFeature, loadFeature} from "jest-cucumber";
import {render, waitFor, within} from "@testing-library/react";
import App from "../App.jsx";
import React from "react";
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

const mockEvent = {
  "kind": "calendar#event",
  "etag": "\"3181161784712000\"",
  "id": "4eahs9ghkhrvkld72hogu9ph3e_20241224T150000Z",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyNDEyMjRUMTUwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
  "created": "2020-05-19T19:17:46.000Z",
  "updated": "2020-05-27T12:01:32.356Z",
  "summary": "Learn JavaScript",
  "description": "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
  "location": "London, UK",
  "creator": {
    "email": "fullstackwebdev@careerfoundry.com",
    "self": true
  },
  "organizer": {
    "email": "fullstackwebdev@careerfoundry.com",
    "self": true
  },
  "start": {
    "dateTime": "2024-12-24T16:00:00+01:00",
    "timeZone": "Europe/Berlin"
  },
  "end": {
    "dateTime": "2024-12-24T17:00:00+01:00",
    "timeZone": "Europe/Berlin"
  },
  "recurringEventId": "4eahs9ghkhrvkld72hogu9ph3e",
  "originalStartTime": {
    "dateTime": "2024-12-24T16:00:00+01:00",
    "timeZone": "Europe/Berlin"
  },
  "iCalUID": "4eahs9ghkhrvkld72hogu9ph3e@google.com",
  "sequence": 0,
  "reminders": {
    "useDefault": true
  },
  "eventType": "default"
}

defineFeature(feature, test => {
  test('An event element is collapsed by default.', ({given, when, then}) => {
    given('user had opened the events list', () => {
      // Nothing to do here
    });

    let AppComponent;
    when('user views the list', () => {
      AppComponent = render(<App/>);
    });

    then('user will see all event elements collapsed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      const EventListItems = await within(EventListDOM).findAllByRole('listitem');
      const Details = EventListItems[0].querySelector('.event-details');
      expect(Details).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details.', ({given, when, then}) => {
    let AppComponent;
    given('an event had been collapsed', () => {
      AppComponent = render(<App/>);
    });

    let AppDOM;
    let EventListDOM;
    when(/^user clicks on the "(.*)" button$/, async (arg0) => {
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      const user = userEvent.setup();
      const EventListItems = await within(EventListDOM).findAllByRole('listitem');
      const ShowDetailsButton = EventListItems[0].querySelector('[data-testid="toggle-btn"]');
      await user.click(ShowDetailsButton);
    });

    then('user will see the event expand to show its details', async () => {
      const EventListItems = await within(EventListDOM).findAllByRole('listitem');
      const Details = EventListItems[0].querySelector('.event-details');
      expect(Details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details.', ({given, when, then}) => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventListItems
    given('an event had been expanded', async () => {
      AppComponent = render(<App/>);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      const user = userEvent.setup();
      EventListItems = await within(EventListDOM).findAllByRole('listitem');
      const ShowDetailsButton = EventListItems[0].querySelector('[data-testid="toggle-btn"]');
      await user.click(ShowDetailsButton);
    });

    when(/^user clicks on the "(.*)" button$/, async (arg0) => {
      const user = userEvent.setup();
      const HideDetailsButton = EventListItems[0].querySelector('[data-testid="toggle-btn"]');
      await user.click(HideDetailsButton);
    });

    then('user will see the event collapse to hide its details', async () => {
      const Details = EventListItems[0].querySelector('.event-details');
      expect(Details).not.toBeInTheDocument();
    });
  });
});