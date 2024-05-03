import React, { useState } from 'react'
import ActivityLogs from '../components/Logs/OldLogs/ActivityLogs'
import Activity from '../components/Logs/NewLogs/Activity'

const Home = () => {

  const [load, setLoad] = useState(false)

  return (
    <section>
      <Activity setLoad = {setLoad} load = {load}/>
      <ActivityLogs load = {load}/>
    </section>
  )
}

export default Home