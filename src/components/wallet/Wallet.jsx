import React from 'react'
import { BalanceSection } from './BalanceSection'
import { useNavigate } from 'react-router-dom'
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks"
import {logout} from "@multiversx/sdk-dapp/utils"
import { Button } from 'primereact/button'

export const Wallet = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <div className="flex items-center gap-2">
            {
                isLoggedIn ? (
                    <div className='flex h-auto items-center justify-end gap-2'>
                        <BalanceSection />
                        <Button
                          className='bg-cyan px-2 py-1'
                          icon="pi pi-sign-out"
                          label='Logout'
                          onClick={handleLogout}
                        />
                    </div>
                ) : (
                  <Button
                    className='bg-cyan px-2 py-1'
                    icon="pi pi-bolt"
                    label='Connect'
                    onClick={() => navigate("/wallet/unlock")}
                  />
                )
            }
    </div>
  )
}
