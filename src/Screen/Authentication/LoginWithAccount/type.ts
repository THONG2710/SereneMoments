import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticationParamlist } from "../../../StoryBoard/AuthenticationStoryboard";
import { RouteProp } from "@react-navigation/native";

export type LoginWithAccountNavigationProps = NativeStackNavigationProp<AuthenticationParamlist, 'LoginWithAccount'>;

export type LoginWithAccountRouteProps = RouteProp<AuthenticationParamlist, 'LoginWithAccount'>;

export type LoginWithAccountProps = {
    navigation: LoginWithAccountNavigationProps,
    route: LoginWithAccountRouteProps,
}