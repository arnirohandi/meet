import React from 'react';
import {render, waitFor, within} from '@testing-library/react';
import NumberOfEvents from './../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';
import App from "../App.jsx";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents/>);
  })

  test('renders number of events', () => {
    expect(NumberOfEventsComponent.container.querySelector('#number-of-events')).toBeInTheDocument();
  });

  test('renders text input', () => {
    const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberOfEventsTextBox).toBeInTheDocument();
    expect(numberOfEventsTextBox).toHaveClass('number-input');
  });

  test('renders default number of events', () => {
    const defaultNumber = Number(NumberOfEventsComponent.queryByRole('textbox').value);
    expect(defaultNumber).toBe(32);
  });

  test('changes value according to the number typed by user', async () => {

    NumberOfEventsComponent.rerender(<NumberOfEvents
      setCurrentNOE={() => { }}
      setErrorAlert={() => { }}
    />);

    const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(numberOfEventsTextBox, '{backspace}{backspace}10');
    const defaultNumber = Number(NumberOfEventsComponent.queryByRole('textbox').value);
    expect(defaultNumber).toBe(10);
  })
});

describe('<App /> integration', () => {
  test('changes list according to the number typed by user', async () => {
    const AppComponent = render(<App/>);
    const AppDOM = AppComponent.container.firstChild;
    const numberOfEventsTextBox = AppDOM.querySelector('#event-count');
    const user = userEvent.setup();
    await user.type(numberOfEventsTextBox, '{backspace}{backspace}10');

    const defaultNumber = Number(numberOfEventsTextBox.value);
    expect(defaultNumber).toBe(10);

    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(10);
    });
  })
});