import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    sayHello2:{
        fontSize:30,
        fontWeight:'500',
        color:'#8D6666',
        textAlign:'center',
        marginTop:50,
        
    },
    containerImg:{
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    img:{
        width:275,
        height:242,
        
    },
    btnRegister:{
        backgroundColor:'#E7E7E7',
        borderRadius:30,
        marginHorizontal:15,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        marginTop:20,
        elevation: 5,
        shadowColor: '#000',
    },
    btnLogin:{
        backgroundColor:'#A87070',
        borderRadius:30,
        marginHorizontal:15,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        marginTop:30,
        justifyContent:'center'
    }, imgIcon:{
        width:25,
        height:24,
    },
    txtBtn:{
        marginLeft:10,
        width:'80%'
    },
    txtBtn2:{
        fontWeight:'700',
        fontSize:15,
        color:'white',
    },
})


export default styles
