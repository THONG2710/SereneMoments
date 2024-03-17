import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";

export type ProfileNavigationProps = NativeStackNavigationProp<HomeParamlist, 'Profile'>;

export type ProfileRouterProps = RouteProp<HomeParamlist, 'Profile'>;

export type ProfileProps = {
    navigation: ProfileNavigationProps,
    route: ProfileRouterProps,
}