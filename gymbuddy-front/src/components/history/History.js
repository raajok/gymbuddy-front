import React from 'react';
import axios from "axios";
import Session from "./Session";
import "./history.css";
import { API_URL } from '../../utils/constants';

const History = () => {
  const [trainings, setTrainings] = React.useState([]);

  React.useEffect(() => {
    handleTrainings();
  }, [trainings]);

  const handleTrainings = () => {
    axios.get(API_URL)
      .then(res => {
        setTrainings(res.data.reverse());
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className='history'>
      {trainings.map(training => {
        return (
          <Session key={training["_id"]} handleTrainings={handleTrainings} training={training} />
        )
      })}
    </div>
  );
};

export default History;