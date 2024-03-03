import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import React from 'react'

const MomentHistory = () => {
    return (
        // CONTAINER
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image style={styles.imgSearch} source={require('../../Resource/Image2/search.png')}></Image>
                </TouchableOpacity>
                <TextInput style={styles.ipSearch} placeholder='Search'></TextInput>
            </View>
            {/* CENTER */}
            <View style={styles.center}>
                
            </View>
            {/* FOOTER */}
            <View style={styles.footer}>

            </View>

        </View>
    )
}

export default MomentHistory

const styles = StyleSheet.create({
    // CONTAINER
    container:
    {
        flex: 1,
        backgroundColor: '#fff'
    },
    // HEADER
    header:
    {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEBEB',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius:10

    },

    imgSearch:
    {
        width: 20,
        height: 20,
        tintColor: '#000',
        marginLeft:15
    },

    ipSearch:
    {
        height:45,
        fontSize:18,
        marginLeft:10,
        fontWeight:'500',
        color:'#606060'
    },
    // CENTER
    center:
    {

    },
    // FOOTER
    footer:
    {

    }
})