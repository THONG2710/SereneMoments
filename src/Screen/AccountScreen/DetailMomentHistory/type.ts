import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type DetailMomentHistoryNavigationProps = NativeStackNavigationProp<AccountParamlist, 'DetailMomentHistory'>;

export type DetailMomentHistoryRouterProps = RouteProp<AccountParamlist, 'DetailMomentHistory'>;

export type DetailMomentHistoryProps = {
    navigation: DetailMomentHistoryNavigationProps,
    route: DetailMomentHistoryRouterProps,
}