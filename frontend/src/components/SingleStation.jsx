import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StationsContext from "./StationsContext"
import db from "../services/stationDB"

const SingleStation = () => {
    const id = Number(useParams('id').id)
    const stations = useContext(StationsContext)
    const [totalJourneys, setTotalJourneys] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await db.getTotalJourneys(id)
            setTotalJourneys(res)
        }

        fetchData()
    },[id])

    if (stations === null) return <>Fetching data...</>

    const station = stations.find(station => station.id === id)
 
    if (station === undefined) return <>Station not found</>


    return (
        <>
            <p>{station.name_fi}</p>
            <p>{station.address_fi}</p>
            {totalJourneys === null 
            ? <p>Loading Total number of journeys starting from the station</p>
            : <p>Total departures {totalJourneys.departuresCount}</p>}
            {totalJourneys === null 
            ? <p>Loading Total number of journeys ending at the station</p>
            : <p>Total returns {totalJourneys.returnsCount}</p>}
        </>
    )
}

export default SingleStation