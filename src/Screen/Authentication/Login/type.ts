import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticationParamlist } from "../../../StoryBoard/AuthenticationStoryboard";
import { RouteProp } from "@react-navigation/native";

export type LoginNaviagtionProps = NativeStackNavigationProp<AuthenticationParamlist, 'LoginScreen'>;

export type LoginRouteProps = RouteProp<AuthenticationParamlist, 'LoginScreen'>;

export type LoginProps = {
    navigation: LoginNaviagtionProps,
    route: LoginRouteProps,
}