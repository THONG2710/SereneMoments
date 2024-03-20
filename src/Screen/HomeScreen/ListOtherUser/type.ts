import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";

export type OtherUserNavigationProps = NativeStackNavigationProp<HomeParamlist, 'OtherUsers'>;

export type OtherUserRouteProps = RouteProp<HomeParamlist, 'OtherUsers'>;

export type OtherUserProps = {
    navigation: OtherUserNavigationProps,
    route: OtherUserRouteProps,
}