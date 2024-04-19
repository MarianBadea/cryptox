import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import logoSvg from '../assets/logo.svg'
import { Logo } from './Logo';

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
                  hover:bg-gray-100  hover:text-cyan lg:py-2 lg:px-4 pl-6 py-1`
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
            icon: 'pi pi-bitcoin',
            command: () => {
                navigate('/');
              },
            template: itemRenderer
        },
        {
            label: 'Trending',
            icon: 'pi pi-star',
            command: () => {
                navigate('/trending');
              },
            template: itemRenderer
        },
        {
            label: 'Saved',
            icon: 'pi pi-star',
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
      }
  return (
    <>
    <Menubar
        className='bg-gray-300 flex justify-between w-full fixed z-10
        font-nunito font-bold text-white text-base rounded-none
        '
        model={items}
        start={start}
    />
    {/* <nav
        className='w-[50%] mt-16 flex flex-col md:flex-row gap-2 p-2 justify-around align-center
        border border-cyan rounded-lg
        '
    >
        <NavLink
            to="/"
            end
            className={
                ({isActive}) => {
                    return `w-full text-base text-center font-nunito font-bold
                    border-0 cursor-pointer rounded-lg capitalize
                    ${isActive ? 'bg-gray-200 text-cyan' : 'bg-cyan'}
                      hover:bg-gray-100  hover:text-cyan py-1 px-4`
                }
            }
        >
            Crypto
        </NavLink>
        <NavLink to="/trending"
            className={
                ({isActive}) => {
                    return `w-full  text-base text-center font-nunito font-bold
                    border-0 cursor-pointer rounded-lg capitalize
                    ${isActive ? 'bg-gray-200 text-cyan' : 'bg-cyan'}
                      hover:bg-gray-100  hover:text-cyan py-1 px-4`
                }
            }
        >
            trending
        </NavLink>
        <NavLink to="/saved"
            className={
                ({isActive}) => {
                    return `w-full  text-base text-center font-nunito font-bold
                    border-0 cursor-pointer rounded-lg capitalize
                    ${isActive ? 'bg-gray-200 text-cyan' : 'bg-cyan'}
                      hover:bg-gray-100  hover:text-cyan py-1 px-4`
                }
            }
        >
            saved
        </NavLink>
    </nav> */}
    </>
  )
}
