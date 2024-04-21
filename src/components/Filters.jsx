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

    setCurrency(value);

    currencyRef.current.value =''
  };

  const handleSort = (e) => {
    e.preventDefault();

    let value = e.target.value;

    setSortBy(value);

  }

  return (
    <div className='w-full h-full border-2 rounded-lg
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
                <span className="mr-2  sm:text-base text-sm sm:font-bold font-medium">currency: </span>
              </label>

              <input
                type="text"
                placeholder={currency}
                className='w-16 rounded bg-gray-200 placeholder:text-gray-100 h-full placeholder:text-base required outline-0 
                border border-transparent focus:border-cyan leading-4  sm:text-base text-sm pl-2 py-1 
                '
                ref={currencyRef}
              />
                
              <Button className='pl-2 pr-4' size='Large' type="submit" icon="pi pi-sign-in">
              </Button>
            </form>
            <label htmlFor="" className='relative flex justify-start items-center'>
                <span className='sm:font-bold font-medium sm:text-base text-sm w-16'>sort by: </span>
                <select
                name="sortby"
                className='rounded bg-gray-200 sm:text-base text-sm pl-2 py-1.5 focus:outline-0 text-transparent capitalize leading-4 w-full sm:w-48 '
                onClick={handleSort}
                >
                  <option className='sm:text-base text-sm' value="market_cap_desc">market cap desc</option>
                  <option className='sm:text-base text-sm' value="market_cap_asc">market cap asc</option>
                  <option className='sm:text-base text-sm' value="volume_asc">volume asc</option>
                  <option className='sm:text-base text-sm' value="volume_desc">volume desc</option>
                  <option className='sm:text-base text-sm' value="id_asc">id asc</option>
                  <option className='sm:text-base text-sm' value="id_desc">id desc</option>
                </select>
                <Button
                  className='min-w-min ml-4 hover:scale-110 transition-all transition-ease bg-gray-200 px-2 py-1.5 md:py-1 text-sm md:text-base'
                  onClick={resetFunction}
                  label='Reset'
                >
                </Button>
            </label>
          </div>
    </div>
  )
}
