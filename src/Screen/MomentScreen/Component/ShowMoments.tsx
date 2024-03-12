import {ScrollView, StyleSheet, Text, View, ViewProps} from 'react-native';
import React, { useEffect } from 'react';
import {MomentModel} from '../../../Models/Model';
import ItemMoment from './ItemMoment';

interface ShowMomentsProps extends ViewProps {
  moments: MomentModel[];
}

const ShowMoments: React.FC<ShowMomentsProps> = props => {
  const {moments} = props;

  useEffect(() => {
    console.log(moments.length);
    
  }, [])
  
  return (
    <ScrollView style={styles.container}>
      {moments.map(moment => (
        <ItemMoment key={moment._id.toString()} moment={moment} />
      ))}
    </ScrollView>
  );
};

export default ShowMoments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
