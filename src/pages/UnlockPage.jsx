import { ExtensionLoginButton, LedgerLoginButton, WalletConnectLoginButton, WebWalletLoginButton } from "@multiversx/sdk-dapp/UI"
import { useNavigate } from "react-router-dom"

export const UnlockPage = () => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate("..")
    }

    return (
        <div 
            className="fixed h-full left-0 right-0 bg-gray-200 bg-opacity-30 
            backdrop-blur-sm flex justify-end font-nunito"
            onClick={closeModal}
        >
            <div className="flex flex-col items-end">
                <ExtensionLoginButton
                    loginButtonText="DeFi Wallet"
                    onLoginRedirect={() => navigate("/")}
                />
                <WebWalletLoginButton 
                    loginButtonText="Web Wallet"
                    callbackRoute="/"
                />
                <LedgerLoginButton 
                    loginButtonText="Ledger"
                    callbackRoute="/"
                />
                <WalletConnectLoginButton 
                    loginButtonText="xPortal"
                    callbackRoute="/"
                />
            </div>
        </div>
    )
}