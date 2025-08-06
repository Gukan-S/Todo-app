import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  RefreshControl,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodoStore } from '../store/todoStore';
import { useAuthStore } from '../store/authStore';
import TodoItem from '../components/TodoItem';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';

const HomeScreen = ({ navigation }) => {
  const { 
    todos, 
    isLoading, 
    error, 
    loadTodos, 
    deleteTodo, 
    getFilteredTodos,
    clearError 
  } = useTodoStore();
  
  const { user, logout } = useAuthStore();
  const fabScale = new Animated.Value(1);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const onRefresh = useCallback(() => {
    loadTodos();
  }, [loadTodos]);

  const handleDeleteTodo = (id) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTodo(id),
        },
      ]
    );
  };

  const handleEditTodo = (todo) => {
    navigation.navigate('AddTodo', { todo, isEditing: true });
  };

  const handleFabPress = () => {
    Animated.sequence([
      Animated.timing(fabScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fabScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate('AddTodo');
  };

  const renderTodo = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: 1,
        transform: [{ translateY: 0 }],
      }}
    >
      <TodoItem
        item={item}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      />
    </Animated.View>
  );

  const filteredTodos = getFilteredTodos();
  
  // Memoize the filtered todos to prevent unnecessary re-renders
  const memoizedFilteredTodos = useMemo(() => filteredTodos, [filteredTodos]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with user info and profile picture */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userName}>{user?.name || 'Your Name'}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Settings')}>
          <View style={styles.profileImage}>
            {user?.avatar ? (
              <Text style={styles.avatarText}>
                {user.name?.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <Ionicons name="person" size={24} color="#fff" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <SearchBar />
      <FilterTabs />

      {/* Todo List */}
      <FlatList
        data={memoizedFilteredTodos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={['#6200ee']}
            tintColor="#6200ee"
          />
        }
                 ListEmptyComponent={
           <View style={styles.emptyContainer}>
             <View style={styles.emptyIllustration}>
               <Ionicons 
                 name={memoizedFilteredTodos.length === 0 && todos.length > 0 ? "search" : "checkmark-circle"} 
                 size={80} 
                 color="#ddd" 
               />
             </View>
             <Text style={styles.emptyText}>
               {memoizedFilteredTodos.length === 0 && todos.length > 0 
                 ? 'No tasks found' 
                 : 'No tasks yet'}
             </Text>
             <Text style={styles.emptySubtext}>
               {memoizedFilteredTodos.length === 0 && todos.length > 0 
                 ? 'Try adjusting your search or filters' 
                 : 'Tap the + button to create your first task'}
             </Text>
             {memoizedFilteredTodos.length === 0 && todos.length === 0 && (
               <View style={styles.emptyActions}>
                 <TouchableOpacity
                   style={styles.emptyActionButton}
                   onPress={handleFabPress}
                 >
                   <Ionicons name="add" size={20} color="#6200ee" />
                   <Text style={styles.emptyActionText}>Create Task</Text>
                 </TouchableOpacity>
               </View>
             )}
           </View>
         }
      />

      {/* Floating Action Button */}
      <Animated.View style={[styles.fab, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={handleFabPress}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  emptyIllustration: {
    marginBottom: 16,
  },
  emptyActions: {
    marginTop: 24,
  },
  emptyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6200ee',
    marginLeft: 8,
  },
});

export default HomeScreen; 