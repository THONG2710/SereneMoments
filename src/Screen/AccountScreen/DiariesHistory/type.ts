import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type DiariesHistorNavigationProps = NativeStackNavigationProp<AccountParamlist, 'DiariesHistory'>;

export type DiariesHistoryRouterProps = RouteProp<AccountParamlist, 'DiariesHistory'>;

export type DiariesHistorProps = {
    navigation: DiariesHistorNavigationProps,
    route: DiariesHistoryRouterProps,
}