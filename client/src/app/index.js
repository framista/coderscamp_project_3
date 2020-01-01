import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { VehicleList, VehicleInsert, VehicleUpdate } from '../pages'
import {Sidebar } from '../components'
import '../components/sidebar.css'
function App() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/vehicles/list" exact component={VehicleList} />
        <Route path="/vehicles/create" exact component={VehicleInsert} />
        <Route path="/vehicles/update/:id" exact component={VehicleUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
