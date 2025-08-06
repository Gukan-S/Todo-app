import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/authStore';

const OnboardingScreen = ({ navigation }) => {
  const { 
    isLoading, 
    error, 
    loginWithGoogle, 
    loginDemo, 
    clearError 
  } = useAuthStore();

  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [error, clearError]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await loginDemo();
    } catch (error) {
      console.error('Demo login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6200ee', '#3700b3']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="checkmark-circle" size={80} color="#fff" />
            <Text style={styles.title}>Todo App</Text>
            <Text style={styles.subtitle}>
              Organize your tasks with style
            </Text>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="list" size={24} color="#fff" />
              <Text style={styles.featureText}>Create and manage tasks</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="calendar" size={24} color="#fff" />
              <Text style={styles.featureText}>Set due dates</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="search" size={24} color="#fff" />
              <Text style={styles.featureText}>Search and filter</Text>
            </View>
          </View>

          {/* Login Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.googleButton]}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
                             {isLoading ? (
                 <ActivityIndicator color="#fff" />
               ) : (
                 <>
                   <View style={styles.googleIconContainer}>
                     <Ionicons name="logo-google" size={20} color="#fff" />
                   </View>
                   <Text style={styles.buttonText}>Continue with Google</Text>
                 </>
               )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.demoButton]}
              onPress={handleDemoLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#6200ee" />
              ) : (
                <>
                  <Ionicons name="play" size={20} color="#6200ee" />
                  <Text style={[styles.buttonText, styles.demoButtonText]}>
                    Try Demo Mode
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Demo mode allows you to try the app without signing in
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 8,
    textAlign: 'center',
  },
  features: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 16,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  googleButton: {
    backgroundColor: '#4285f4',
  },
  demoButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#6200ee',
  },
  disclaimer: {
    fontSize: 12,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default OnboardingScreen; 