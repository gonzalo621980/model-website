import React from 'react'
import { bool } from 'prop-types';
import LoadingImg from '../../../assets/images/Loading.gif';
import './index.css';

const Loading = (props) => {
  const {visible} = props;
  
  return (
    <>
        <div className={visible ? ("Loading Loading__show") : ("Loading Loading__hide")} >
            <img src={LoadingImg} alt="loading img"/>
        </div>
    </>
  )
}

Loading.propTypes = {
  visible: bool
};

Loading.defaultProps = {
  visible: false
};

export default Loading;
