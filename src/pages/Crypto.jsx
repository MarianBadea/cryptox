import React from 'react'
import { TableComponent } from '../components/TableComponent'
import { Filters } from '../components/Filters'
import { Outlet } from 'react-router-dom'

export const Crypto = () => {
  return (
    <section
      className='w-[95%] lg:w-[85%] h-full flex flex-col mt-4 lg:mt-20 mb-24 relative'

    >
      <Filters />
      <TableComponent />
      <Outlet />
    </section>
  )
}
