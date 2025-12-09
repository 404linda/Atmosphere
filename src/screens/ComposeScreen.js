import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { agent } from '../atproto/client';

export default function ComposeScreen({ navigation }) {
  const [text, setText] = useState('');

  async function post() {
    try {
      await agent.post({ text });
      navigation.goBack();
    } catch (e) {
      alert('Post failed');
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="What’s happening?"
        value={text}
        onChangeText={setText}
        style={{ height: 150, borderWidth: 1, padding: 10 }}
        multiline
      />
      <Button title="Post" onPress={post} />
    </View>
  );
}
