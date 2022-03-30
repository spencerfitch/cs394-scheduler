import React, { useState, useEffect } from 'react';

import './App.css';
import CourseList from './components/CourseList';
import { addScheduleTimes } from './utilities/time';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw response;
        
        return response.json();
      })
      .then((json) => {
        setSchedule(addScheduleTimes(json));
      });
  }, []);

  if (!schedule) return (<h1>Loading schedule...</h1>)

  return (
    <div className='container'>
      <Banner title={ schedule.title }/>
      <CourseList courses={ schedule.courses }/>
    </div>
  );
};

export default App;
