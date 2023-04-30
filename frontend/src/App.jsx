import './App.css'
import JourneyTable from './components/JourneyTable'
import StationTable from './components/StationTable'

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
const stations = [
  {
    'FID': 1,
    'Station_ID': '501',
    'Name_FI': 'Hanasaari',
    'Name_SE': 'Hanaholmen',
    'Name_EN': "Hanasaari",
    'Address_FI': 'Hanasaarenranta 1',
    'Address_SE': "Hanaholmsstranden 1",
    'City_FI': 'Espoo',
    'City_SE': 'Esbo',
    'Operator': 'CityBike Finland',
    'Capacity': 10,
    'Coord_x': 24.840319,
    'Coord_y': 60.16582
  },
  {

    'FID': 2,
    'Station_ID': '503',
    'Name_FI': 'Keilalahti',
    'Name_SE': 'Kägelviken',
    'Name_EN': "Keilalahti",
    'Address_FI': 'Keilalahdentie 2',
    'Address_SE': "Kägelviksvägen 2",
    'City_FI': 'Espoo',
    'City_SE': 'Esbo',
    'Operator': 'CityBike Finland',
    'Capacity': 28,
    'Coord_x': 24.827467,
    'Coord_y': 60.171524
  },
  {
    'FID': 3,
    'Station_ID': '505',
    'Name_FI': 'Westendinasema',
    'Name_SE': 'Westendstationen',
    'Name_EN': "Westendinasema",
    'Address_FI': 'Westendintie 1',
    'Address_SE': "Westendvägen 1",
    'City_FI': 'Espoo',
    'City_SE': 'Esbo',
    'Operator': 'CityBike Finland',
    'Capacity': 16,
    'Coord_x': 24.805758,
    'Coord_y': 60.168266
  }
]

const App = () => {

  return (
    <>
      <JourneyTable rides={rides} />
      <StationTable stations={stations} />
    </>
  )
}

export default App
