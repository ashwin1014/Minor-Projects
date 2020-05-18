import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './TodoItem.style';

const TodoItem = ({ item, id, pressHandler }) => {
    return (
        <TouchableOpacity onPress={() => pressHandler(id)}>
         <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
            <MaterialIcons name='delete' size={18} color='#333' />
         </View>
        </TouchableOpacity>
    );
};

export default TodoItem;