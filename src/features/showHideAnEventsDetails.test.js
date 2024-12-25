import {defineFeature, loadFeature} from "jest-cucumber";
import {render, within} from "@testing-library/react";
import App from "../App.jsx";
import React from "react";
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

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