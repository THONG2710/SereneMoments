import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { EMAILREGISTER, KEYREGISTER, REGISTER } from '../../../Resource/images'

const Register: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sayHello}>Xin chào.</Text>
            <Text style={styles.sayHello2}>Đăng ký ngay !! ^.^</Text>
            <View style={styles.containerImg}>
                <Image style={styles.img} source={{ uri: REGISTER }} />
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: EMAILREGISTER }} />
                <TextInput style={styles.txtBtn}></TextInput>
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: KEYREGISTER }} />
                <TextInput style={styles.txtBtn} secureTextEntry={true}></TextInput>
            </View>
            <View style={styles.btnRegister}>
                <Image style={styles.imgIcon} source={{ uri: KEYREGISTER }} />
                <TextInput style={styles.txtBtn} secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity>
                <View style={styles.btnLogin}>
                    <Text style={styles.txtBtn2}>Đăng ký</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerNote}>
                <Text style={styles.txtNote}>Bạn đã sẵn sàng tạo tài khoản ?</Text>
                <TouchableOpacity>
                    <Text style={styles.btnNote}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register