import React from 'react'

import logo from '../../../assets/images/logo.svg';


export default function LogoReact({width = 30, height = 30}) {
  return (

    <img src={logo} alt="logo" width={width} height={height} />

  )
}
