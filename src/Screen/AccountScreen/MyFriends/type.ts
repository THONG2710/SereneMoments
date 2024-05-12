import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";

export type MyFriendsNavigationProps = NativeStackNavigationProp<AccountParamlist, 'MyFriends'>;

export type MyFriendsRouteProps = RouteProp<AccountParamlist, 'MyFriends'>;

export type MyFriendsProps = {
    navigation: MyFriendsNavigationProps,
    route: MyFriendsRouteProps,
}