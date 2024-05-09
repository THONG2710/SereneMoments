import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";

export type NotificationNavigationProps = NativeStackNavigationProp<HomeParamlist, 'Notification'>;

export type NotificationRouteProps = RouteProp<HomeParamlist, 'Notification'>;

export type NotificationProps = {
    navigation: NotificationNavigationProps,
    route: NotificationRouteProps,
}