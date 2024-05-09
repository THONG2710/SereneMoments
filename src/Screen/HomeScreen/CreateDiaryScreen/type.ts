import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";

export type CreateDiaryNavigationProps = NativeStackNavigationProp<HomeParamlist, 'CreateDiaryScreen'>;

export type CreateDiaryRouteProps = RouteProp<HomeParamlist, 'CreateDiaryScreen'>;

export type CreateDiaryProps = {
    navigation: CreateDiaryNavigationProps,
    route: CreateDiaryRouteProps,
}