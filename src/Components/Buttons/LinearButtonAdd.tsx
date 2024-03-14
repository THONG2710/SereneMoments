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

interface LinearButtonAddProps extends ViewProps {
    label: string;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const LinearButtonAdd: React.FC<LinearButtonAddProps> = props => {
    const { label, style, onPress } = props;
    
    return (
        <LinearGradient style={styles.add} colors={['#53C3F3', '#60C8E9', '#97D4EB']}>
            <Pressable onPress={onPress}>
                <Text style={style}>{label}</Text>
            </Pressable>
        </LinearGradient>
    );
};

export default LinearButtonAdd;

const styles = StyleSheet.create({
    add:
    {
        borderRadius:10,
    }
});
