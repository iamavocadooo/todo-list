import React, {useState} from "react";
import { View, StyleSheet, TextInput, Button, Alert, Keyboard} from "react-native";
import { THEME } from "../Theme";

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else{
            Alert.alert('Название дела не может быть пустым!')
        }

    }

    return(
        <View style={styles.block}>
            <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value} 
            placeholder="Введите название дела..."
            autoCorrect={false}
            />
            <Button title="Добавить" onPress={pressHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        padding: 3,
        width: '70%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: THEME.MAIN_COLOR,
        
    }
})