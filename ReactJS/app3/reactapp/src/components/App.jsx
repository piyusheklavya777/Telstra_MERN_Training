import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import WorkshopsList from './WorkshopsList';

import WorkshopDetails from './WorkshopDetails'
import { Route, withRouter } from 'react-router-dom';

const WorkshopDetailsWithRouter = withRouter( WorkshopDetails );

function App(props) {
    return (
        <div>
              <Navbar/>
              <Route path="/" exact >
                   <Home/>
              </Route>
              <Route path="/workshops" exact >
                    <WorkshopsList/>                   
              </Route>
              <Route path="/workshops/:id" component={WorkshopDetailsWithRouter}   />
                

        </div>
    );
}

export default App;