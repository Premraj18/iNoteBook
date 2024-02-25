import React, { useContext } from 'react'
import Notes from './Notes';
import Addnote from './Addnote';

const Home = () => {
  return (
    <div style={{padding: '0 20px'}}>
      <Addnote/>
      <Notes/>
    </div>
  )
}

export default Home
