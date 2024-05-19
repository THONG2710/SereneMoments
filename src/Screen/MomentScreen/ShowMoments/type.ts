import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountParamlist } from "../../../StoryBoard/AccountStoryboard";
import { RouteProp } from "@react-navigation/native";
import { HomeParamlist } from "../../../StoryBoard/HomeStoryboard";
import { MomentParamlist } from "../../../StoryBoard/MomentStoryboard";
import { ViewProps } from "react-native";
import { MomentModel } from "../../../Models/Model";

export type ShowMomentNavigationProps = NativeStackNavigationProp<MomentParamlist, 'ShowMoments'>;

export type ShowMomentRouterProps = RouteProp<MomentParamlist, 'ShowMoments'>;

export type ShowMomentProps = {
    navigation: ShowMomentNavigationProps,
    route: ShowMomentRouterProps,
}