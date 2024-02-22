import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    //CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.background}>  
          <Image style={styles.imgAVT} source={require('../../Resource/Image2/avt.jpg')}></Image>
          <TouchableOpacity style={styles.backgroundAdd}>
            <Image style={styles.imgAdd} source={require('../../Resource/Image2/add.png')}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.textName}>Thông Nguyễn</Text>
        <TouchableOpacity style={styles.backgroundEdit}>
          <Text style={styles.textEdit}>Sửa đổi thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>

      {/* CENTER */}
      {/* CENTER TOP */}
      <View style={styles.centerTop}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Của bạn</Text>
          <Image style={styles.imgTitle} source={require('../../Resource/Image2/your.png')}></Image>
        </View>
        <TouchableOpacity style={styles.itemContentOne}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/note.png')}></Image>
            <Text style={styles.textItem}>Nhật ký</Text>
          </View>
          <Text style={styles.notificationItem}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContentTwo}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/moment.png')}></Image>
            <Text style={styles.textItem}>Khoảnh khắc</Text>
          </View>
          <Text style={styles.notificationItem}>14</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContentThree}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/friend.png')}></Image>
            <Text style={styles.textItem}>Bạn bè</Text>
          </View>
          <Text style={styles.notificationItem}>12</Text>
        </TouchableOpacity>

      </View>
    {/* CENTERBOTTOM */}
      <View style={styles.centerBot}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Cài đặt</Text>
          <Image style={styles.imgTitle} source={require('../../Resource/Image2/setting2.png')}></Image>
        </View>

        <TouchableOpacity style={styles.itemContentOne}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/resetPassword.png')}></Image>
            <Text style={styles.textItem}>Đặt mật khẩu</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContentThree}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/setting.png')}></Image>
            <Text style={styles.textItem}>Đặt mặc định</Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Tài khoản</Text>
          <Image style={styles.imgTitle} source={require('../../Resource/Image2/warning.png')}></Image>
        </View>
        <TouchableOpacity style={styles.itemContentOne}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/logOut.png')}></Image>
            <Text style={styles.textItem}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContentThree}>
          <View style={styles.itemContentLeft}>
            <Image style={styles.imageItem} source={require('../../Resource/Image2/deleteAcount.png')}></Image>
            <Text style={[styles.textItem,{color:'red'}]}>Xóa tài khoản</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: '#F1F9FF',
    flex: 1
  },
  //HEADER

  header:
  {
    alignItems: 'center',
    marginTop: 50
  },

  background:
  {
    width: 110,
    height: 110,
    backgroundColor: '#86B6F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'relative'
  },

  imgAVT:
  {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  backgroundAdd:
  {
    position: 'absolute',
    backgroundColor: '#86B6F6',
    width: 22,
    height: 22,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    right: 5
  },

  imgAdd:
  {
    width: 15,
    height: 15
  },

  textName:
  {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#176B87',
    marginTop: 10
  },

  backgroundEdit:
  {
    backgroundColor: '#499EDC',
    borderRadius: 20,
    marginTop: 5
  },

  textEdit:
  {
    padding: 10,
    color: '#fff',
    fontWeight: '500',
    fontSize: 13

  },
  //CENTER
  centerTop:
  {
    marginHorizontal: 20,
    marginTop: 30
  },

  centerBot:
  {
    marginHorizontal: 20,
    marginTop: 20
  },


  title:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 10
  },

  textTitle:
  {
    color: '#176B87',
    fontSize: 14,
    fontWeight: 'bold'
  },

  imgTitle:
  {
    width: 20,
    height: 20,
    marginLeft: 5
  },

  imgSetting:
  {
    width: 20,
    height: 20,
    marginLeft: 3,
  },


  itemContentOne:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E6FF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7
  },

  itemContentTwo:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E6FF',
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 2
  },


  itemContentThree:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E6FF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 2
  },


  itemContentLeft:
  {
    flexDirection: 'row',
  },

  textItem:
  {
    marginLeft: 10,
    color: '#176B87',
    fontWeight: '500',
    
  },

  imageItem:
  {
    width: 20,
    height: 20
  },

  notificationItem:
  {
    color: '#176B87',
    fontSize: 14,
    fontWeight: '400'
  },
  //FOOTER
  footer:
  {
    marginTop: 20,
    marginHorizontal: 20
  },
})