import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Resource/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // =========== top component ============
    topComponent: {
        backgroundColor: Colors.BLUE,
    },

    // =========== header =================================
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 70,
    },

    // ======== left =================================
    hdLeft: {
        flex: 4,
        alignItems: "flex-start",
        justifyContent: 'center',
    },

    hdl_shadow: {
        borderRadius: 50,
    },

    hdl_img: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 10,
    },

    hdl_btn: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: Colors.WHITE,
    },
    // ============ right ================
    hdRight: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between',
    },

    hdr_btnPrivate: {
        width: 30,
        height: 30,
    },

    hdr_btnClose: {
        width: 30,
        height: 30,
    },

    // =========== options =================
    options: {
        flexDirection: 'row',
        height: 40,
    },

    optionActive: {
        borderWidth: 1,
        borderColor: Colors.WHITE,
    },

    option: {
        fontSize: 14,
        color: Colors.WHITE,
    },

    // ================ body =================
    body: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height / 10 * 7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bodyShadow: {
        width: Dimensions.get("screen").width / 10 * 9,
        height: '97%',
    },

    customize: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.DARK_BLUE,
        backgroundColor: Colors.WHITE,
    },

    // ========= footer =================
    footer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 15,
        marginBottom: 10,
    }
})