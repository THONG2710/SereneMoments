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
        height: 60,
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
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 10,
    },

    hdl_btn: {
        borderWidth: 2,
        borderRadius: 50,
        padding: 2,
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
        transform: [{ rotate: '45deg' }],
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
        height: Dimensions.get("screen").height / 10 * 6.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },

    bodyShadow: {
        width: Dimensions.get("screen").width / 10 * 9,
        height: '100%',
    },

    customize: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.DARK_BLUE,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },

    diaryContent: {
    },

    // ========= footer =================
    footer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 15,
        marginBottom: 10,
    },

    // =========== time ============
    timeGroup: {
        zIndex: 1,
    },

    // ============================
    normalTimeGroup: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        marginVertical: 10,
    },

    normalTimeTxt: {
        fontSize: 18,
        color: Colors.BLACK,
        textAlign: 'right',
    },

    // ==================================
    simplifyTimeGroup: {
        flexDirection: 'column',
        marginLeft: 20,
        marginTop: 10,
    },

    simplifyUp: {
        flexDirection: 'row',
        marginLeft: 15,
    },

    simplifyDown: {
        flexDirection: 'row',
    },

    simplifyTimetxt: {
        fontSize: 20,
        color: Colors.BROWN,
        fontFamily: 'Lobster-Regular',
    },

    // ===================================================
    styleTimeGroup: {
        width: '100%',
        alignItems: 'flex-start',
    },

    styleDaytxt: {
        fontSize: 40,
        fontFamily: 'Playball-Regular',
        color: Colors.BLUE,
    },

    styleDateGroup: {
        flexDirection: 'row',
        backgroundColor: Colors.BLUE,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginLeft: 20,
    },

    styleTimetxt: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: 'Parisienne-Regular',
    },

    // ==========================================
    artTimeGroup: {
        width: 120,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },

    artDateTxt: {
        fontSize: 80,
        color: Colors.BLACK,
        fontFamily: 'BodoniModa-VariableFont_opsz,wght'
    },

    artMonthtxt: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: Colors.WHITE,
        fontFamily: 'PinyonScript-Regular',
        color: Colors.BLACK,
        fontSize: 16,
    },

    artYearTxt: {
        position: 'absolute',
        top: 10,
        right: -3,
        color: Colors.BLACK,
    },

    // ======================================================
    simpleTimeGroup2: {
        alignItems: "center",
    },

    simpleSmallGroup2: {
        flexDirection: 'row',
        width: 150,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    simpleDateTxt2: {
        fontFamily: 'Playball-Regular',
        paddingHorizontal: 10,
        color: Colors.BLACK,
        fontSize: 18,
        borderRightWidth: 1,
    },

    simpleMonthTxt2: {
        fontFamily: 'Playball-Regular',
        paddingHorizontal: 10,
        color: Colors.BLACK,
        fontSize: 18,
        borderRightWidth: 1,
    },

    simpleYearTxt2: {
        fontFamily: 'Playball-Regular',
        paddingHorizontal: 10,
        color: Colors.BLACK,
        fontSize: 18,
    },

    simpleDayTxt: {
        color: Colors.BLACK,
        fontSize: 24,
        fontFamily: 'OoohBaby-Regular',
        marginTop: -10,
    },
})
