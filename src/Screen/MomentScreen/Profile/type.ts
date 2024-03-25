import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { MomentParamlist } from "../../../StoryBoard/MomentStoryboard";

export type ProfileNavigationProps = NativeStackNavigationProp<MomentParamlist, 'Profile'>;

export type ProfileRouterProps = RouteProp<MomentParamlist, 'Profile'>;

export type ProfileProps = {
    navigation: ProfileNavigationProps,
    route: ProfileRouterProps,
}