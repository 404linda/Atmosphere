import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { login } from '../atproto/client';

export default function LoginScreen({ navigation }) {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');

  async function doLogin() {
    try {
      await login(handle, password);
      navigation.replace('Home');
    } catch (e) {
      alert('Login failed');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Atmosphere</Text>

      <TextInput
        placeholder="Handle"
        value={handle}
        onChangeText={setHandle}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <TextInput
        placeholder="App Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <Button title="Login" onPress={doLogin} />
    </View>
  );
}
