import React from 'react';
import {useEffect, useState} from 'react';
import './App.css'
import EventList from "./components/EventList.jsx";
import CitySearch from "./components/CitySearch.jsx";
import NumberOfEvents from "./components/NumberOfEvents.jsx";
import {extractLocations, getEvents} from "./api.js";
import {InfoAlert} from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ? allEvents : allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (<div className="App">
    <div className="alerts-container">
      {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
    </div>
    <CitySearch
      allLocations={allLocations}
      setCurrentCity={setCurrentCity}
      setInfoAlert={setInfoAlert}/>
    <NumberOfEvents setCurrentNOE={setCurrentNOE}/>
    <EventList events={events}/>
  </div>);
}

export default App
