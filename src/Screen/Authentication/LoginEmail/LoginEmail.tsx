import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { EMAILREGISTER, KEYREGISTER, REGISTER } from '../../../Resource/images'

const LoginEmail: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sayHello}>Xin chào.</Text>
            <Text style={styles.sayHello2}>Đăng nhập vào Semo ^.^</Text>
            <View style={styles.containerImg}>
                <Image style={styles.img} source={require('../../../Resource/Image2/logo.png')} />
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: EMAILREGISTER }} />
                <TextInput placeholder='Nhập Email' style={styles.txtBtn}></TextInput>
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: KEYREGISTER }} />
                <TextInput placeholder='Nhập mật khẩu' style={styles.txtBtn} secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity>
                <View style={styles.btnLogin}>
                    <Text style={styles.txtBtn2}>Đăng nhập</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerNote}>
                <Text style={styles.txtNote}>Quên mật khẩu ?</Text>
                <TouchableOpacity>
                    <Text style={styles.btnNote}>Bấm vào đây</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginEmail