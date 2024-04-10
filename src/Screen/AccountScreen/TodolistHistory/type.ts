import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type TodolistHistoryNavigationProps = NativeStackNavigationProp<AccountParamlist, 'TodoList'>;

export type TodolistHistoryRouterProps = RouteProp<AccountParamlist, 'TodoList'>;

export type TodolistHistoryProps = {
    navigation: TodolistHistoryNavigationProps,
    route: TodolistHistoryRouterProps,
}