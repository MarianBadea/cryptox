import { createContext, useLayoutEffect, useState, useRef } from "react";
import axios from 'axios';
import { Toast } from 'primereact/toast';


//context object
export const TrendingContext = createContext({});

//provider component

export const TrendingProvider = ({children}) => {
    const toastRef = useRef(null);
    const [trendData, setTrendData] = useState();

    const axiosInstance = axios.create({
        headers: {
            "Accept": "application/json",
        },
    });

    const showToast = (severity, summary, detail) => {
        toastRef.current?.show({ severity, summary, detail, life: 9000 });
      };
    

    const getTrendData = async () => {
        try {
            
            const response = await axiosInstance(`
            https://api.coingecko.com/api/v3/search/trending
            `);

            setTrendData(response.data.coins)
        } catch (error) {
            showToast('error', 'Error', 'You have exceeded the maximum requests per minute from CoinGecko. Please wait!')
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
            <Toast ref={toastRef} position="bottom-center" className='p-0 text-sm'/>
            {children}
        </TrendingContext.Provider>
    )
}