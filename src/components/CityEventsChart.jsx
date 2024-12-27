import React from 'react';
import {useEffect, useState} from 'react';
import {CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from 'recharts';

const CityEventsChart = ({allLocations, events}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    // console.log("All location: " + allLocations);
    return allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
      const city = location.split((/, | - /))[0]
      return {city, count};
    });
  };
  // console.log("This is events: " + events.length);
  // console.log("This is data: " + JSON.stringify(data));
  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid/>
        <XAxis type="category" dataKey="city" name="city" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}/>
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false}/>
        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        <Scatter name="A school" data={data} fill="#8884d8"/>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;