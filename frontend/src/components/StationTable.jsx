import { useNavigate } from "react-router-dom"

const StationTable = ({ stations }) => {
  const navigate = useNavigate()

  const stationsMap = stations.map((station) => {
    return (
      <tr key={station.Station_ID} onClick={() => navigate(`/stations/${station.Station_ID}`)}>
        <td>{station.Station_ID}</td>
        <td>{station.Name_FI}</td>
        <td>{station.Address_FI}</td>
        <td>{station.City_FI}</td>
        <td>{station.Capacity}</td>
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