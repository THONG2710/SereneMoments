import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { RouteProp } from "@react-navigation/native";

export type ListDiaryNavigationProps = NativeStackNavigationProp<HomeParamlist, 'ListDiariesScreen'>;

export type ListDiaryRouteProps = RouteProp<HomeParamlist, 'ListDiariesScreen'>;

export type ListDiarieProps = {
    navigation: ListDiaryNavigationProps,
    route: ListDiaryRouteProps,
}