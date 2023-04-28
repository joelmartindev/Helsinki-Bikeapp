
const JourneyTable = ({ rides }) => {

    const ridesMap = rides.map((ride) => {
      return (
        <tr key={ride.id}>
          <td>{ride.Departure}</td>
          <td>{ride.Return}</td>
          <td>{ride['Departure station id']}</td>
          <td>{ride['Departure station name']}</td>
          <td>{ride['Return station id']}</td>
          <td>{ride['Return station name']}</td>
          <td>{ride['Covered distance'] / 1000}km</td>
          <td>{(ride.Duration / 60).toFixed(2)} min</td>
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
          {ridesMap}
        </tbody>
      </table>
    )
  }

  export default JourneyTable