import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    //HEADER
    header: {
        marginHorizontal: 15,
        marginVertical: 25,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    backgroundImage: {
        width: 42,
        height: 42,
        backgroundColor: 'white',
        borderRadius: 21,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 15, // chỉ dùng cho Android
        justifyContent: 'center',
        alignItems: 'center',
    },

    dropdownContainer: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        alignItems: 'center',
        left: 80,
    },

    selectedList: {
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 0,
        width: 200,
        fontFamily: 'Helvetica',
        height: 45,
    },

    inputStylesSelected: {
        color: '#176B87',
        fontWeight: 'bold',
    },

    dropdownStylesSelected: {
        backgroundColor: 'white',
        borderWidth: 0,
        width: 200,
        fontWeight: 'bold',
        zIndex: 1,
    },

    textDropdownStyles: {
        color: '#176B87',
        fontWeight: '500',
    },

    imgAVT: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    backgroundImageMN: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 21,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 15, // chỉ dùng cho Android
        justifyContent: 'center',
        alignItems: 'center',
    },

    imgMN: {
        width: 28,
        height: 28,
    },
});