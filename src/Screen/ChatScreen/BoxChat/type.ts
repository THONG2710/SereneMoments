import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ChatParamlist } from "../../../StoryBoard/ChatStoryboard";

export type BoxChatScreenNavigationProps = NativeStackNavigationProp<ChatParamlist, 'BoxChatScreen'>;

export type BoxChatScreenRouteProps = RouteProp<ChatParamlist, 'BoxChatScreen'>;

export type BoxChatScreenProps = {
    navigation: BoxChatScreenNavigationProps,
    route: BoxChatScreenRouteProps,
}