import React from 'react'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link 
        className='
            [text-decoration:none]
            text-xl
            text-cyan
            flex 
            items-center
        '
        to="/"
    >
        <span>Crypto</span>
        <span className='relative top-0 w-2 h-2 ml-1 mb-3'>
          
          {/* <i className="pi pi-times" style={{ color: '#2530F6' }}></i> */}
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14px" 
              height="14px" 
              fill="#fff"
              viewBox="0 0 35 25" 
              className="logo-svg flex-shrink-0 d-none d-sm-block"
            >
              <g clipPath="url(#a)">
                <path
                  fill="#fff"
                  d="m16.603 12.7 12.84-6.771-2.16-4.096-11.756 4.694a1.265 1.265 0 0 1-.941 0L2.826 1.833.667 5.929l12.84 6.772L.667 19.47l2.159 4.096 11.757-4.695c.302-.12.638-.12.94 0l11.758 4.695 2.158-4.096-12.84-6.772.004.003Z"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.667.197h300v49.785h-300z" />
                </clipPath>
              </defs>
            </svg>
        </span>
    </Link>
  )
}
