import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatParamlist } from "../../../StoryBoard/ChatStoryboard";
import { RouteProp } from "@react-navigation/native";

export type ChatScreenNavigationProps = NativeStackNavigationProp<ChatParamlist, 'Chat'>;

export type ChatScreenRouteProps = RouteProp<ChatParamlist, 'Chat'>;

export type ChatScreenProps = {
    navigation: ChatScreenNavigationProps,
    route: ChatScreenRouteProps
}