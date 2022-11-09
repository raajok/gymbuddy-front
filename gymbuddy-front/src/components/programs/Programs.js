import React from 'react';
import axios from "axios";
import ProgramCard from './ProgramCard';
import ProgramForm from './ProgramForm';
import './programs.css';
import { API_URL } from '../../utils/constants';
import LoadingSpinner from '../LoadingSpinner';

const Programs = () => {
  const [programs, setPrograms] = React.useState([]);
  const [activeProgram, setActiveProgram] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getPrograms();

    const active = JSON.parse(localStorage.getItem('activeProgram'));
    if (active) {
      setActiveProgram(active);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('activeProgram', JSON.stringify(activeProgram));
  }, [activeProgram]);

  const getPrograms = () => {
    setIsLoading(true);
    axios.get(API_URL+'programs')
      .then(res => {
        setPrograms(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="program-container">
      {isLoading ? <LoadingSpinner /> : 
        <div className="programcard-container">
          { programs.map(program => 
            <ProgramCard key={program["_id"]} 
              active={activeProgram === program["_id"] ? true : false} 
              setActive={setActiveProgram} 
              program={program} 
            />
          )}
        </div>
      }
      <div className="programform-container">
        <ProgramForm getPrograms={getPrograms} />
      </div>
    </div>
  );
};

export default Programs;