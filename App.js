import React, {useState} from 'react'
import { Alert, StyleSheet, View, } from 'react-native'
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';


export default function App() {
  const[todoId, setTodoId] = useState(null)
  const[todos, setTodos] = useState([])

  const addTodo = (title) => {
  //   const newTodo = {
  //     id: Date.now().toString(),
  //     title
  //   }

  //   setTodos((prevTodos) => {
  //     return [
  //       ...prevTodos,
  //       newTodo
  //     ]
  //   })

    setTodos(prev => [
      ...prev,
      {
      id: Date.now().toString(),
      title
    }
  ])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ]
    );
  }

  const updateTodo = (id , title) => {
    setTodos(old => old.map(todo => {
      if(todo.id === id){
        todo.title = title
      }
      return todo
    }))
  }
  let content = <MainScreen addTodo={addTodo} todos={todos} removeTodo={removeTodo} openTodo={setTodoId
  }/>

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View style={styles.wrapper}>
      <Navbar title="TodoApp" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '93%'
  },
});
