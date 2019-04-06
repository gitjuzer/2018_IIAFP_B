import React from 'react';
import './Learning.css';
import Dropdown from '../components/dropdown';
import Gamemode from '../components/gamemode';

const Learning = props => {
  return (
    <div className="learning-flex-container">
      <div className="learning-side-bar">
        <Dropdown/>
      </div>
      <div className="learning-main-content">
        <Gamemode name="X. téma neve" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dignissim odio. Curabitur laoreet lacus eu massa consequat, scelerisque finibus nulla commodo. Nulla quis suscipit sem. Phasellus ultricies consequat elementum. Aliquam non mauris non ligula varius facilisis at sit amet dolor. ">

        </Gamemode>
      </div>
    </div>
  )
}
export default Learning
