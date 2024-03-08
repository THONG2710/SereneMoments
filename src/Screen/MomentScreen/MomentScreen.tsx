import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './Style';
import {SelectList} from 'react-native-dropdown-select-list';
import TakeAMoment from './Component/TakeAMoment';
import ItemMoment from './Component/ItemMoment';

const MomentScreen = () => {
  const [selected, setSelected] = useState('');
  const data = [{key: '1', value: 'Nguyễn Quang Trường'}];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backgroundImage}>
          <Image
            style={styles.imgAVT}
            source={require('../../Resource/images/avatar2.png')}></Image>
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          <SelectList
            boxStyles={styles.selectedList}
            inputStyles={styles.inputStylesSelected}
            dropdownStyles={styles.dropdownStylesSelected}
            dropdownTextStyles={styles.textDropdownStyles}
            setSelected={(value: React.SetStateAction<string>) =>
              setSelected(value)
            }
            data={data}
            save="value"
          />
        </View>
        <TouchableOpacity style={styles.save}>
          <Text style={styles.textSave}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* body */}
      <ItemMoment />
    </View>
  );
};

export default MomentScreen;
