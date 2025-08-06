import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodoStore } from '../store/todoStore';

const TodoItem = ({ item, onPress, onDelete, onEdit }) => {
  const { toggleTodoStatus } = useTodoStore();
  const scale = new Animated.Value(1);

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleTodoStatus(item.id);
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', color: '#f44336' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: '#ff9800' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: '#ff9800' };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, color: '#2196f3' };
    } else {
      return { text: date.toLocaleDateString(), color: '#666' };
    }
  };

  const dueDateInfo = formatDueDate(item.dueDate);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
        },
      ]}
    >
        <View style={styles.todoItem}>
          <TouchableOpacity
            style={styles.todoContent}
            onPress={handleToggle}
            activeOpacity={0.7}
          >
            <View style={styles.checkboxContainer}>
              <Ionicons
                name={item.status === 'complete' ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={item.status === 'complete' ? '#4CAF50' : '#666'}
              />
            </View>
            
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  item.status === 'complete' && styles.completedTitle,
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              
              {item.description && (
                <Text
                  style={[
                    styles.description,
                    item.status === 'complete' && styles.completedDescription,
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              )}
              
              {dueDateInfo && (
                <View style={styles.dueDateContainer}>
                  <Ionicons name="calendar-outline" size={12} color={dueDateInfo.color} />
                  <Text style={[styles.dueDateText, { color: dueDateInfo.color }]}>
                    {dueDateInfo.text}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(item)}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={18} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  todoItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  completedDescription: {
    color: '#aaa',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default TodoItem; 