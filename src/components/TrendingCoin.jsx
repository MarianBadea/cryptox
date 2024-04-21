import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TrendingCoin = ({data}) => {
    let navigate = useNavigate();

    const getCoinDetails = (id) =>{
        navigate(id)
    };

  return (
    <div 
        className='w-full md:w-[70%] lg:w-[40%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40'
        onClick={() => getCoinDetails(data.id)}
    >
        {
            data ?
            <>
                <div className='flex items-center justify-between'>
                    <h3 className='text-base flex items-center my-0.5 '>
                        <span className='text-gray-100 capitalize'>name:&nbsp;</span>
                        <span className='text-cyan'>{data.name}</span>
                    </h3> 
                    
                    <img className='w-[3rem] lg:w-[4rem] h-auto rounded-full' src={data.large} alt={data.name} />
                </div>

                <h3 className='text-base flex items-center my-0.5 '>
                    <span className='text-gray-100 capitalize'>market cap rank:&nbsp;</span>
                    <span className='text-cyan'>{data.market_cap_rank}</span>
                </h3> 

                <h3 className='text-base flex items-center my-0.5 '>
                    <span className='text-gray-100 capitalize'>price:&nbsp;</span>
                    <span className='text-cyan'>{
                        new Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: "btc",
                            maximumSignificantDigits: 5,
                        }).format(data.price_btc)
                    }</span>
                </h3> 

                <h3 className='text-base flex items-center my-0.5 '>
                    <span className='text-gray-100 capitalize'>score:&nbsp;</span>
                    <span className='text-cyan'>{data.score}</span>
                </h3> 


            </>
            : 
            <div className='w-full h-full flex items-center justify-center'>
                    <div 
                        className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin'
                        role='status'  
                    />
                     <span className='ml-2 text-white'>Please wait...</span>
                    </div>
        }
    </div>
  )
}
