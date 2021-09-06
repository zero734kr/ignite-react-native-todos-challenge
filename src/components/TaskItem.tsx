import React, { Fragment, useState, useRef, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import type { TasksListProps, Task } from './TasksList';

interface TasktaskProps extends Omit<TasksListProps, 'tasks'> {
  index: number;
  task: Task;
}

export default function TaskItem(
  {
    task,
    index,
    toggleTaskDone,
    removeTask,
    editTask
  }: TasktaskProps
) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleToggleTaskDone(id: number) {
    toggleTaskDone(id);
  }

  function handleRemoveTask(id: number) {
    removeTask(id);
  }

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: title });
    setIsEditing(false);
  }

  function CancelButton() {
    return <TouchableOpacity onPress={handleCancelEditing}>
      <Icon name="x" size={24} color="#b2b2b2" />
    </TouchableOpacity>
  }

  function EditButton() {
    return <TouchableOpacity onPress={handleStartEditing}>
      <Image source={editIcon} />
    </TouchableOpacity>
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing])

  return <Fragment>
    <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => handleToggleTaskDone(task.id)}
      //TODO - use onPress (toggle task) prop
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        //TODO - use style prop 
        >
          {task.done && (
            <Icon
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput
          value={title}
          onChangeText={setTitle}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
          ref={textInputRef}
        //TODO - use style prop
        />
      </TouchableOpacity>
    </View>


    <View style={styles.iconsContainer}>
      {isEditing && <CancelButton />}
      {!isEditing && <EditButton />}

      <View style={[
        styles.divider,
        {
          marginLeft: 12,
          marginRight: 12
        }
      ]} />

      <TouchableOpacity
        disabled={isEditing}
        onPress={() => handleRemoveTask(task.id)}
      //TODO - use onPress (remove task) prop
      >
        <Image
          source={trashIcon}
          style={{ opacity: isEditing ? 0.2 : 1 }}
        />
      </TouchableOpacity>
    </View>
  </Fragment>
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20
  }
});
