import {defineFeature, loadFeature} from "jest-cucumber";
import {render, waitFor, within} from "@testing-library/react";
import App from "../App.jsx";
import React from "react";
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 events are shown by default.', ({given, when, then}) => {
    given('user had not specified the number of events', () => {
      // Do nothing
    });

    let AppComponent;
    when('user views the events list', () => {
      AppComponent = render(<App/>);
    });

    then(/^user will see (\d+) events by default$/, async (arg0) => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed.', ({given, when, then}) => {
    let AppComponent;
    given('user had wanted to see a specific number of events', () => {
      AppComponent = render(<App/>);
    });

    let AppDOM;
    when('user changes the number of events in the settings', async () => {
      AppDOM = AppComponent.container.firstChild;
      const numberOfEventsTextBox = AppDOM.querySelector('#event-count');
      const user = userEvent.setup();
      await user.type(numberOfEventsTextBox, '{backspace}{backspace}10');
      const defaultNumber = Number(numberOfEventsTextBox.value);
      expect(defaultNumber).toBe(10);
    });

    then('user will see the events list display the specified number of events',  async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10);
      });
    });
  });
});