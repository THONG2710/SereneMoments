import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticationParamlist } from "../../../StoryBoard/AuthenticationStoryboard";
import { RouteProp } from "@react-navigation/native";

export type RegisterNaviagtionProps = NativeStackNavigationProp<AuthenticationParamlist, 'RegisterScreen'>;

export type RegisterRouteProps = RouteProp<AuthenticationParamlist, 'RegisterScreen'>;

export type RegisterProps = {
    navigation: RegisterNaviagtionProps,
    route: RegisterRouteProps,
}