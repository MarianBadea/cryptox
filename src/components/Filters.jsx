import React, { useContext, useRef } from 'react'
import { Search } from './Search'
import { CryptoContext } from '../context/CryptoContext'
import { Button } from 'primereact/button'

export const Filters = () => {

  let { currency, setCurrency, setSortBy, resetFunction } = useContext(CryptoContext);
  const currencyRef = useRef('usd')

  const handleCurrencySubmit = (e) => {
    e.preventDefault();

    let value = currencyRef.current.value;

    if(value){setCurrency(value)}

    currencyRef.current.value =''
  };

  const handleSort = (e) => {
    e.preventDefault();

    let value = e.target.value;

    setSortBy(value);

  }

  return (
    <div className='w-full h-full border-2 rounded-lg min-w-min
     border-gray-100 flex lg:flex-row flex-col lg:items-center 
      relative align-start justify-between
     text-white gap-2 py-2 px-2 '
    >
          <Search />
          <div className='flex lg:flex-row flex-col lg:items-center align-start justify-between gap-3'>
            <form
              className='relative flex w-full items-center font-nunito'
              onSubmit={handleCurrencySubmit}
            >

              <label
                htmlFor="currency"
                className='relative flex justify-center items-center'
              >
                <span className="mr-2 text-base sm:font-bold font-medium">currency: </span>
              </label>

              <input
                type="text"
                placeholder={currency}
                className='w-16 rounded bg-gray-200 placeholder:text-gray-100 h-full placeholder:text-base required outline-0 
                border border-transparent focus:border-cyan leading-4 text-base pl-2 
                '
                ref={currencyRef}
              />
                
              <Button className='pl-2 pr-4' size="small" type="submit" icon="pi pi-sign-in" />
            </form>
            <label htmlFor="" className='relative flex justify-start items-center'>
                <span className='sm:font-bold font-medium text-base min-w-max pr-2'>sort by: </span>
                <select
                name="sortby"
                className='rounded bg-gray-200 text-sm sm:text-base sm:font-bold pl-2 focus:outline-0 text-transparent capitalize leading-4 w-full sm:w-48 '
                onChange={handleSort}
                >
                  <option className='sm:text-base text-sm' value="market_cap_desc">market cap desc</option>
                  <option className='sm:text-base text-sm' value="market_cap_asc">market cap asc</option>
                  <option className='sm:text-base text-sm' value="volume_asc">volume asc</option>
                  <option className='sm:text-base text-sm' value="volume_desc">volume desc</option>
                  <option className='sm:text-base text-sm' value="id_asc">id asc</option>
                  <option className='sm:text-base text-sm' value="id_desc">id desc</option>
                </select>
                <Button
                  className='min-w-min ml-4 hover:scale-110 transition-all transition-ease bg-gray-200 px-2 text-base'
                  onClick={resetFunction}
                  label='Reset'
                >
                </Button>
            </label>
          </div>
    </div>
  )
}
