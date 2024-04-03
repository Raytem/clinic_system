'use client'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '@/stores/contexts/root-store-context';
import { useFetch } from '@/hooks/useFetch'
import { authService } from '@/services/auth.service'
import { accessTokenUtil } from '@/utils/access-token.util'
import CenteredSpinner from '@/components/CenteredSpinner'
import { Role } from '@/enums/Role'

const AuthProvider: React.FC<{ children: React.ReactNode }> = observer(({ 
    children
}) => {
    const { userStore } = useStore();
  
    const [checkAuth, isLoading, error] = useFetch(async () => {
      const userWithToken = await authService.refresh();
      const user = userWithToken.user;
  
      userStore.setUser(user);
      accessTokenUtil.set(userWithToken.accessToken);
    })
  
    useEffect(() => {
      checkAuth()
    }, [])

    return (
        <>
            { 
                isLoading 
                ?
                <CenteredSpinner/>
                :
                children   
            }
        </>
    )
})

export default AuthProvider