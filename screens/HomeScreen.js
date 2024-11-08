import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>

      <Button
        title="Go to Game Screen"
        onPress={() => navigation.navigate('GameScreen')}
      />
    </View>
  );
}
