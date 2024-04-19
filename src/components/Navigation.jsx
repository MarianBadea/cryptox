import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import { Logo } from './Logo';
import { Wallet } from './wallet/Wallet';

export const Navigation = () => {

    const navigate = useNavigate()
    
    const itemRenderer = (item) => (
        <NavLink
        to={item.to}
        end
        className={
            ({isActive}) => {
                return `w-full h-auto flex items-center text-base lg:text-lg text-center font-nunito font-bold text-white
                border-0 cursor-pointer rounded capitalize
                ${isActive ? 'bg-gray-300 text-cyan' : 'bg-cyan'}
                  hover:bg-gray-100  hover:text-cyan lg:py-1 lg:px-3 pl-6 py-1`
            }
        }
    >
         <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
    </NavLink>
    );

    const items = [
        {
            id: 'home',
            label: 'Crypto',
            command: () => {
                navigate('/');
              },
            template: itemRenderer
        },
        {
            label: 'Trending',
            command: () => {
                navigate('/trending');
              },
            template: itemRenderer
        },
        {
            label: 'Saved',
            command: () => {
                navigate('/saved');
              },
            template: itemRenderer
        }
    ];

    const start = () => {
        return (
            <Logo />
        )
      };
    
    const end = (
        <div className="flex items-center gap-2">
           <Wallet />
        </div>
    );
      
  return (
    <Menubar
        className='bg-gray-300 flex justify-between w-full fixed z-10
        font-nunito font-bold text-white text-base rounded-none gap-2
        '
        model={items}
        start={start}
        end={end}
    />
  )
}
