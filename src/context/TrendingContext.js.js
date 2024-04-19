import { createContext, useLayoutEffect, useState } from "react";
import axios from 'axios';

//context object
export const TrendingContext = createContext({});
//provider component

export const TrendingProvider = ({children}) => {
    const [trendData, setTrendData] = useState();

    const axiosInstance = axios.create({
        headers: {
            "Accept": "application/json",
        },
    });

    const getTrendData = async () => {
        try {
            
            const response = await axiosInstance(`
            https://api.coingecko.com/api/v3/search/trending
            `);

            setTrendData(response.data.coins)
        } catch (error) {
            console.log('error', error)
        }
    };

    const resetTrendingFunction = () => {
        getTrendData()
    }

    useLayoutEffect(() => {
        getTrendData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <TrendingContext.Provider value={
            {
                trendData,
                resetTrendingFunction,
            }
        }>
            {children}
        </TrendingContext.Provider>
    )
}