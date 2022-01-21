import React from "react";
import WorkoutContainer from "../views/workout/WorkoutView";
import AppScreen from "../util/AppScreen";
import { Container, Text } from "native-base";
import HomeView from "../views/home/HomeView";

export const HomeScreen: React.FC = () => {

    return (
        <AppScreen>
            <HomeView></HomeView>
        </AppScreen>
    );
}
