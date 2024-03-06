import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Dialog from '../Dialog/Dialog';
import AwesomeAlert from 'react-native-awesome-alerts';

const ListFriend = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [friends, setFriends] = useState(Friend);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const handleDeleteFriend = (friend) => {
        setSelectedFriend(friend);
        setShowAlert(true);
    };

    const handleConfirmDelete = () => {
        const updatedFriends = friends.filter((item) => item._id !== selectedFriend._id);
        setFriends(updatedFriends);
        setSelectedFriend(null);
        setShowAlert(false);
      };

    return (
        // CONTAINER
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.search}>
                    <TouchableOpacity>
                        <Image style={styles.imgSearchFriend} source={require('../../Resource/Image2/search.png')}></Image>
                    </TouchableOpacity>
                    <TextInput style={styles.ipSearchFriend} placeholder='Tìm kiếm bạn bè'></TextInput>
                </View>
            </View>
            {/* CENTER */}
            <View style={styles.center}>
                <Text style={styles.sumFriend}>57 bạn bè</Text>
                {
                    friends.map((item) =>
                        <View key={item._id} style={styles.itemFriend}>
                            <View style={styles.itemFriendLeft}>
                                <Image style={styles.imgAvatar} source={item.imageAVT}></Image>
                                <View style={styles.friend}>
                                    <Text style={styles.nameFriend}>{item.name}</Text>
                                    <Text style={styles.manutalFriend}>{item.manutalFriend}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteFriend(item)}>
                                <Image source={require('../../Resource/Image2/unFriend.png')} style={styles.itemFriendRight}></Image>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>
            <Dialog message='Bạn có chắc chắn muốn xóa người này không' title='Xóa bạn bè' isvisible={showAlert} onConfirm={handleConfirmDelete} onCancel={() => { setShowAlert(false) }}></Dialog>

        </ScrollView>
    )
}

export default ListFriend

const styles = StyleSheet.create({
    // CONTAINER
    container:
    {
        flex: 1,
        backgroundColor: '#F1F9FF'
    },

    // HEADER
    header:
    {
        marginHorizontal: 20
    },

    search:
    {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E1E3',
        marginTop: 10,
        borderRadius: 20

    },

    imgSearchFriend:
    {
        width: 24,
        height: 24,
        marginLeft: 15,
    },

    ipSearchFriend:
    {
        height: 45,
        fontSize: 14
    },

    // CENTER
    center:
    {
        marginTop: 20,
        marginHorizontal: 20
    },

    sumFriend:
    {
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    },

    itemFriend:
    {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    itemFriendLeft:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    nameFriend:
    {
        fontSize: 16,
        color: 'black',
        fontWeight: '400'
    },

    manutalFriend:
    {
        fontWeight: '400',
        color: '#666666'
    },

    itemFriendRight:
    {
        width: 25,
        height: 25,
        tintColor: 'black'
    },

    imgAvatar:
    {
        width: 50,
        height: 50,
        borderRadius: 30
    },

    friend:
    {
        marginLeft: 10
    },


    btn:
    {
        backgroundColor: 'blue',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        marginHorizontal: 100,
        marginVertical: 100
    },

    text:
    {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#fff',
        fontWeight: 'bold',
    },

    // DIALOG



})


const Friend = [
    {
        _id: '1',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '24 bạn chung',
    },

    {
        _id: '2',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '20 bạn chung',
    },


    {
        _id: '3',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '24 bạn chung',
    },

    {
        _id: '4',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '20 bạn chung',
    },

    {
        _id: '5',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '24 bạn chung',
    },

    {
        _id: '6',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '20 bạn chung',
    },

    {
        _id: '7',
        name: 'Nguyễn Trường',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '24 bạn chung',
    },

    {
        _id: '8',
        name: 'Nguyễn Thông',
        imageAVT: require('../../Resource/Image2/avt.jpg'),
        manutalFriend: '20 bạn chung',
    },


]
