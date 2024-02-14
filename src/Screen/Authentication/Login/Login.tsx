import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { EMAIL, FACEBOOK, HELLO, USER } from '../../../Resource/images'

const Login: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sayHello}>Xin chào.</Text>
            <View style={styles.containerImg}>
                <Image style={styles.img} source={{ uri: HELLO }} />
            </View>
            <TouchableOpacity>
                <View style={styles.btnLogin}>
                    <Image style={styles.imgIcon} source={{ uri: EMAIL }} />
                    <Text style={styles.txtBtn}>Đăng nhập bằng gmail</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.btnLogin}>
                    <Image style={styles.imgIcon} source={{ uri: FACEBOOK }} />
                    <Text style={styles.txtBtn}>Đăng nhập bằng facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.btnLogin}>
                    <Image style={styles.imgIcon} source={{ uri: USER }} />
                    <Text style={styles.txtBtn}>Đăng nhập bằng tài khoản</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerRegister}>
                <Text style={styles.txtRegister}>Bạn chưa có tài khoản ?</Text>
                <TouchableOpacity>
                    <Text style={styles.register}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
       
                <Text style={styles.txtNote}>Tiếp tục và đồng ý với các</Text>
                <TouchableOpacity>
                    <Text style={styles.btnNote}>điều khoản & chính sách riêng tư</Text>
                </TouchableOpacity>
        </View>
    )
}

export default Login