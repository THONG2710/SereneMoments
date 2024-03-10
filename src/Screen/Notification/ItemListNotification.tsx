import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemListNotification = () => {
  return (
    <ScrollView style={styles.footer}>
    {
        ListNotification.map((item) =>
            <TouchableOpacity key={item._id} style={styles.itemNotification}>
                <Image style={styles.avt} source={item.imageAVT}></Image>
                <View style={styles.itemContent}>
                    <View style={styles.status}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textTime}>{item.time}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.textStatus}>{item.status}</Text>
                </View>
            </TouchableOpacity>
        )
    }
        <View style={{marginBottom:30}}/>
</ScrollView>
  )
}

export default ItemListNotification

const styles = StyleSheet.create({
    footer:
    {
        flex: 0.85,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        marginLeft: 15,
        marginTop: 35,
        paddingTop:20
    },

    itemNotification:
    {
        flexDirection:'row',
        marginTop:20,
        marginLeft:40,
        borderBottomWidth:1,
        paddingBottom:20,
        borderColor:'#EEEEEE',
        alignItems:'center'
    },

    avt:
    {
        width: 40,
        height: 40,
        borderRadius: 20
    },

    itemContent:
    {
        flexDirection: 'row',
        marginLeft:10
    },

    status:
    {
        marginLeft:3
    },

    textName:
    {
        fontSize:15,
        fontWeight:'bold',
        color:'#000'
    },

    textStatus:
    {
        marginLeft:5,
        width:'55%',
        color:'#000',
        fontWeight:'500',

    },

    textTime:
    {
        fontWeight:'bold'
    }
})


const ListNotification = [
    {
        _id: '1',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },

    {
        _id: '2',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },


    {
        _id: '3',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },

    {
        _id: '4',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },

    {
        _id: '5',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },

    {
        _id: '6',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },

    {
        _id: '7',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },

    {
        _id: '8',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        status: 'đã thích bài viết của bạn',
        time: "Vào lúc 13:00"
    },


]