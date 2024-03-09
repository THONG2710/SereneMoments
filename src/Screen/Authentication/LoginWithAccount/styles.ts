import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    sayHello:{
        fontSize:50,
        fontWeight:'bold',
        color:'#8D6666',
        textAlign:'center',
        marginTop:50
    },
    sayHello2:{
        fontSize:30,
        fontWeight:'500',
        color:'#8D6666',
        textAlign:'center',
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
        marginTop:10,
        elevation: 5,
        shadowColor: '#000',
        paddingHorizontal: 15,
    },
    imgIcon:{
        width:30,
        height:30,
    },
    txtBtn:{
        marginLeft:10,
        width:'80%'
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
    },
    txtBtn2:{
        fontWeight:'700',
        fontSize:15,
        color:'white',
    },
    containerNote:{
        flexDirection:'row',
        alignSelf:'center',
        marginTop:10
    },
    txtNote:{
        fontSize:15,
        fontWeight:'400',
        color:'black',
   
    },
    btnNote:{
        fontSize:15,
        fontWeight:'600',
        color:'black',
        marginLeft:5

    },

    icon_eye: {
        width: 25,
        height: 25,
    }

})
export default styles
