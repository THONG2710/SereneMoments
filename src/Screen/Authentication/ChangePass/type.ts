import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticationParamlist } from "../../../StoryBoard/AuthenticationStoryboard";
import { RouteProp } from "@react-navigation/native";

export type ChangePasswordNaviagtionProps = NativeStackNavigationProp<AuthenticationParamlist, 'ChangePasswordScreen'>;

export type ChangePasswordRouteProps = RouteProp<AuthenticationParamlist, 'ChangePasswordScreen'>;

export type ChangePasswordProps = {
    navigation: ChangePasswordNaviagtionProps,
    route: ChangePasswordRouteProps,
}