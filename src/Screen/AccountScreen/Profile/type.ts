import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type ProfileNavigationProps = NativeStackNavigationProp<AccountParamlist, 'profileScreen'>;

export type ProfileRouterProps = RouteProp<AccountParamlist, 'profileScreen'>;

export type ProfileProps = {
    navigation: ProfileNavigationProps,
    route: ProfileRouterProps,
}