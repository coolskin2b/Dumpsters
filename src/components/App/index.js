// == Import : npm
import React from 'react'

// == Import : local
import './app.scss'
import Map from 'src/containers/Map'
import SearchCity from 'src/components/SearchCity'
// == Composant
const App = () => (
  <div id="app">
    <Map />
    <SearchCity />
  </div>
)

// == Export
export default App
