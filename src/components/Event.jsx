import React, {useState} from 'react';

const Event = ({event}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  };

  return (
    <li className="event">
      {/* Event title */}
      <h2 className="event-title">{event.summary}</h2>

      {/* Event location */}
      <p className="event-location">{event.location}</p>

      {/* Event date and time */}
      <p className="event-time">
        {new Date(event.start.dateTime).toLocaleString('en-GB', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: event.start.timeZone,
        })}
      </p>

      {/* Details section */}
      {showDetails ? (
        <div className="event-details">
          <p className="event-description">{event.description}</p>
          <button data-testid="toggle-btn" onClick={toggleDetails}>Hide Details</button>
        </div>
      ) : (
        <button data-testid="toggle-btn" onClick={toggleDetails}>Show Details</button>
      )}
    </li>
  );
}

export default Event;