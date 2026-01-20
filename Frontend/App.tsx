import React from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
export default function App() {
  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text >hello world</Text>
      </ScrollView>
    </SafeAreaView>
  );
}