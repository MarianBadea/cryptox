import React from 'react'
import { Link } from 'react-router-dom'
import logoSvg from '../assets/logo.svg'

export const Logo = () => {
  return (
    <Link 
        className='
            [text-decoration:none]
            text-lg
            text-cyan
            flex items-center
        '
        to="/"
    >
        <img src={logoSvg} alt="CryptoX" />
        <span>CryptoX</span>
    </Link>
  )
}
