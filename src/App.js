import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/App.css'
import Navbar from './components/Layout/Navbar'
import Index from './components/Layout/Index'
import {Provider} from './context'


function App() {
  return (
    <Provider>
    <Router>
      <React.Fragment>
        <Navbar/>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={ Index }/>
          </Switch>
        </div>
      </React.Fragment>
    </Router>
    </Provider>
  )
}

export default App
