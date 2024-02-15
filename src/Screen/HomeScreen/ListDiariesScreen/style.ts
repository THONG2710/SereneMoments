import { StyleSheet } from "react-native";
import { Colors } from "../../../Resource/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_BLUE,
    },

    // header
    header: {
        width: "100%",
        backgroundColor: Colors.BLUE,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    header_btnICon: {
        width: 30,
        height: 30,
    }
}) 