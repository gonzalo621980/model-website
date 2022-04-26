import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './context/redux/store/configureStore';
import Router from './Router';


function App({ basename }) {

  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <BrowserRouter basename={basename}>
          <Router basename={basename} />
        </BrowserRouter>

      </PersistGate>
    </Provider>
  );
}

export default App;
