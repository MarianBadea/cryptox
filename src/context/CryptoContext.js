import { createContext, useLayoutEffect, useState } from "react";
import axios from 'axios';

//context object
export const CryptoContext = createContext({});
//provider component

export const CryptoProvider = ({children}) => {
    const [cryptoData, setCryptoData] = useState();
    const [coinData, setCoinData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState("");

    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(250);


    const axiosInstance = axios.create({
        headers: {
            "Accept": "application/json",
        },
    });

    
    const getCoinData = async (coinId) => {
        setCoinData();
        
        try {
            
            const response = await axiosInstance(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=flase&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`);
            setCoinData(response.data)
        } catch (error) {
            console.log('error', error)
        }
    };

    const getCryptoData = async () => {
        setCryptoData()
        setTotalPages(13942)
        // try {
            
        //     const response = await axiosInstance(`
        //     https://api.coingecko.com/api/v3/coins/list`);

        //     setTotalPages(response.data.length)
        // } catch (error) {
        //     console.log('error', error)
        // };

        try {
            
            const response = await axiosInstance(`
            https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
            `);

            setCryptoData(response.data)
        } catch (error) {
            console.log('error', error)
        }
    };
    
    const getSearchResult = async (query) => {
        try {
            
            const response = await axiosInstance(`
            https://api.coingecko.com/api/v3/search?query=${query}
            `);
            
            setSearchData(response.data.coins)
        } catch (error) {
            console.log('error', error)
        }
    };

    const resetFunction = () => {
        setPage(1)
        setCoinSearch('')
    }

    useLayoutEffect(() => {
       getCryptoData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinSearch, currency, sortBy, page, perPage])

    return (
        <CryptoContext.Provider value={
            {
                cryptoData,
                searchData,
                getSearchResult,
                setCoinSearch,
                setSearchData,
                currency,
                setCurrency,
                sortBy,
                setSortBy,
                page,
                setPage,
                totalPages,
                resetFunction,
                perPage,
                setPerPage,
                coinData,
                getCoinData
            }
        }>
            {children}
        </CryptoContext.Provider>
    )
}