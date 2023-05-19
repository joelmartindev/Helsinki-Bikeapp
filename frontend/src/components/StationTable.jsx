import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import StationsContext from './StationsContext'

const StationTable = () => {
  const navigate = useNavigate()
  const stations = useContext(StationsContext)

  if (stations === null) return <>Fetching data...</>

  const stationsMap = stations.map((station) => {
    return (
      <tr key={station.id} onClick={() => navigate(`/stations/${station.id}`)}>
        <td>{station.id}</td>
        <td>{station.name_fi}</td>
        <td>{station.address_fi}</td>
        <td>{station.city_fi}</td>
        <td>{station.capacity}</td>
      </tr>
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Capacity</th>
        </tr>
      </thead>
      <tbody>
        {stationsMap}
      </tbody>
    </table>
  )
}

export default StationTable