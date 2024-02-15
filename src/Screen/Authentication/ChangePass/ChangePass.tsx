import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { ChangePasswordProps } from './type'

const ChangePass: React.FC<ChangePasswordProps> = (props) => {
    const {navigation} = props;

    const ChangePassword = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sayHello2}>Đổi mật khẩu</Text>
            <View style={styles.containerImg}>
                <Image style={styles.img} source={require('../../../Resource/images/img_logo2.png')} />
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={require('../../../Resource/images/icon_key.png')} />
                <TextInput style={styles.txtBtn} secureTextEntry={true} placeholder='Mật khẩu mới'></TextInput>
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={require('../../../Resource/images/icon_key.png')} />
                <TextInput style={styles.txtBtn} secureTextEntry={true} placeholder='Xác nhận lại mật khẩu'></TextInput>
            </View>
            <TouchableOpacity onPress={ChangePassword}>
                <View style={styles.btnLogin}>
                    <Text style={styles.txtBtn2}>Đổi mật khẩu</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChangePass