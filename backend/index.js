const express = require('express')
const db = require('./utils/dbConfig')
const stationsRouter = require('./routes/stations')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/stations', stationsRouter)

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  try {
    await db.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})