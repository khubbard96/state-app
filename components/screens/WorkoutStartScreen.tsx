import React from "react";
import WorkoutContainer from "../views/workout/WorkoutView";
import AppScreen from "../util/AppScreen";
import ChooseWorkoutTypeModal from "../views/workout/ChooseWorkoutTypeModal";
import WorkoutStartView from "../views/workout-start/WorkoutStartView";
import { NavigationProp } from "@react-navigation/native";

export const WorkoutStartScreen: React.FC<{navigation: NavigationProp}> = ({navigation}) => {
    return (
        <AppScreen>
            <WorkoutStartView></WorkoutStartView>
        </AppScreen>
    );
}
