/*
Simple component to demonstrate how to pass and render children
in a component.
*/
import { Text, View } from 'react-native';

export default function SimpleComponent({ children }) {
    return (
        <View>
            <Text>Simple Component</Text>
            {children}
        </View>
    );
}