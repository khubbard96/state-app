import React, { ReactNode } from "react";
import {
    Button,
    VStack,
    Text
} from "native-base";
import AppBladeModal, { AppBladeModalProps } from "../../util/AppBladeModal";
import WorkoutTypes from "../../../resources/WorkoutTypes.json";
import { Pressable } from "react-native";

export type ChooseWorkoutTypeModalActions = {
    chooseWorkout: (type: string) => void;
}

const ChooseWorkoutTypeModal: React.FC<ChooseWorkoutTypeModalActions & AppBladeModalProps> = ({ chooseWorkout, isOpen, onClose }) => {

    const pressButton = (type: string) => {
        chooseWorkout(type);
        onClose();
    }

    return (
        <AppBladeModal isOpen={isOpen} onClose={onClose}>
            <VStack space={10}>
            {
                Object.entries(WorkoutTypes).map((val: [string, string], idx: number) => {
                    return (
                        <Pressable onPress={()=>pressButton(val[0])}>
                            <Text>{val[1]}</Text>
                        </Pressable>
                    )
                })
            }
            </VStack>

        </AppBladeModal>
    )
}

export default ChooseWorkoutTypeModal;