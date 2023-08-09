# Helsinki BikeApp

City bikes as data!

The goal of this project was to create both a frontend and a backend for a website and deploy it online as my first portfolio project. The website uses public data from the 2021 season of city bikes in Helsinki. It displays the various journeys, stations and statistics calculated based on the data.
The inspiration for it came from the [Solita Dev Academy Pre-assignment](https://github.com/solita/dev-academy-2023-exercise) where the data was provided along with some basic feature requests. They gave applicants free hands to choose their technology stack, so I chose to gain more experience with React, Node.js, Express and PostgreSQL.

The website is deployed at https://helsinkibikeapp.fly.dev/

## Technologies used

When I started building a portfolio, I decided that every project should aim to use a language, library or a tool I'm unfamiliar with. This is to show that I'm capable of learning and willing to use new technologies. Many of the technologies here I've only used very little or have no experience with, so I've marked the new ones with (\*)!

My aim was to also minimize the use of libraries to make sure I know the basics. I would have liked to try out Redux, Redux Toolkit or TanStack for example, but I'll save them for future projects.

Frontend:

- JavaScript
  - Native Fetch (\*), since I've only used the Axios library before
- Vite (\*)
- React
  - React ContextAPI (\*), since I tried to minimize prop drilling
- React Router (\*)
- Tailwind (\*)
  - CSS Animations (\*)
- Leaflet with React Leaflet (\*)
- Chart.js with React-Chartjs-2 (\*)

Backend:

- Node.js
- Express
- PostgreSQL
- Sequelize (\*)

Preparing data:

- Python
  - Pandas

It's possible that I'll return to this project later on to practise making tests with Jest for example.

## Data

The journey data, owned by City Bike Finland, is divided into 3 csv files.

- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

A row of the data along with the labels looks like this:

```
Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-31T23:57:25,2021-06-01T00:05:46,94,Laajalahden aukio,100,Teljäntie,2043,500
```

Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

- Dataset: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
- License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

A row of the data along with the labels looks like this:

```
ID,Name_FI,Name_SE,Name_EN,Address_FI,Address_SE,City_FI,City_SE,Operator,Capacity,Coord_x,Coord_y
501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
```

I noticed that the data had errors in it for some reason so I created a Python script in the root of the project. Any typos in data remain there, such as the missing end in station name: "Aalto-yliopisto (M), Tietot".

Data filtered out includes journeys that are:

- Under 10 seconds
- Shorter than 10 meters
- Including data from stations that can't be found
- 24 hours or longer, which is counted as a missing bike
- Duplicates

The ready data was then moved to a PostgreSQL server online hosted by [Neon](https://neon.tech/). Thank you Neon!

While coding the website I treated the data as if it would to be able to change at some point, even if in the end I didn't add an option for creating new data.

## Features

Through iteration, I've experimented with different styles and features for the project. I've changed the UI based on observing how users use it. For example: I made some links more apparent, because the user didn't seem to realize it was a link. I changed from a table style presentation of journeys and stations to a card based style. I added statistics for least popular stations and the results seemed to always have a list of ones, which is not interesting data so I removed it.

### Menu

- Responsive
  - Logo and buttons move closer until unable
  - Menu button replaces tab buttons on mobile screen sizes
    - Clicking the menu button shows hidden buttons in a column
  - Tab buttons are underlined when their page is active

### Explore View

- Map of all stations
- Map markers
  - Basic info
  - Link to the specific station

### Journeys View

- List of all journeys in a card format
  - Each journey has a link to a detailed view
- Pagination
  - Page indicator shows how many pages available
  - Indicator also works with searches
- Search for station names

#### Single Journey View

- Journey details
  - Start and endpoints with links
  - Date and timestamps
  - Distance and time of journey
- Map
  - Centered on the departure station
  - Shows the return station as well

### Stations View

- List of all stations in a card format
  - Each station has a link to a detailed view
- Pagination
  - Page indicator shows how many pages available
  - Indicator also works with searches
- Search for station names or addresses

#### Single Station View

- Station details
  - Address
  - Capacity
- Map
  - Shows the current station
- Statistics
  - Total departures and returns made
  - Average distance of departure and return journeys
  - Top 5 destinations from this station and departures to this station
    - Links to each station
  - Bar graph of weekly journeys in the season

### Statistics View

- Averages
  - Average distance of all journeys
  - Average duration of all journeys
- Journeys
  - Longest distances
  - Most popular journeys
  - Graph of journeys per week
- Stations
  - Most and least popular stations for departures
  - Most and least popular stations for returns
