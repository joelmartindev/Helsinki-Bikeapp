import { useContext } from "react"
import { useParams } from "react-router-dom"
import StationsContext from "./StationsContext"

const SingleStation = () => {
    const id = Number(useParams('id').id)
    const stations = useContext(StationsContext)

    if (stations === null) return <>Fetching data...</>

    const station = stations.find(station => station.id === id)
 
    if (station === undefined) return <>Station not found</>

    return (
        <>
            <p>{station.name_fi}</p>
            <p>{station.address_fi}</p>
            <p>TODO Total number of journeys starting from the station</p>
            <p>TODO Total number of journeys ending at the station</p>
        </>
    )
}

export default SingleStation