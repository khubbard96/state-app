import { Column, IIconButtonProps } from "native-base";
import React, { ReactNode, useEffect } from "react";
import {
    Button,
    Actionsheet,
    useDisclose,
    Text,
    Box,
    Center,
    NativeBaseProvider,
} from "native-base"
import {Keyboard} from "react-native";

export type AppBladeModalProps = {
    isOpen: boolean
    onClose: () => any
}
const AppBladeModal: React.FC<AppBladeModalProps> = ({ children, isOpen, onClose }) => {

    useEffect(()=>{
        if(isOpen) {
            Keyboard.dismiss();
        }
    },[isOpen])

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                {children}
            </Actionsheet.Content>
        </Actionsheet>
    )
}

type BladeActionProps = {
    children: ReactNode
    callback: <T>(data: T) => void
    isButton?: boolean
    doClose?: boolean
}


export default AppBladeModal;