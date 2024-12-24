import React from 'react';
import {render} from '@testing-library/react';
import Event from "../components/Event.jsx";
import userEvent from '@testing-library/user-event';

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

describe('<Event /> component', () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent}/>);
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(mockEvent.location)).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    const details = EventComponent.queryByText(mockEvent.description);
    expect(details).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText('Show Details');
    await user.click(showDetailsButton);

    const details = EventComponent.container.querySelector('.event-description')
    expect(details).toBeInTheDocument();
    expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText('Show Details');
    await user.click(showDetailsButton);

    const hideDetailsButton = EventComponent.queryByText('Hide Details');
    await user.click(hideDetailsButton);

    const details = EventComponent.queryByText(mockEvent.description);
    expect(details).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });
});