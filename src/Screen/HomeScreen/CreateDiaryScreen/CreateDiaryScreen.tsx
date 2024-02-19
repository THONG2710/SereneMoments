import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Shadow} from 'react-native-shadow-2';
import ItemOption from '../components/ItemOption';
import ButtonText from '../../../Components/Buttons/ButtonText';
import {CreateDiaryProps} from './type';

const listOptions = [
  {
    _id: 1,
    label: 'Mẫu sẵn',
  },
  {
    _id: 2,
    label: 'Nhãn dán',
  },
  {
    _id: 3,
    label: 'Văn bản',
  },
  {
    _id: 4,
    label: 'Hình ảnh',
  },
  {
    _id: 5,
    label: 'Hình ảnh',
  },
];

const CreateDiaryScreen: React.FC<CreateDiaryProps> = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');

  const onBack = () => {
    navigation.goBack();
  };

  const setStatusFilter = (status: string) => {
    setStatus(status);
  };

  const RenderOptions = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.options}>
        {listOptions.map(e => (
          <ItemOption
            onPress={() => setStatusFilter(e.label)}
            itemStyle={[status === e.label ? styles.optionActive : {}]}
            key={e._id}
            label={e.label}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.topComponent}>
        <View style={styles.header}>
          <View style={styles.hdLeft}>
            <Shadow style={styles.hdl_shadow} distance={2} offset={[0, 5]}>
              <ButtonIcon
                styleBtn={styles.hdl_btn}
                styles={styles.hdl_img}
                url={require('../../../Resource/images/avatar2.png')}
              />
            </Shadow>
          </View>
          <View style={styles.hdRight}>
            <ButtonIcon
              styles={styles.hdr_btnPrivate}
              url={require('../../../Resource/images/icon_editPrivate.png')}
            />
            <ButtonIcon
              styles={styles.hdr_btnClose}
              url={require('../../../Resource/images/icon_add.png')}
              onPress={onBack}
            />
          </View>
        </View>
        {RenderOptions()}
      </View>
      {/* body */}
      <View style={styles.body}>
        <Shadow distance={7} offset={[5, 5]} style={styles.bodyShadow}>
          <View style={styles.customize}></View>
        </Shadow>
      </View>
      {/* footer */}
      <View style={styles.footer}>
        <ButtonText label="Lưu" />
      </View>
    </View>
  );
};

export default CreateDiaryScreen;
