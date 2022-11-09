import React from 'react';
import axios from "axios";
import Session from "./Session";
import "./history.css";
import { API_URL } from '../../utils/constants';
import LoadingSpinner from '../LoadingSpinner';

const History = () => {
  const [trainings, setTrainings] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    handleTrainings();
  }, []);

  const handleTrainings = () => {
    setIsLoading(true);
    axios.get(API_URL)
      .then(res => {
        setTrainings(res.data.reverse());
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error.message);
      });
  };

  return (
    <div className='history'>
      {isLoading ? <LoadingSpinner /> : trainings.map(training => {
        return (
          <Session key={training["_id"]} handleTrainings={handleTrainings} training={training} />
        )
      })}
    </div>
  );
};

export default History;