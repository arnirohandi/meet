import React from 'react';
import './App.css'
import EventList from "./components/EventList.jsx";
import CitySearch from "./components/CitySearch.jsx";
import NumberOfEvents from "./components/NumberOfEvents.jsx";
import mockData from './mock-data';

const App = () => {
  return (
    <div className="App">
      <CitySearch/>
      <NumberOfEvents/>
      {/*Test only*/}
      {/*<EventList events={mockData}/>*/}
      <EventList/>
    </div>
  );
}

export default App
