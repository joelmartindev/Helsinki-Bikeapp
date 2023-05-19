import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import JourneyTable from './components/JourneyTable'
import StationTable from './components/StationTable'
import SingleStation from './components/SingleStation'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import stationDB from './services/stationDB'
import StationsContextLayout from './components/StationsContextLayout'

const rides = [
  {
    'id': 1,
    'Departure': '2021-05-31T23:57:25',
    'Return': '2021-06-01T00:05:46',
    'Departure station id': '094',
    'Departure station name': "Laajalahden aukio",
    'Return station id': '100',
    'Return station name': "Teljäntie",
    'Covered distance': 2043,
    'Duration': 500
  },
  {
    'id': 2,
    'Departure': '2021-05-31T23:56:59',
    'Return': '2021-06-01T00:07:14',
    'Departure station id': '082',
    'Departure station name': "Töölöntulli",
    'Return station id': '113',
    'Return station name': "Pasilan asema",
    'Covered distance': 1870,
    'Duration': 611
  },
  {
    'id': 3,
    'Departure': '2021-05-31T23:56:44',
    'Return': '2021-06-01T00:03:26',
    'Departure station id': '123',
    'Departure station name': "Näkinsilta",
    'Return station id': '121',
    'Return station name': "Vilhonvuorenkatu",
    'Covered distance': 1025,
    'Duration': 399
  }
]

const App = () => {
  const [stations, setStations] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const stations = await stationDB.getAll()
      console.log('Fetched stations')
      setStations(stations)
    }

    fetchData()
  }, [])

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/journeys' element={<JourneyTable rides={rides} />} />
          <Route element={<StationsContextLayout stations={stations} />}>
            <Route path='/stations' element={<StationTable />} />
            <Route path='/stations/:id' element={<SingleStation />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App