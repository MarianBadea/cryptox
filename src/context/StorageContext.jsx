import { createContext, useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import axios from 'axios';
import { CryptoContext } from "./CryptoContext";
import { Toast } from 'primereact/toast';

//context object
export const StorageContext = createContext({});
//provider component



const axiosInstance = axios.create({
    headers: {
        "Accept": "application/json",
    },
});

export const StorageProvider = ({children}) => {
    const toastRef = useRef(null);

    const [allCoins, setAllCoins] = useState([]);
    const [savedData, setSavedData] = useState();
    let {currency, sortBy} = useContext(CryptoContext);

    const showToast = (severity, summary, detail) => {
        toastRef.current?.show({ severity, summary, detail, life: 9000 });
      };

    const getSavedData = async (totalCoins = allCoins) => {
        try {
            
            const response = await axiosInstance(`
            https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
            `);

            setSavedData(response.data)
        } catch (error) {
            showToast('error', 'Error', 'You have exceeded the maximum requests per minute from CoinGecko. Please wait!')
            console.log('error', error)
        }
    };
    

    const resetSavedData = () => {
        getSavedData()
    }

    const saveCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));

        if(oldCoins.includes(coinId)) {
            return null;
        } else {
            let newCoins = [...oldCoins, coinId];

            setAllCoins(newCoins)
            localStorage.setItem("coins", JSON.stringify(newCoins))
        }
    };

    const removeCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));

        let newCoins = oldCoins.filter(coin => coin !== coinId)
        
        setAllCoins(newCoins)
        localStorage.setItem("coins", JSON.stringify(newCoins))
    }

    useEffect(() => {
        if(allCoins.length > 0) {
            getSavedData(allCoins)
        } else {
            setSavedData()  
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCoins])
    

    useLayoutEffect(() => {
        let isThere = JSON.parse(localStorage.getItem("coins")) || false;

        if(!isThere) {
            //empty local storage
            localStorage.setItem('coins', JSON.stringify([]))
        } else {
            // set state with the current values from the local storage
            let totalCoins = JSON.parse(localStorage.getItem("coins"));

            setAllCoins(totalCoins)

            if(totalCoins.length > 0) {
                getSavedData(totalCoins)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <StorageContext.Provider value={
            {
                allCoins,
                setAllCoins,
                saveCoin,
                removeCoin,
                savedData,
                resetSavedData
            }
        }>
            <Toast ref={toastRef} position="bottom-center" className='p-0 text-sm'/>
            {children}
        </StorageContext.Provider>
    )
}