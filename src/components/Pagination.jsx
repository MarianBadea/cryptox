import React, { useContext } from 'react'
import paginationArr from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext';

const PerPage = () => {
  let { setPerPage } = useContext(CryptoContext);

    const handlePerPage = (e) => {
        e.preventDefault();
    
        let value = e.target.value;
    
        setPerPage(value);
      }

    return (
        <label htmlFor="" className='flex justify-center items-center mr-2'>
              <span className='font-bold mr-2'>per page: </span>
              <select
              name="perpage"
              className='rounded bg-gray-200 text-base pl-2 py-0.5 leading-4 capitalize focus:outline-0'
              onChange={handlePerPage}
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="300">200</option>
              </select>
            </label>
    )
}

export const Pagination = () => {

    let {cryptoData, page, setPage, totalPages, perPage} = useContext(CryptoContext);
    const TotalNumber = Math.ceil(totalPages / perPage);

    const next = () => {
        if(page === TotalNumber) {
            return null;
        } else {
            setPage(page + 1)
        }
    };

    const prev = () => {
        if(page === 1) {
            return null;
        } else {
            setPage(page - 1)
        }
    }

    const multiStepNext = () => {
        if(page + 3 >= TotalNumber) {
            setPage(TotalNumber - 1)
        } else {
            setPage(page + 3)
        }
    };

    const multiStepPrev = () => {
        if(page - 3 <= 1) {
            setPage(TotalNumber + 1)
        } else {
            setPage(page - 2)
        }
    }
  if(cryptoData && cryptoData.length >= perPage) {
    return (
        <div className='w-full flex md:flex-row flex-col items-center justify-between gap-2'>
            <ul className='flex items-center text-sm '>
                <li className='flex items-center'>
                    <button 
                        className='outline-0 hover:text-cyan w-8'
                        onClick={prev}
                    >
                        <img 
                            className='w-full h-auto rotate-180'
                            src={paginationArr}
                            alt="left"
                        />
                    </button>
                </li>
                {
                    (page + 1 === TotalNumber || page === TotalNumber) ?
                    <li><button onClick={multiStepPrev} className='outline-0 hover:text-cyan w-8 h-8 flex items-center justify-center text-lg'>...</button></li>
                    : null
                }
                {
                    (page - 1 !== 0) ?
                    <li><button onClick={prev} className='outline-0 hover:text-cyan w-8 h-8 flex items-center justify-center mx-1.5 '>{page - 1}</button></li>
                    : null
                }
                <li><button disabled className='outline-0 w-8 h-8 flex items-center justify-center text-cyan mx-1.5'>{page}</button></li>
                {
                    (page + 1 !== TotalNumber && page !== TotalNumber)?
                    <li><button onClick={next} className='outline-0 hover:text-cyan w-8 h-8 flex items-center justify-center mx-1.5'>{page + 1}</button></li>
                    : null
                }
                {
                    page + 1 !== TotalNumber && page !== TotalNumber ?
                    <li><button onClick={multiStepNext} className='outline-0 hover:text-cyan w-8 h-8 flex items-center justify-center text-lg'>...</button></li>
                    : null
                }
                {
                    page !== TotalNumber ?
                    <li><button onClick={() => setPage(TotalNumber)} className='outline-0 hover:text-cyan w-8 h-8 flex items-center justify-center mx-1.5'>{TotalNumber}</button></li>
                    : null
                }
                <li>
                    <button 
                        className='outline-0 hover:text-cyan w-8'
                        onClick={next}
                    >
                        <img 
                            className='w-full h-auto'
                            src={paginationArr}
                            alt="right"
                        />
                    </button>
                </li>
            </ul>
            <PerPage />

        </div>
      )
  } else {
    return null
  }
}
