import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';

import styles from './Form.style';

const Form = ({ addTodo }) => {
    const [text, setText] = useState('');

    const changeHandler = (value) => {
        setText(value)
    };

    const handleAddTodos = () => {
        addTodo(text);
        setText('')
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='new todo...'
                onChangeText={changeHandler}
                value={text}
            />
            <Button onPress={handleAddTodos} disabled={text === ''} title='add todo' color='coral' />
        </View>
    );
}

export default Form
