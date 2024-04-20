import {FormatAmount} from "@multiversx/sdk-dapp/UI"
import {useGetAccountInfo, useGetNetworkConfig} from "@multiversx/sdk-dapp/hooks"

export const BalanceSection = () => {
    const { account } = useGetAccountInfo();
    const { network } = useGetNetworkConfig()
    return (
        <>
        <span className="hidden md:inline-block">Your balance: </span>
        <div className="bg-gray-200 rounded py-1 px-1">
            <i className="pi pi-bolt" style={{ color: 'slateblue' }}></i>
            <FormatAmount className="text-sm" value={ account.balance } egldLabel={network.egldLabel}/>
        </div>
        </>
    )
}