import React, { useState } from 'react';
import { StyleSheet, Alert, View, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { uid } from './common';

import Header from './components/Header/Header';
import TodoItem from './components/TodoItem/TodoItem';
import TodoForm from './components/Form/Form';

const App = () => {

  const [todos, setTodos] = useState([
    { text: 'Play FIFA20', id: '1' }
  ]);

  const pressHandler = (id) => {
    setTodos(prevState => {
      return (
        prevState.filter(item => item.id !== id)
      );
    });
  };

  const addTodo = (text) => {
   if (text.length > 3) {
    setTodos(prevState => {
      return [...prevState, { text, id:  uid()}]
    })
   } else {
     Alert.alert('OOPS!', 'Todo must be over 3 characters long', [
       { text: 'Understood', onPress: () => console.log('alert closed') }
     ])
   }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TodoForm addTodo={addTodo} />
          <View style={styles.list}>
            <FlatList
            data={todos}
            renderItem={({ item }) => <TodoItem item={item.text} id={item.id} pressHandler={pressHandler} />}
            keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
