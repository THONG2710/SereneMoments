import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Progress.Circle size={30} indeterminate={true} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
