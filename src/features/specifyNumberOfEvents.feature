Feature: Show/Hide Event Details

  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given user had not specified the number of events
    When user views the events list
    Then user will see 32 events by default

  Scenario: User can change the number of events displayed.
    Given user had wanted to see a specific number of events
    When user changes the number of events in the settings
    Then user will see the events list display the specified number of events
    