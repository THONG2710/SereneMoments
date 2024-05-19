import { View, Text } from 'react-native'
import React from 'react'
import { AppProvider, UserProvider } from '@realm/react'
import RealmWrapper from './RealmWrapper'

function AppWrapper(): JSX.Element {
  return (
    <AppProvider id={'semochat-iplpj'}>
      <UserProvider fallback={<RealmWrapper/>}>
        <RealmWrapper/>
      </UserProvider>
    </AppProvider>
  )
}

export default AppWrapper