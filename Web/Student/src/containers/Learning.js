import React from 'react';
import './Learning.css';
import Dropdown from '../components/dropdown';

const Learning = props => {
  return (
    <div className="learning-flex-container">
      <div className="learning-side-bar">
        <Dropdown/>
      </div>
      <div className="learning-main-content">
        <h1>Témakörök</h1>
      </div>
    </div>
  )
}
export default Learning
