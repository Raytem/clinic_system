'use client'

import AuthProvider from '@/providers/AuthProvider'
import { RootStoreContext } from '@/stores/contexts/root-store-context'
import RootStore from '@/stores/root-store'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ThemeProvider } from 'react-bootstrap'


const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
        <ThemeProvider>
            <AuthProvider>
              { children }
            </AuthProvider>
        </ThemeProvider>
    </RootStoreContext.Provider>
  )
}

export default App