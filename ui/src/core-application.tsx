import React from 'react';
import { useState } from 'react';
import './styles.css';

const SERVER = 'http://localhost:8081'

const App = () => {
  const [value, setValue] = useState()
  
  /**
   * set request
   */
  const click = async () => {
    const endpoint = value !== undefined ? '/close' : '/create' 
    const response:any = await fetch(SERVER  + endpoint)
    const { sessionId } = await response.json()
    setValue(sessionId)
  }

  return <div className="root">
    <header className="main-header">
      <button 
        className="create-button" 
        onClick={click} >
        { value ? 'Revoke' : 'Create' }
      </button>
      <span className={'session-id'} >{ value }</span>
    </header>
  </div>

} 
  
export default App;
