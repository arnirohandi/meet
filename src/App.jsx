import React from 'react';
import './App.css'
import EventList from "./components/EventList.jsx";
import CitySearch from "./components/CitySearch.jsx";

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App
