import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../Resource/colors';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';

interface DialogPrivacyProps {
  onCancel: () => void;
  onSetPrivacy: (privacy: number) => void;
}

const DialogPrivacy: React.FC<DialogPrivacyProps> = props => {
  const {onCancel, onSetPrivacy} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ai có thể xem nhật kí của bạn ?</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onSetPrivacy(3);
          onCancel();
        }}>
        <Text style={styles.txtBtn}>Công khai</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onSetPrivacy(2);
          onCancel();
        }}>
        <Text style={styles.txtBtn}>Bạn bè</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onSetPrivacy(1);
          onCancel();
        }}>
        <Text style={styles.txtBtn}>Chỉ mình tôi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DialogPrivacy;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    marginLeft: -20,
    backgroundColor: Colors.WHITE,
    height: Dimensions.get('screen').height / 4,
    marginTop: (Dimensions.get('screen').height / 4) * 3,
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    marginVertical: 15,
  },

  txtBtn: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 7,
  },

  btn: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
});
