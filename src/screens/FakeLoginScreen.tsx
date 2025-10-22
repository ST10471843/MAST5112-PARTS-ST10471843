// Fake Login Screen - Role selection for Chef or Client
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

type FakeLoginScreenProps = {
  onLogin: (role: 'chef' | 'client') => void;
};

export function FakeLoginScreen({ onLogin }: FakeLoginScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.icon}>👨‍🍳</Text>
          <Text style={styles.title}>Christoffel</Text>
          <Text style={styles.subtitle}>Private Chef Menu</Text>
        </View>

        {/* Role Selection Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.chefButton}
            onPress={() => onLogin('chef')}
            activeOpacity={0.8}
          >
            <Text style={styles.chefButtonText}>Chef</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clientButton}
            onPress={() => onLogin('client')}
            activeOpacity={0.8}
          >
            <Text style={styles.clientButtonText}>Client</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.helpText}>Select your role to continue</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDF8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: 'rgba(152, 137, 50, 0.78)',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  chefButton: {
    backgroundColor: 'rgba(152, 137, 50, 0.78)',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chefButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  clientButton: {
    backgroundColor: 'rgba(152, 137, 50, 0.19)',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(152, 137, 50, 0.3)',
  },
  clientButtonText: {
    color: 'rgba(152, 137, 50, 0.78)',
    fontSize: 18,
    fontWeight: '700',
  },
  helpText: {
    marginTop: 24,
    fontSize: 14,
    color: '#666666',
  },
});
