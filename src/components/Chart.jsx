import React, { useContext, useLayoutEffect, useState } from 'react'
import axios from 'axios';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { CryptoContext } from '../context/CryptoContext';

function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length > 0) {
      return (
        <div className="custom-tooltip">
          <p className="label text-sm text-cyan">{`${label} : ${
             new Intl.NumberFormat('en-US', {
                style: "currency",
                currency: currency,
                minimumFractionDigits: 2,
            }).format(payload[0].value)
            }`}</p>
        </div>
      );
    }
  
    return null;
  }

const ChartComponent = ({data, currency, type}) => {
    return (
        <ResponsiveContainer height={"90%"}>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#23f7dd" strokeWidth={"1px"} />
                <CartesianGrid stroke="#323232" />
                <XAxis dataKey="date" hide/>
                <YAxis dataKey={type} hide domain={["auto", "auto"]}/>
                <Tooltip content={<CustomTooltip/>}  currency={currency} cursor={false} wrapperStyle={{outline: "none"}}/>
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
};

export const Chart = ({id}) => {
const axiosInstance = axios.create({
    headers: {
        "Accept": "application/json",
    },
});

const [chartData, setChartData] = useState()
const [type, setType] = useState("prices")
const [days, setDays] = useState(7)
const {currency} = useContext(CryptoContext)

useLayoutEffect(() => {
    const getChartData = async (id) => {
        try {
            
            const response = await axiosInstance(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
            console.log('response.data', response.data)
            
            let convertedData = response.data[type].map(item => {
                return {
                date: new Date(item[0]).toLocaleDateString(),
                [type]: item[1]
             }}
            )
            
            setChartData(convertedData);

        } catch (error) {
            console.log('error', error)
        }
    }

    getChartData(id)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id, type, days])

  return (
    <div className='w-full h-[60%]'>
        <ChartComponent 
            data={chartData}
            currency={currency}
            type={type}
        />
        <div className='flex'>
            <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${type === 'prices'? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setType("prices")}>Price</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${type === 'market_caps'? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setType("market_caps")}>Market Cap</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${type === 'total_volumes'? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setType("total_volumes")}>Total Volume</button>

            <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${days === 7 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setDays(7)}>7D</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${days === 14 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setDays(14)}>14D</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${days === 30? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setDays(30)}>1M</button>

        </div>
    </div>
  )
}
