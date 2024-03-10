import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import ItemListNotification from './ItemListNotification'

const Notification = () => {
    return (
        // CONTAINER
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <TouchableOpacity style={styles.back}>
                        <Image style={styles.imgBack} source={require('../../Resource/Image2/back.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.avt} source={require('../../Resource/Image2/avt.jpg')}></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerContent}>
                    <Text style={styles.textNotification}>Thông báo</Text>
                    <Image style={styles.imgNotification} source={require('../../Resource/Image2/notification.png')}></Image>
                </View>
            </View>
            {/* FOOTER */}
           <ItemListNotification/>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    // CONTAINER:
    container:
    {
        flex: 1,
        backgroundColor: '#F1F9FF'
    },
    // HEADER:
    header:
    {
        flex: 0.15,
        marginHorizontal: 20,
        marginTop: 30
    },

    headerTitle:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    back:
    {
        borderWidth: 1,
        borderColor: '#919090',
        height: 26,
        width: 26,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBF0F7'
    },

    imgBack:
    {
        width: 16,
        height: 16
    },

    avt:
    {
        width: 40,
        height: 40,
        borderRadius: 20
    },

    headerContent:
    {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center'
    },

    textNotification:
    {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },

    imgNotification:
    {
        width: 20,
        height: 20,
        marginLeft: 8
    },
    // FOOTER
   


})
