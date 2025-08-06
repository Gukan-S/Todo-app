import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodoStore } from '../store/todoStore';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodoScreen = ({ navigation, route }) => {
  const { addTodo, updateTodo } = useTodoStore();
  const { todo, isEditing } = route?.params || {};
  
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [dueDateTime, setDueDateTime] = useState(todo?.dueDate ? new Date(todo.dueDate) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTodo = async () => {
    if (title.trim().length === 0) {
      Alert.alert('Error', 'Please enter a title for your todo');
      return;
    }

    try {
      if (isEditing && todo) {
        await updateTodo(todo.id, {
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDateTime ? dueDateTime.toISOString() : null,
        });
      } else {
        await addTodo({
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDateTime ? dueDateTime.toISOString() : null,
        });
      }
      
      setTitle('');
      setDescription('');
      setDueDateTime(null);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'add'} todo. Please try again.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter todo title..."
            placeholderTextColor="#999"
            autoFocus
            maxLength={100}
          />
          <Text style={styles.characterCount}>
            {title.length}/100 characters
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a description (optional)..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>
            {description.length}/500 characters
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Due Date & Time</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#6200ee" />
              <Text style={styles.dateTimeText}>
                {dueDateTime ? dueDateTime.toLocaleDateString() : 'Select Date'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={20} color="#6200ee" />
              <Text style={styles.dateTimeText}>
                {dueDateTime ? dueDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
              </Text>
            </TouchableOpacity>
          </View>
          {dueDateTime && (
            <TouchableOpacity
              style={styles.clearDateTimeButton}
              onPress={() => setDueDateTime(null)}
            >
              <Ionicons name="close-circle" size={16} color="#666" />
              <Text style={styles.clearDateTimeText}>Clear date & time</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={20} color="#666" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

                      <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddTodo}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
              <Text style={styles.addButtonText}>{isEditing ? 'Update Todo' : 'Add Todo'}</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={dueDateTime || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const newDateTime = dueDateTime ? new Date(dueDateTime) : new Date();
              newDateTime.setFullYear(selectedDate.getFullYear());
              newDateTime.setMonth(selectedDate.getMonth());
              newDateTime.setDate(selectedDate.getDate());
              setDueDateTime(newDateTime);
            }
          }}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={dueDateTime || new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              const newDateTime = dueDateTime ? new Date(dueDateTime) : new Date();
              newDateTime.setHours(selectedTime.getHours());
              newDateTime.setMinutes(selectedTime.getMinutes());
              setDueDateTime(newDateTime);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  clearDateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 4,
  },
  clearDateTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: '#6200ee',
  },
  cancelButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AddTodoScreen; 