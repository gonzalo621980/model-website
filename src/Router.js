import React from 'react';
import { useSelector } from 'react-redux';
import {
  Routes,
  Route
} from "react-router-dom";

import { PublicRoutes } from './routes/public';
import { PrivateRoutes } from './routes/private';
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import Master from './components/layout/Master';


function Router() {

  const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated );

  return (
    <Routes>
    {
        PublicRoutes.map((route, index) => (
            <Route key={index}
                path={route.path}
                element={
                    <PublicRoute
                        isAuthenticated={isAuthenticated}
                        component={<Master component={route.component} />}
                    />
                }
            />
        ))
    }
    {
        PrivateRoutes.map((route, index) => (
            <Route key={index} 
                path={route.path}
                element={
                    <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        component={<Master component={route.component} />}
                    />
                }
            />
        ))
    }
    </Routes>
  );
}

export default Router;
