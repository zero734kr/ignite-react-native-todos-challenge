import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface HandleEditTaskProps {
  taskId: Task['id']; // Task['id'] is a number
  taskNewTitle: Task['title']; // Task['title'] is a string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data: Task = {
      id: Date.now(),
      title: newTaskTitle,
      done: false
    };

    const sameTask = tasks.find(task => task.title === newTaskTitle);

    if (sameTask) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }


    setTasks(originalTasks => [...originalTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      const clonedTask = { ...task };

      if (clonedTask.id !== id) return clonedTask;

      clonedTask.done = !clonedTask.done;

      return clonedTask;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const onPress = () => setTasks(tasks.filter(task => task.id !== id));

    //TODO - remove task from state
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          onPress
        }
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: HandleEditTaskProps) {
    const foundTask = tasks.find(task => task.id === taskId);
    if (!foundTask) return;

    const targetTask: Task = { ...foundTask };

    targetTask.title = taskNewTitle;

    setTasks(originalTasks => originalTasks.map(f => f.id === taskId ? targetTask : f));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})