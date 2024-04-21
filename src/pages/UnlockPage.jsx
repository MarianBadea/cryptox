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
        <div className="fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-gray-300 bg-opacity-75 rounded-lg text-white p-8 max-w-md w-full">
                <div className="flex justify-end">
                    <Button className="p-0" icon="pi pi-times" aria-label="Cancel" onClick={() => navigate("/")} />
                </div>
                <h2 className="text-center text-lg font-bold mb-6 ">Connect to a wallet:</h2>
                <div className="flex flex-col items-center space-y-4">
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
    );
}