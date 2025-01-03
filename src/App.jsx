import React from 'react';
import {useEffect, useState} from 'react';
import './App.css'
import EventList from "./components/EventList.jsx";
import CitySearch from "./components/CitySearch.jsx";
import NumberOfEvents from "./components/NumberOfEvents.jsx";
import CityEventsChart from "./components/CityEventsChart.jsx";
import EventGenresChart from "./components/EventGenresChart.jsx";
import {extractLocations, getEvents} from "./api.js";
import {InfoAlert, ErrorAlert, WarningAlert} from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are not online. Events may not be up to date.");
    }
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
      {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
    </div>
    <CitySearch
      allLocations={allLocations}
      setCurrentCity={setCurrentCity}
      setInfoAlert={setInfoAlert}/>
    <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert}/>
    <div className="charts-container">
      <EventGenresChart events={events}/>
      <CityEventsChart allLocations={allLocations} events={events}/>
    </div>
    <EventList events={events}/>
  </div>);
}

export default App
