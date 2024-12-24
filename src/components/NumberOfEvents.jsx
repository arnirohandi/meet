import React, {useState} from 'react';

const NumberOfEvents = ({ defaultValue = 32, onChange }) => {
  const [eventCount, setEventCount] = useState(defaultValue);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || '';
    setEventCount(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-count">Number of Events:</label>
      <input
        type="number"
        id="event-count"
        className="number-input"
        role="textbox"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NumberOfEvents;