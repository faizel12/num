// import { Ionicons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import SimpleEthiopianDatePicker from '../../components/SimpleEthiopianDatePicker';
// import { useTodo } from '../../hooks/useTodo';

// export default function TodoScreen() {
//   const { 
//     todos, 
//     addTodo, 
//     toggleTodo, 
//     deleteTodo, 
//     clearCompleted, 
//     isOverdue, 
//     formatEthiopianDate, 
//     gregorianToEthiopian,
     
//   } = useTodo();
  
//   const [newTodo, setNewTodo] = useState('');
//   const [dueDate, setDueDate] = useState<Date | undefined>();
//   const [showEthiopianDatePicker, setShowEthiopianDatePicker] = useState(false);

//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       addTodo(newTodo, dueDate);
//       setNewTodo('');
//       setDueDate(undefined);
//       Alert.alert('Success', 'Todo added successfully!');
//     } else {
//       Alert.alert('Error', 'Please enter a task description');
//     }
//   };

//   const handleDeleteTodo = (id: string, text: string) => {
//     Alert.alert(
//       'Delete Todo',
//       `Are you sure you want to delete "${text}"?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Delete', onPress: () => deleteTodo(id) },
//       ]
//     );
//   };

//   const handleClearCompleted = () => {
//     const completedCount = todos.filter(todo => todo.completed).length;
//     if (completedCount > 0) {
//       Alert.alert(
//         'Clear Completed',
//         `Clear ${completedCount} completed ${completedCount === 1 ? 'item' : 'items'}?`,
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Clear', onPress: clearCompleted },
//         ]
//       );
//     }
//   };

//   const handleDateSelect = (date: Date) => {
//     console.log('Selected date:', date);
//     setDueDate(date);
//     setShowEthiopianDatePicker(false);
    
//     // Show confirmation with Ethiopian date
//     const ethDate = gregorianToEthiopian(date);
//     Alert.alert(
//       'Date Selected', 
//       `Ethiopian: ${formatEthiopianDate(ethDate)}`
//     );
//   };


//   const renderTodoItem = ({ item }: { item: any }) => {
//     // Simple check if due date is today
//     const isDueToday = item.dueDateEthiopian && 
//                        item.dueDateEthiopian === gregorianToEthiopian(new Date());
  
//     return (
//       <View style={[
//         styles.todoItem, 
//         item.completed && styles.completedItem,
//         isOverdue(item) && !item.completed && styles.overdueItem,
//         isDueToday && !item.completed && styles.dueTodayItem // Add blue border for due today
//       ]}>
//         <TouchableOpacity
//           style={[styles.checkbox, item.completed && styles.checkedBox]}
//           onPress={() => toggleTodo(item.id)}
//         >
//           {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
//         </TouchableOpacity>
        
//         <View style={styles.todoContent}>
//           <Text style={[styles.todoText, item.completed && styles.completedText]}>
//             {item.text}
//           </Text>
          
//           {/* Ethiopian Due Date Display */}
//           {item.dueDateEthiopian && (
//             <View style={[
//               styles.dueDateBadge,
//               isOverdue(item) && !item.completed && styles.overdueBadge,
//               isDueToday && !item.completed && styles.dueTodayBadge // Blue background for due today
//             ]}>
//               <Ionicons 
//                 name="calendar" 
//                 size={12} 
//                 color={
//                   isDueToday && !item.completed ? 'white' :
//                   isOverdue(item) && !item.completed ? 'white' : '#FFD700'
//                 } 
//               />
//               <Text style={[
//                 styles.dueDateText,
//                 (isOverdue(item) || isDueToday) && !item.completed && styles.urgentText
//               ]}>
//                 {formatEthiopianDate(item.dueDateEthiopian)}
//                 {isOverdue(item) && !item.completed && ' (Overdue)'}
//                 {isDueToday && !item.completed && ' (Due Today)'}
//               </Text>
//             </View>
//           )}
//         </View>
        
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleDeleteTodo(item.id, item.text)}
//         >
//           <Ionicons name="trash-outline" size={18} color="#ff4444" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const completedCount = todos.filter(todo => todo.completed).length;
//   const activeCount = todos.length - completedCount;

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Header */}
//       {/* <View style={styles.header}>
//         <Text style={styles.title}>📝 Todo List</Text>
//         <Text style={styles.subtitle}>Manage your tasks with Ethiopian dates</Text>
//       </View> */}

//       {/* Add Todo Section */}
//       <View style={styles.addSection}>
//         <Text style={styles.sectionTitle}>Add New Task</Text>
        
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your task..."
//           placeholderTextColor="#888"
//           value={newTodo}
//           onChangeText={setNewTodo}
//           onSubmitEditing={handleAddTodo}
//           returnKeyType="done"
//         />

//         {/* Date Picker Button */}
//         <TouchableOpacity 
//   style={styles.datePickerButton}
//   onPress={() => setShowEthiopianDatePicker(true)}
// >
//   <Ionicons name="calendar-outline" size={20} color="#FFD700" />
//   <Text style={styles.datePickerText}>
//     {dueDate 
//       ? `📅 ${formatEthiopianDate(gregorianToEthiopian(dueDate))}` 
//       : `📅 Today: ${formatEthiopianDate(gregorianToEthiopian(new Date()))}`
//     }
//   </Text>
// </TouchableOpacity>

//         <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
//           <Ionicons name="add" size={24} color="#0A1931" />
//           <Text style={styles.addButtonText}>Add Task</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Stats Section */}
//       <View style={styles.statsSection}>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{activeCount}</Text>
//           <Text style={styles.statLabel}>Active</Text>
//         </View>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{completedCount}</Text>
//           <Text style={styles.statLabel}>Completed</Text>
//         </View>
//         {completedCount > 0 && (
//           <TouchableOpacity style={styles.clearButton} onPress={handleClearCompleted}>
//             <Text style={styles.clearButtonText}>Clear Completed</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Todo List */}
//       <View style={styles.listSection}>
//         <Text style={styles.sectionTitle}>Your Tasks ({todos.length})</Text>
//         <FlatList
//           data={todos}
//           renderItem={renderTodoItem}
//           keyExtractor={item => item.id}
//           style={styles.list}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyState}>
//               <Ionicons name="checkmark-done-circle-outline" size={64} color="#444" />
//               <Text style={styles.emptyText}>No tasks yet</Text>
//               <Text style={styles.emptySubtext}>Add your first task above!</Text>
//             </View>
//           }
//         />
//       </View>

//       {/* Ethiopian Date Picker Modal */}
//       <SimpleEthiopianDatePicker
//         visible={showEthiopianDatePicker}
//         onClose={() => setShowEthiopianDatePicker(false)}
//         onDateSelect={handleDateSelect}
//       />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A1931', // Dark blue background
//     padding: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 24,
//     marginTop: 16,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFD700', // Gold color
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#CCCCCC',
//     textAlign: 'center',
//   },
//   addSection: {
//     backgroundColor: '#1a2b4d',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: '#2d3e5d',
//     color: 'white',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#3d4e6d',
//   },
//   datePickerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2d3e5d',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#3d4e6d',
//   },
//   datePickerText: {
//     color: '#FFD700',
//     fontSize: 14,
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFD700',
//     padding: 16,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#0A1931',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   statsSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#1a2b4d',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFD700',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#CCCCCC',
//     marginTop: 4,
//   },
//   clearButton: {
//     backgroundColor: '#ff4444',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   clearButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   listSection: {
//     flex: 1,
//     backgroundColor: '#1a2b4d',
//     borderRadius: 12,
//     padding: 16,
//   },
//   list: {
//     flex: 1,
//   },
//   todoItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     backgroundColor: '#2d3e5d',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FFD700',
//   },
//   completedItem: {
//     opacity: 0.6,
//     borderLeftColor: '#4CAF50',
//   },
//   overdueItem: {
//     borderLeftColor: '#ff4444',
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#FFD700',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//     marginTop: 2,
//   },
//   checkedBox: {
//     backgroundColor: '#FFD700',
//     borderColor: '#FFD700',
//   },
//   todoContent: {
//     flex: 1,
//   },
//   todoText: {
//     fontSize: 16,
//     color: 'white',
//     marginBottom: 8,
//   },
//   completedText: {
//     textDecorationLine: 'line-through',
//     color: '#888',
//   },
//   dueDateBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3d4e6d',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//   },
//   overdueBadge: {
//     backgroundColor: '#5d2d3d',
//   },
//   dueDateText: {
//     fontSize: 10,
//     color: '#FFD700',
//     marginLeft: 4,
//     fontWeight: '500',
//   },
//   overdueText: {
//     color: '#ff4444',
//   },
//   deleteButton: {
//     padding: 4,
//     marginLeft: 8,
//   },
//   emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 60,
//   },
//   emptyText: {
//     color: '#CCCCCC',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   emptySubtext: {
//     color: '#888',
//     fontSize: 14,
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   dueTodayItem: {
//     borderLeftWidth: 4,
//     borderLeftColor: '#007AFF',
//     backgroundColor: '#1a3a5d', // Darker blue background
//   },
//   dueTodayBadge: {
//     backgroundColor: '#007AFF', // Blue background
//     borderWidth: 1,
//     borderColor: '#0056b3',
//   },
//   dueTodayText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },

//   urgentText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },


  
// });

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // Add this import
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
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    clearCompleted,
    isOverdue,
    // isDueToday
    // Make sure this uses Gregorian dates
  } = useTodo();
  
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo, dueDate);
      setNewTodo('');
      setDueDate(undefined);
      Alert.alert('Success', 'Todo added successfully!');
    } else {
      Alert.alert('Error', 'Please enter a task description');
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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
      Alert.alert(
        'Date Selected', 
        `Due date: ${formatGregorianDate(selectedDate)}`
      );
    }
  };

  // Format Gregorian date for display
  const formatGregorianDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check if due date is today (Gregorian)
  const isDueToday = (dueDate: Date) => {
    const today = new Date();
    return dueDate.toDateString() === today.toDateString();
  };

  // const dueToday = isDueToday(item);


  const renderTodoItem = ({ item }: { item: any }) => {
    const itemDueDate = item.dueDate ? new Date(item.dueDate) : null;
    const dueToday = itemDueDate && isDueToday(itemDueDate);
  
    return (
      <View style={[
        styles.todoItem, 
        item.completed && styles.completedItem,
        isOverdue(item) && !item.completed && styles.overdueItem,
        dueToday && !item.completed && styles.dueTodayItem
      ]}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkedBox]}
          onPress={() => toggleTodo(item.id)}
        >
          {item.completed && <Ionicons name="checkmark" size={16} color="white" />}
        </TouchableOpacity>
        
        <View style={styles.todoContent}>
          <Text style={[styles.todoText, item.completed && styles.completedText]}>
            {item.text}
          </Text>
          
          {/* Gregorian Due Date Display */}
          {itemDueDate && (
            <View style={[
              styles.dueDateBadge,
              isOverdue(item) && !item.completed && styles.overdueBadge,
              dueToday && !item.completed && styles.dueTodayBadge
            ]}>
              <Ionicons 
                name="calendar" 
                size={12} 
                color={
                  dueToday && !item.completed ? 'white' :
                  isOverdue(item) && !item.completed ? 'white' : '#FFD700'
                } 
              />
              <Text style={[
                styles.dueDateText,
                (isOverdue(item) || dueToday) && !item.completed && styles.urgentText
              ]}>
                {formatGregorianDate(itemDueDate)}
                {isOverdue(item) && !item.completed && ' (Overdue)'}
                {dueToday && !item.completed && ' (Due Today)'}
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTodo(item.id, item.text)}
        >
          <Ionicons name="trash-outline" size={18} color="#ff4444" />
        </TouchableOpacity>
      </View>
    );
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Add Todo Section */}
      <View style={styles.addSection}>
        <Text style={styles.sectionTitle}>Add New Task</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          placeholderTextColor="#888"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />

        {/* Gregorian Date Picker Button */}
        <TouchableOpacity 
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#FFD700" />
          <Text style={styles.datePickerText}>
            {dueDate 
              ? `📅 ${formatGregorianDate(dueDate)}` 
              : `📅 Today: ${formatGregorianDate(new Date())}`
            }
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Ionicons name="add" size={24} color="#0A1931" />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        {completedCount > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCompleted}>
            <Text style={styles.clearButtonText}>Clear Completed</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Todo List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Your Tasks ({todos.length})</Text>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={item => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-done-circle-outline" size={64} color="#444" />
              <Text style={styles.emptyText}>No tasks yet</Text>
              <Text style={styles.emptySubtext}>Add your first task above!</Text>
            </View>
          }
        />
      </View>

      {/* Gregorian Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()} // Optional: prevent selecting past dates
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1931',
    padding: 16,
  },
  addSection: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2d3e5d',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3e5d',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  datePickerText: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#0A1931',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 4,
  },
  clearButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  listSection: {
    flex: 1,
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2d3e5d',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  completedItem: {
    opacity: 0.6,
    borderLeftColor: '#4CAF50',
  },
  overdueItem: {
    borderLeftColor: '#ff4444',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkedBox: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  dueDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d4e6d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  overdueBadge: {
    backgroundColor: '#5d2d3d',
  },
  dueTodayBadge: {
    backgroundColor: '#007AFF',
  },
  dueDateText: {
    fontSize: 10,
    color: '#FFD700',
    marginLeft: 4,
    fontWeight: '500',
  },
  urgentText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#CCCCCC',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  dueTodayItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    backgroundColor: '#1a3a5d',
  },
});