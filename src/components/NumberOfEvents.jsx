import React, {useState} from 'react';

const NumberOfEvents = ({ defaultValue = 32, onChange, setCurrentNOE, setErrorAlert}) => {
  const [eventCount, setEventCount] = useState(defaultValue);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || '';
    setEventCount(value);
    setCurrentNOE(value);
    if (onChange) {
      onChange(value);
    }
    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Only positive numbers are allowed";
    } else {
      errorText = ""
    }
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <div classname="text-above">Number of Events: </div>
      <label htmlFor="event-count" className="input-label"></label>
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