import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";
import { UsersParamlist } from "../../../../StoryBoard/UserStoryBoard";

export type ListOtherUsersNavigationProps = NativeStackNavigationProp<UsersParamlist, 'ListOtherUsers'>;

export type ListOtherUsersRouteProps = RouteProp<UsersParamlist, 'ListOtherUsers'>;

export type ListOtherUsersProps = {
    navigation: ListOtherUsersNavigationProps,
    route: ListOtherUsersRouteProps,
}