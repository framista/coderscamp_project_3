import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, VehicleList, VehicleInsert, VehicleUpdate, UserInsert, UserList, UserUpdate, VehicleRouteList, VehicleRouteInsert, VehicleRouteUpdate } from '../pages'
import { Sidebar } from '../components'
import '../components/sidebar.css'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path={'/login'} component={Login} />
        <PrivateRoute path="/vehicles/list" exact component={VehicleList} />
        <PrivateRoute path="/vehicles/create" exact component={VehicleInsert} />
        <PrivateRoute path="/vehicles/update/:id" exact component={VehicleUpdate} />
        <Route path="/vehicleRoutes/list" exact component={VehicleRouteList} />
        <Route path="/vehicleRoutes/create" exact component={VehicleRouteInsert} />
        <Route path="/vehicleRoutes/update/:id" exact component={VehicleRouteUpdate} />
        <PrivateRoute path="/users/list" exact component={UserList} />
        <PrivateRoute path="/users/create" exact component={UserInsert} />
        <PrivateRoute path="/users/update/:id" exact component={UserUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
