import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useApp} from '@realm/react';
import {OpenRealmBehaviorType} from 'realm';
import App from './App';
import {Realm} from '@realm/react'
import { RealmContext } from './src/Models/ChatSchema';
const {RealmProvider} = RealmContext;

function RealmWrapper(): JSX.Element {
  const app = useApp();
  const [isLoggin, setisLoggin] = useState(false);

  useEffect(() => {
    const login = async () => {
      const credetials = Realm.Credentials.anonymous();
      await app.logIn(credetials);
      setisLoggin(true);
    };
    login();
  }, [app]);

  return (
    <SafeAreaView style={{flex: 1, }}>
      {isLoggin ? (
         <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: {
              type: OpenRealmBehaviorType.DownloadBeforeOpen,
            },
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}>
          <App />
        </RealmProvider>  
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
}

export default RealmWrapper;
