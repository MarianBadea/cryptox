import { ExtensionLoginButton, LedgerLoginButton, WalletConnectLoginButton, WebWalletLoginButton } from "@multiversx/sdk-dapp/UI"
import { useNavigate } from "react-router-dom"
import { Button } from 'primereact/button';
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks"
import React, { useEffect } from "react";

export const UnlockPage = () => {

    const isLoggedIn = useGetIsLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div 
            className="fixed h-full w-full top-0 right-0 bg-gray-200 bg-opacity-30 
            backdrop-blur-sm flex flex-col justify-center items-center font-nunito"
            
        >

            <div 
                className='w-[65%] md:w-[45%] h-[35%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative flex flex-col justify-between py-5'
            >
                <div className="flex justify-end px-2">
                    <Button icon="pi pi-times" aria-label="Cancel"  onClick={() => navigate("/")}/>
                </div>
                <div className="flex flex-col justify-center items-center px-10">
                    <h2 className="text-lg font-bold mb-4">Connect to a wallet:</h2>
                    <ExtensionLoginButton
                        className="w-full"
                        loginButtonText="DeFi Wallet"
                        onLoginRedirect={() => navigate("/")}
                    />
                    <WebWalletLoginButton 
                        className="w-full"
                        loginButtonText="Web Wallet"
                        callbackRoute="/"
                    />
                    <LedgerLoginButton 
                        className="w-full"
                        loginButtonText="Ledger"
                        callbackRoute="/"
                    />
                    <WalletConnectLoginButton 
                        className="w-full"
                        loginButtonText="xPortal"
                        callbackRoute="/"
                    />
                </div>
            </div>
        </div>
    )
}