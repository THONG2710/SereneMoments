import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";

export type FindUserNavigationProps = NativeStackNavigationProp<HomeParamlist, 'findUser'>;

export type FindUserRouteProps = RouteProp<HomeParamlist, 'findUser'>;

export type FindUserProps = {
    navigation: FindUserNavigationProps,
    route: FindUserRouteProps,
}