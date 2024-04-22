import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type TodoListHistoryNavigationProps = NativeStackNavigationProp<AccountParamlist, 'TodoList'>;

export type TodoListHistoryRouterProps = RouteProp<AccountParamlist, 'TodoList'>;

export type TodoListHistoryProps = {
    navigation: TodoListHistoryNavigationProps,
    route: TodoListHistoryRouterProps,
}