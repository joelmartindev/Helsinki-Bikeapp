import './App.css'
import JourneyTable from './components/JourneyTable'

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

  return (
    <>
      <JourneyTable rides={rides} />
    </>
  )
}

export default App
