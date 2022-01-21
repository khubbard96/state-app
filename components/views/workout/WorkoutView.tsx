import React, { useEffect, useState } from "react";
import {
    Text,
    Input,
    Link,
    HStack,
    Center,
    KeyboardAvoidingView,
    Heading,
    Switch,
    useColorMode,
    NativeBaseProvider,
    extendTheme,
    VStack,
    Code,
    Button,
    Select,
    CheckIcon,
    Container,
    Box,
    Flex,
    Column,
    Pressable,
    useDisclose,
    Row
} from "native-base";
import { useWorkout, Workout, Exercise, ExerciseSet, useWorkouts } from "../../../store/useWorkouts";
import { v4 as uuidv4 } from 'uuid';
import ChooseWorkoutTypeModal from "./ChooseWorkoutTypeModal";
import WorkoutTypes from "../../../resources/WorkoutTypes.json";
import { useNavigation } from "@react-navigation/native";

type ExerciseSetRowProps = {
    exercise: Exercise
    set: ExerciseSet
}

const ExerciseSetRow: React.FC<ExerciseSetRowProps> = ({ exercise, set }) => {
    const workout: Workout | null = useWorkouts().getWorkout(useWorkout().workoutId);
    const updateWorkout = useWorkouts().updateWorkout;

    //const updateExercise = useWorkout(state => state.updateExercise);

    const updateSetData = (propName: "currReps" | "currWeight", value: number): Workout => {

        if (workout) {
            let _workout = Object.assign({}, workout);

            _workout = {
                ...workout,
                exercises: {
                    ...workout.exercises,
                    [exercise.id]: {
                        ...workout.exercises[exercise.id],
                        setData: {
                            ...workout.exercises[exercise.id].setData,
                            [set.id]: {
                                ...set,
                                [propName]: value
                            }
                        }
                    }
                }
            }
            return _workout;
        }
        return {} as Workout;

    }

    const changeCurrReps = (event: any) => {
        let val: number = parseInt(event.nativeEvent.text);
        updateWorkout(updateSetData("currReps", val));
    }

    const changeCurrWeight = (event: any) => {
        let val: number = parseInt(event.nativeEvent.text);
        updateWorkout(updateSetData("currWeight", val));
    }

    const changeIsDone = (event: any) => {

        let newData = {
            isDone: !set.isDone,
            currWeight: !set.currWeight ? (set.prevWeight || 0) : set.currWeight,
            currReps: !set.currReps ? (set.prevReps || 0) : set.currReps,
        }
        /*exercise.setData = {
            ...exercise.setData,
            [set.id]: {
                ...set,
                ...newData
            }
        }*/
        let _workout = Object.assign({}, workout);

        if (workout) {
            _workout = {
                ...workout,
                exercises: {
                    ...workout.exercises,
                    [exercise.id]: {
                        ...workout.exercises[exercise.id],
                        setData: {
                            ...workout.exercises[exercise.id].setData,
                            [set.id]: {
                                ...set,
                                ...newData
                            }
                        }
                    }
                }
            }
            updateWorkout(_workout);
        }

    }

    const numberToText = (val: number) => {
        if (val === 0) {
            return "0";
        } else if (!val) {
            return "";
        } else {
            return val + "";
        }
    }

    return (
        <HStack alignItems="center">
            <Text w={{ base: "15%" }}>{set.prevReps || "0"} x {set.prevWeight || "0"}</Text>
            <Input w={{ base: "15%" }} placeholder={numberToText(set.prevReps) || "0"} keyboardType="number-pad" flexGrow={1} onChange={changeCurrReps} value={numberToText(set.currReps)} />
            <Input w={{ base: "60%" }} placeholder={numberToText(set.prevWeight) || "0"} keyboardType="number-pad" flexGrow={1} onChange={changeCurrWeight} value={numberToText(set.currWeight)} />
            <Button w={{ base: "10%" }} variant={set.isDone ? "solid" : "outline"} onPress={changeIsDone}>c</Button>
        </HStack>

    );
}


type ExerciseContainerProps = {
    exercise: Exercise
}

const ExerciseContainer: React.FC<ExerciseContainerProps> = ({ exercise }) => {
    const workout: Workout | null = useWorkouts().getWorkout(useWorkout().workoutId);
    const updateWorkout = useWorkouts().updateWorkout;
    //const updateExercise = useWorkout(state => state.updateExercise);
    const { isOpen, onOpen, onClose } = useDisclose();

    const addSet = () => {
        let id: string = uuidv4();
        /*exercise.setData = {
            ...exercise.setData,
            [id]: {
                id: id
            } as ExerciseSet
        }
        updateExercise(exercise);*/
        if (workout) {
            let _workout: Workout = Object.assign({}, workout);
            _workout = {
                ...workout,
                exercises: {
                    ...workout.exercises,
                    [exercise.id]: {
                        ...workout.exercises[exercise.id],
                        setData: {
                            ...workout.exercises[exercise.id].setData,
                            [id]: {
                                id: id
                            } as ExerciseSet
                        }
                    }
                }
            }
            updateWorkout(_workout);
        }

    }

    //@ts-ignore
    const updateExerciseType = (type: string) => {
        let _exercise = Object.assign({}, exercise);
        //change type
        /* _exercise = {
             ...exercise,
             type: WorkoutTypes[type]
         }
 
         //reset set data
         const setId = uuidv4();
         _exercise = {
             ..._exercise,
             setData: {
                 [setId]: {
                     id: setId,
                 } as ExerciseSet
             }
         }*/

        if (workout) {
            let _workout: Workout = Object.assign({}, workout);
            _workout = {
                ...workout,
                exercises: {
                    ...workout.exercises,
                    [exercise.id]: {
                        ...workout.exercises[exercise.id],
                        type: WorkoutTypes[type]
                    }
                }
            }
            updateWorkout(_workout);
        }


    }

    return (
        <Column flexGrow="1" space={0} justifyContent="center" alignItems="center">
            <Pressable onPress={onOpen}>
                <Text>{exercise.type}</Text>
            </Pressable>
            {
                Object.entries(exercise.setData).map((el: [string, ExerciseSet], idx: number) => {
                    return <ExerciseSetRow exercise={exercise} set={el[1]} key={el[0]}></ExerciseSetRow>
                })
            }
            <Button onPress={addSet}>Add set</Button>
            <ChooseWorkoutTypeModal isOpen={isOpen} onClose={onClose} chooseWorkout={(type) => { updateExerciseType(type) }}></ChooseWorkoutTypeModal>
        </Column>
    )
}

type WorkoutSummaryType = {
    time: number,
    sets: number,
    weight: number
}

const WorkoutSummaryComponent: React.FC = () => {
    const workout: Workout | null = useWorkouts().getWorkout(useWorkout().workoutId);
    const [workoutSummary, setWorkoutSummary] = useState({} as WorkoutSummaryType);

    useEffect(() => {
        let time: number = 0;
        let sets: number = 0;
        let weight: number = 0;

        if (workout) {
            Object.entries(workout.exercises || {}).forEach((ex: [string, Exercise], idx: number) => {
                Object.entries(ex[1].setData).forEach((set: [string, ExerciseSet], idx: number) => {
                    let _w: number = set[1].isDone ? (parseInt(set[1].currWeight + "") || 0) * (parseInt(set[1].currReps + "") || 0) : 0;
                    sets += (set[1].isDone ? 1 : 0);
                    weight += _w;
                });

            });
            setWorkoutSummary({ time, sets, weight });
        }


    }, [workout]);

    return (
        <HStack space="2xl">
            <Column>
                <Center>
                    <Text>Time</Text>
                    <Text>00:00</Text>
                </Center>
            </Column>
            <Column>
                <Center>
                    <Text>Sets</Text>
                    <Text>{workoutSummary.sets}</Text>
                </Center>
            </Column>
            <Column>
                <Center>
                    <Text>Weight</Text>
                    <Text>{workoutSummary.weight} lbs</Text>
                </Center>
            </Column>
        </HStack>
    )
}

const WorkoutView: React.FC = () => {

    const navigation = useNavigation();

    const workout: Workout | null = useWorkouts().getWorkout(useWorkout().workoutId);

    console.log(workout);
    //const addExercise = useWorkout().addExercise;
    const updateWorkout = useWorkouts().updateWorkout;
    const setWorkout = useWorkout().setWorkout;
    const { isOpen, onOpen, onClose } = useDisclose();
    const clickAddExercise = () => {
        onOpen();
    }

    const selectNewExerciseType = (type: string) => {
        let exId = uuidv4();
        let setId = uuidv4();
        if (workout) {
            let newWorkout: Workout = Object.assign({}, workout);
            newWorkout = {
                ...workout,
                exercises: {
                    ...workout.exercises,
                    [exId]: {
                        id: exId,
                        type: WorkoutTypes[type],
                        setData: {
                            [setId]: {
                                id: setId,
                            } as ExerciseSet
                        }
                    } as Exercise
                }
            }
            updateWorkout(newWorkout);
        }
        onClose();
    }
    
    const pressEndWorkout = () => {
        if (workout) {
            let newWorkout: Workout = Object.assign({}, workout);
            newWorkout = {
                ...workout,
                isInProgress: false
            }
            updateWorkout(newWorkout);
            setWorkout("");
        }
        navigation.goBack();
    }

    return (
        <Column flexGrow={1} alignItems="center">
            <Text>{workout?.name || "untitled workout"}</Text>
            <WorkoutSummaryComponent></WorkoutSummaryComponent>
            {
                Object.entries(workout?.exercises || {}).map((el: [string, Exercise], idx: number) => {
                    return <ExerciseContainer exercise={el[1]} key={el[0]}></ExerciseContainer>
                })
            }
            <Row space={3}>
            <Button onPress={clickAddExercise}>
                <Text>Add exercise</Text>
            </Button>
            <Button colorScheme="danger" onPress={pressEndWorkout}>
                <Text>End workout</Text>
            </Button>
            </Row>

            <ChooseWorkoutTypeModal isOpen={isOpen} onClose={onClose} chooseWorkout={(type) => { selectNewExerciseType(type) }}></ChooseWorkoutTypeModal>
        </Column>
    );
}


export default WorkoutView;