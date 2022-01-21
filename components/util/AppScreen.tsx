import React from "react";
import {
    Container,
    Column,
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AppScreen: React.FC = ({ children }) => {

    return (
        <Column h={{ base: "100%" }}>
            <KeyboardAwareScrollView viewIsInsideTabBar extraHeight={250} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false}>
                <Column flex="1" alignItems="center">
                    <Container flexGrow="1">
                        {children}
                    </Container>
                </Column>
            </KeyboardAwareScrollView >
        </Column>

    )
}

export default AppScreen;