import React, { useContext, useState } from 'react'
import { CryptoContext } from '../context/CryptoContext'
import debounce from 'lodash.debounce';
import { Button } from 'primereact/button';
/// Am ramas la 2h
const SearchInput = ({handleSearch}) => {
  const [searchText, setSearchText] = useState("");

  let {searchData, setCoinSearch, setSearchData } = useContext(CryptoContext)

  let handleInput = (e) => {
    e.preventDefault();
    
    let query = e.target.value;
    setSearchText(query)
    handleSearch(query)
  }

  const selectCoin = (coin) => {
    setCoinSearch(coin)
    setSearchText("")
    setSearchData();
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(searchText)
  }

  return (
    <>
      <form 
        className='lg:w-80 w-full relative flex items-center font-nunito'
        onSubmit={handleSubmit}
      >
        <input 
          type="text" 
          name='Search'
          onChange={handleInput}
          value={searchText}
          className='w-full rounded bg-gray-200 placeholder:text-gray-100 px-2  required outline-0 border border-transparent focus:border-cyan' 
          placeholder='Search...'
        />
        <Button
          type="submit"
          size='small'
          className='absolute right-1 cursor-pointer'
          icon="pi pi-search"
        />
      </form>

      {
        searchText.length > 2 ?
        <ul className='absolute top-7 right-0 w-full max-h-96 rounded overflow-x-hidden py-2 z-10 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200'>
          {searchData ? 
            searchData.map(coin => {
              return (
                <div key={coin.id}>
                  <li 
                    className='flex items-center cursor-pointer ml-4 my-2'
                    onClick={() => {selectCoin(coin.id)}}
                  >
                    <img className='w-[1rem] h-[1rem] mx-1.5' src={coin.thumb} alt={coin.name} />
                    <span>{coin.name}</span>
                  </li>
                </div>
              )
            })
          : <div className='w-full h-full flex items-center justify-center'>
                <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin' role='status' />
                <span className='ml-2'>Searching...</span>
            </div>
            }
        </ul>
        : null
      }
    </>
  );
}

export const Search = () => {
  let {getSearchResult} = useContext(CryptoContext);

  const debounceFunc = debounce((val) => {
    getSearchResult(val);
  }, 2000);

  return (
   <div className='relative'>
    <SearchInput handleSearch={debounceFunc}/>
   </div>
  )
}
