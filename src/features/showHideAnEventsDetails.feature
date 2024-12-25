Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default.
    Given user had opened the events list
    When user views the list
    Then user will see all event elements collapsed

  Scenario: User can expand an event to see details.
    Given an event had been collapsed
    When user clicks on the "Show Details" button
    Then user will see the event expand to show its details

  Scenario: User can collapse an event to hide details.
    Given an event had been expanded
    When user clicks on the "Hide Details" button
    Then user will see the event collapse to hide its details