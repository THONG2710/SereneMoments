import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { AuthorizedParamlist } from "../../StoryBoard/AuthorizedStoryboard";

export type MomentScreenNavigationProps = NativeStackNavigationProp<AuthorizedParamlist, 'MomentScreen'>;

export type MomentScreenRouteProps = RouteProp<AuthorizedParamlist, 'MomentScreen'>;

export type MomentScreenProps = {
    navigation: MomentScreenNavigationProps,
    route: MomentScreenRouteProps,
}