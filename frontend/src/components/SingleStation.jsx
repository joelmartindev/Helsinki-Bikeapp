import { useState } from "react"
import { useParams } from "react-router-dom"

const SingleStation = () => {
    const id = useParams()
    const [station, setStation] = useState(null)

    // Next fetch station data from database

    return (
        <>
            <p>insert station.Name_FI</p>
            <p>insert station.Address_FI</p>
            <p>insert Total number of journeys starting from the station</p>
            <p>insert Total number of journeys ending at the station</p>
        </>
    )
}

export default SingleStation