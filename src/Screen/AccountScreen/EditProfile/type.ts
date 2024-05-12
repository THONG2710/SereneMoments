import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type EditProfileNavigationProps = NativeStackNavigationProp<AccountParamlist, 'EditProfile'>;

export type EditProfileRouterProps = RouteProp<AccountParamlist, 'EditProfile'>;

export type EditProfileProps = {
    navigation: EditProfileNavigationProps,
    route: EditProfileRouterProps,
}