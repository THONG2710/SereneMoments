import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './Style';
import {SelectList} from 'react-native-dropdown-select-list';

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
        <View style={styles.backgroundImageMN}>
          <TouchableOpacity>
            <Image
              style={styles.imgMN}
              source={require('../../Resource/images/icon_menu.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MomentScreen;
