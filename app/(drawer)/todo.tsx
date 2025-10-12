import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTodo } from '../../hooks/useTodo';

export default function TodoScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodo();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id: string, text: string) => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${text}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteTodo(id) },
      ]
    );
  };

  const handleClearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount > 0) {
      Alert.alert(
        'Clear Completed',
        `Clear ${completedCount} completed ${completedCount === 1 ? 'item' : 'items'}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', onPress: clearCompleted },
        ]
      );
    }
  };

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={[styles.todoItem, item.completed && styles.completedItem]}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkedBox]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
      </TouchableOpacity>
      
      <Text style={[styles.todoText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTodo(item.id, item.text)}
      >
        <Ionicons name="trash-outline" size={18} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Todo List</Text>

      {/* Add Todo Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {activeCount} active, {completedCount} completed
        </Text>
        {completedCount > 0 && (
          <TouchableOpacity onPress={handleClearCompleted}>
            <Text style={styles.clearText}>Clear Completed</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Todo List */}
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add something to do!
          </Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A1931',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#0A1931',
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  statsText: {
    color: '#666',
    fontSize: 14,
  },
  clearText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  completedItem: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0A1931',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#0A1931',
    borderColor: '#0A1931',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 50,
    fontStyle: 'italic',
  },
});