import React from 'react'
import ActivityForm from '../../ActivityForm/ActivityForm'

const Activity = ({setLoad}) => {
  return (
    <div>
        <h1>Add New Activity </h1>
        <ActivityForm setLoad = {setLoad}/>
        <hr style={{width: '80%'}}/>
    </div>
  )
}

export default Activity