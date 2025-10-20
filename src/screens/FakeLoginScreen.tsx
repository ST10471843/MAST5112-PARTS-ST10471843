import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

type FakeLoginScreenProps = {
  onLogin: (role: 'chef' | 'customer') => void;
};

export function FakeLoginScreen({ onLogin }: FakeLoginScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.chefIcon}>👨‍🍳</Text>
          <Text style={styles.title}>Christoffel</Text>
          <Text style={styles.subtitle}>Welcomes You!</Text>
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
            style={styles.customerButton}
            onPress={() => onLogin('customer')}
            activeOpacity={0.8}
          >
            <Text style={styles.customerButtonText}>Customer</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 40,
  },
  chefIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#C9A961',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#5C4A3C',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  chefButton: {
    backgroundColor: '#8B9456',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  chefButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  customerButton: {
    backgroundColor: '#F5F5E8',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  customerButtonText: {
    color: '#5C4A3C',
    fontSize: 18,
    fontWeight: '600',
  },
});
// This is a fake login screen for selecting user roles (chef or customer).