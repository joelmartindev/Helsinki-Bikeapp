import { useState, useEffect } from 'react'
import db from '../services/journeyDB'

const JourneyTable = () => {

  const [journeys, setJourneys] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await db.getAll()
            console.log(res)
            setJourneys(res)
        }

        fetchData()
    },[])

  if (journeys === null) return <>Loading list...</>

  const journeysMap = journeys.map((journey) => {
    return (
      <tr key={journey.id}>
        <td>{journey.departure}</td>
        <td>{journey.return}</td>
        <td>{journey.departure_station_id}</td>
        <td>{journey.departure_station_name}</td>
        <td>{journey.return_station_id}</td>
        <td>{journey.return_station_name}</td>
        <td>{journey.covered_distance / 1000}km</td>
        <td>{(journey.duration / 60).toFixed(2)} min</td>
      </tr>
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Departure</th>
          <th>Return</th>
          <th>Departure station id</th>
          <th>Departure station name</th>
          <th>Return station id</th>
          <th>Return station name</th>
          <th>Covered distance</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {journeysMap}
      </tbody>
    </table>
  )
}

export default JourneyTable