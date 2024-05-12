import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";
import { UsersParamlist } from "../../../../StoryBoard/UserStoryBoard";

export type SenterRequestNavigationProps = NativeStackNavigationProp<UsersParamlist, 'SentRequests'>;

export type SenterRequestRouteProps = RouteProp<UsersParamlist, 'SentRequests'>;

export type SenterRequestProps = {
    navigation: SenterRequestNavigationProps,
    route: SenterRequestRouteProps,
}