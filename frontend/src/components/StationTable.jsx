const StationTable = ({ stations }) => {

    const stationsMap = stations.map((stations) => {
      return (
        <tr key={stations.Station_ID}>
          <td>{stations.Station_ID}</td>
          <td>{stations.Name_FI}</td>
          <td>{stations.Address_FI}</td>
          <td>{stations.City_FI}</td>
          <td>{stations.Capacity}</td>
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