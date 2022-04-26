import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ErrorBoundary from '../../common/ErrorBoundary';
import './index.css';


function Master(props) {

  return (
      <div className="Master">

        <Header />

        <div className="container">
          <ErrorBoundary>
            {React.createElement(props.component)}
          </ErrorBoundary>
        </div>

        <Footer />
                
      </div>
  );
}

export default Master;