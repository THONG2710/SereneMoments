import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";

export type MomentHistorNavigationProps = NativeStackNavigationProp<AccountParamlist, 'MomentHistor'>;

export type MomentHistorRouterProps = RouteProp<AccountParamlist, 'MomentHistor'>;

export type MomentHistorProps = {
    navigation: MomentHistorNavigationProps,
    route: MomentHistorRouterProps,
}