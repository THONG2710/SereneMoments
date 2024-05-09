import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";

export type ListFriendsNavigationProps = NativeStackNavigationProp<HomeParamlist, 'ListFriends'>;

export type ListFriendsRouteProps = RouteProp<HomeParamlist, 'ListFriends'>;

export type ListFriendsProps = {
    navigation: ListFriendsNavigationProps,
    route: ListFriendsRouteProps,
}