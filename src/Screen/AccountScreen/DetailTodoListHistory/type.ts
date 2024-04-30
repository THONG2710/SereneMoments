import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type DetailTodoListHistoryNavigationProps = NativeStackNavigationProp<AccountParamlist, 'DetailTodoListHistory'>;

export type DetailTodoListHistoryRouterProps = RouteProp<AccountParamlist, 'DetailTodoListHistory'>;

export type DetailTodoListHistoryProps = {
    navigation: DetailTodoListHistoryNavigationProps,
    route: DetailTodoListHistoryRouterProps,
}