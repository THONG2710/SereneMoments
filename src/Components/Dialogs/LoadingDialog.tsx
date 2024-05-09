import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Progress from 'react-native-progress';

interface LoadingDialogProps{
  isVisible: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = props => {
  const {isVisible} = props;
  return (
    <AwesomeAlert
      show={isVisible}
      closeOnTouchOutside={false}
      customView={<Progress.Circle size={30} indeterminate={true} />}
    />
  );
};

export default LoadingDialog;

const styles = StyleSheet.create({});
