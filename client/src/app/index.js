import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { VehicleList, VehicleInsert, VehicleUpdate, UserInsert, UserList, UserUpdate, VehicleRouteList, VehicleRouteInsert, VehicleRouteUpdate } from '../pages'
import { Sidebar } from '../components'
import '../components/sidebar.css'

function App() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/vehicles/list" exact component={VehicleList} />
        <Route path="/vehicles/create" exact component={VehicleInsert} />
        <Route path="/vehicles/update/:id" exact component={VehicleUpdate} />
        <Route path="/vehicleRoutes/list" exact component={VehicleRouteList} />
        <Route path="/vehicleRoutes/create" exact component={VehicleRouteInsert} />
        <Route path="/vehicleRoutes/update/:id" exact component={VehicleRouteUpdate} />
        <Route path="/users/list" exact component={UserList} />
        <Route path="/users/create" exact component={UserInsert} />
        <Route path="/users/update/:id" exact component={UserUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
