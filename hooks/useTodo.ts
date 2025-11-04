// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';

// const TODO_STORAGE_KEY = 'todo_items';

// export interface TodoItem {
//   id: string;
//   text: string;
//   completed: boolean;
//   createdAt: string;
//   dueDate?: string;
//   dueDateEthiopian?: string;
//   priority: 'low' | 'medium' | 'high';
// }

// // Manual Ethiopian date conversion functions
// export class EthiopianDateConverter {
//   // Convert Gregorian to Ethiopian date
//   static  gregorianToEthiopian = (date: Date): string => {
//     try {
//       // Use the same conversion logic as in the date picker
//       const gregDate = new Date(date);
//       const gregYear = gregDate.getFullYear();
//       const gregMonth = gregDate.getMonth() + 1;
//       const gregDay = gregDate.getDate();
  
//       const ethiopianYear = gregYear - 7;
      
//       let ethiopianMonth, ethiopianDay;
      
//       if (gregMonth < 9 || (gregMonth === 9 && gregDay < 11)) {
//         ethiopianMonth = (gregMonth + 3) % 13 || 13;
//         ethiopianDay = Math.max(1, (gregDay + 20) % 30 || 30);
//       } else {
//         ethiopianMonth = gregMonth - 8;
//         ethiopianDay = Math.max(1, gregDay - 10);
//       }
  
//       // Handle day overflow
//       if (ethiopianDay > 30 && ethiopianMonth !== 13) {
//         ethiopianDay = ethiopianDay - 30;
//         ethiopianMonth++;
//       }
  
//       if (ethiopianMonth === 13 && ethiopianDay > 6) {
//         ethiopianMonth = 1;
//         ethiopianDay = 1;
//       }
  
//       return `${ethiopianYear}-${ethiopianMonth.toString().padStart(2, '0')}-${ethiopianDay.toString().padStart(2, '0')}`;
//     } catch (error) {
//       console.error('Error converting to Ethiopian date:', error);
//       return '2016-01-01';
//     }
//   };

//   // Format Ethiopian date for display
//   static formatEthiopianDate(ethDateString: string): string {
//     try {
//       const [year, month, day] = ethDateString.split('-').map(Number);
//       const monthNames = [
//         'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
//         'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጷጉሜን'
//       ];
      
//       const monthName = monthNames[month - 2] || `Month ${month}`;
//       return `${day} ${monthName} ${year}`;
//     } catch (error) {
//       console.error('Error formatting Ethiopian date:', error);
//       return ethDateString;
//     }
//   }

//   // Check if Ethiopian date is overdue
//   static isOverdue(ethDateString: string): boolean {
//     try {
//       const today = new Date();
//       const todayEthiopian = this.gregorianToEthiopian(today);
//       return ethDateString < todayEthiopian;
//     } catch (error) {
//       return false;
//     }
//   }
// }

// export const useTodo = () => {
//   const [todos, setTodos] = useState<TodoItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadTodos();
//   }, []);

//   const loadTodos = async () => {
//     try {
//       const storedTodos = await AsyncStorage.getItem(TODO_STORAGE_KEY);
//       if (storedTodos) {
//         setTodos(JSON.parse(storedTodos));
//       }
//     } catch (error) {
//       console.error('Error loading todos:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveTodos = async (newTodos: TodoItem[]) => {
//     try {
//       await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));
//       setTodos(newTodos);
//     } catch (error) {
//       console.error('Error saving todos:', error);
//     }
//   };

//   const addTodo = async (text: string, dueDate?: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
//     const dueDateEthiopian = dueDate ? EthiopianDateConverter.gregorianToEthiopian(dueDate) : undefined;
    
//     const newTodo: TodoItem = {
//       id: Date.now().toString(),
//       text: text.trim(),
//       completed: false,
//       createdAt: new Date().toISOString(),
//       dueDate: dueDate?.toISOString(),
//       dueDateEthiopian,
//       priority,
//     };
//     await saveTodos([...todos, newTodo]);
//   };

//   const toggleTodo = async (id: string) => {
//     const updatedTodos = todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     );
//     await saveTodos(updatedTodos);
//   };

//   const deleteTodo = async (id: string) => {
//     const updatedTodos = todos.filter(todo => todo.id !== id);
//     await saveTodos(updatedTodos);
//   };

//   const clearCompleted = async () => {
//     const updatedTodos = todos.filter(todo => !todo.completed);
//     await saveTodos(updatedTodos);
//   };

//   const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
//     const updatedTodos = todos.map(todo =>
//       todo.id === id ? { ...todo, ...updates } : todo
//     );
//     await saveTodos(updatedTodos);
//   };

//   const isOverdue = (todo: TodoItem): boolean => {
//     if (!todo.dueDateEthiopian || todo.completed) return false;
//     return EthiopianDateConverter.isOverdue(todo.dueDateEthiopian);
//   };

//   return {
//     todos,
//     loading,
//     addTodo,
//     toggleTodo,
//     deleteTodo,
//     clearCompleted,
//     updateTodo,
//     isOverdue,
//     formatEthiopianDate: EthiopianDateConverter.formatEthiopianDate,
//     gregorianToEthiopian: EthiopianDateConverter.gregorianToEthiopian,
    
//   };
// };
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const TODO_STORAGE_KEY = 'todo_items';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string; // This will store ISO string of Gregorian date
  priority: 'low' | 'medium' | 'high';
}

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(TODO_STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTodos = async (newTodos: TodoItem[]) => {
    try {
      await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = async (text: string, dueDate?: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate?.toISOString(), // Store as ISO string
      priority,
    };
    await saveTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await saveTodos(updatedTodos);
  };

  const deleteTodo = async (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    await saveTodos(updatedTodos);
  };

  const clearCompleted = async () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    await saveTodos(updatedTodos);
  };

  const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    await saveTodos(updatedTodos);
  };

  // Check if a todo is overdue using Gregorian dates
  const isOverdue = (todo: TodoItem): boolean => {
    if (!todo.dueDate || todo.completed) return false;
    
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    
    // Reset time parts for accurate date comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };

  // Format Gregorian date for display (optional - you can use this in your screen)
  const formatGregorianDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check if due date is today (Gregorian)
  const isDueToday = (todo: TodoItem): boolean => {
    if (!todo.dueDate || todo.completed) return false;
    
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    
    // Reset time parts for accurate date comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return dueDate.getTime() === today.getTime();
  };

// Add these to your return statement
const getTodosByPriority = (priority: 'low' | 'medium' | 'high') => {
  return todos.filter(todo => todo.priority === priority);
};

const getUpcomingTodos = (days: number = 7) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate >= today && dueDate <= futureDate;
  });
};

const getCompletedCount = () => {
  return todos.filter(todo => todo.completed).length;
};

const getPendingCount = () => {
  return todos.filter(todo => !todo.completed).length;
};

const getOverdueCount = () => {
  return todos.filter(todo => isOverdue(todo)).length;
};

  const getTodoStatistics = () => {
    const total = todos.length;
    const completed = getCompletedCount();
    const pending = getPendingCount();
    const overdue = getOverdueCount();
    
    const priorityStats = {
      high: todos.filter(todo => todo.priority === 'high').length,
      medium: todos.filter(todo => todo.priority === 'medium').length,
      low: todos.filter(todo => todo.priority === 'low').length,
    };
    
    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      priorityStats
    };
  };
  return {
    getTodoStatistics,
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    updateTodo,
    isOverdue,
    isDueToday, // Add this new function
    formatGregorianDate, // Add this for consistency
  };
};