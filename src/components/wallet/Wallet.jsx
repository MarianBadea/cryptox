import React from 'react'
import { BalanceSection } from './BalanceSection'
import { useNavigate } from 'react-router-dom'

export const Wallet = () => {
const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
            {
                false ? (
                    <>
                        <BalanceSection />
                        <button>Logout</button>
                    </>
                ) : (
                    <button onClick={() => navigate("/wallet/unlock")}>Connect</button>
                )
            }
    </div>
  )
}
