import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type TodoListHistoryNavigationProps = NativeStackNavigationProp<AccountParamlist, 'TodoListHistory'>;

export type TodoListHistoryRouterProps = RouteProp<AccountParamlist, 'TodoListHistory'>;

export type TodoListHistoryProps = {
    navigation: TodoListHistoryNavigationProps,
    route: TodoListHistoryRouterProps,
}