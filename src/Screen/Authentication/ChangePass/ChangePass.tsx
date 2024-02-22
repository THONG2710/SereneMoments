import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { KEYREGISTER, REGISTER } from '../../../Resource/images'

const ChangePass: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sayHello2}>Đổi mật khẩu</Text>
            <View style={styles.containerImg}>
                <Image style={styles.img} source={require('../../../Resource/Image2/logo.png')} />
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: KEYREGISTER }} />
                <TextInput style={styles.txtBtn} secureTextEntry={true} placeholder='Mật khẩu mới'></TextInput>
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: KEYREGISTER }} />
                <TextInput style={styles.txtBtn} secureTextEntry={true} placeholder='Xác nhận lại mật khẩu'></TextInput>
            </View>
            <TouchableOpacity>
                <View style={styles.btnLogin}>
                    <Text style={styles.txtBtn2}>Đổi mật khẩu</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChangePass