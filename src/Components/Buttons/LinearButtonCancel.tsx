import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewProps,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface LinearButtonCancelrops {
    label: string;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const LinearButtonCancel: React.FC<LinearButtonCancelrops> = props => {
    const { label, style, onPress } = props;
    
    return (
        <LinearGradient style={styles.cancel} colors={['#808080', '#989898', '#BCBCBC']}>
            <Pressable onPress={onPress}>
                <Text style={style}>{label}</Text>
            </Pressable>
        </LinearGradient>
    );
};

export default LinearButtonCancel;

const styles = StyleSheet.create({
    cancel:
    {
        borderRadius:10,
        marginLeft:5
    }
});
