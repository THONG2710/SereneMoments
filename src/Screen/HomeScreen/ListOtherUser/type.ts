import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";

export type ListOtherUsersNavigationProps = NativeStackNavigationProp<HomeParamlist, 'ListOtherUsers'>;

export type ListOtherUsersRouteProps = RouteProp<HomeParamlist, 'ListOtherUsers'>;

export type ListOtherUsersProps = {
    navigation: ListOtherUsersNavigationProps,
    route: ListOtherUsersRouteProps,
}