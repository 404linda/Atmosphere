import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getTimeline } from '../feeds/timeline';

export default function HomeScreen({ navigation }) {
  const [feed, setFeed] = useState([]);

  async function loadFeed() {
    try {
      const data = await getTimeline();
      setFeed(data);
    } catch (e) {
      alert('Failed to load feed');
    }
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Compose" onPress={() => navigation.navigate('Compose')} />

      <FlatList
        data={feed}
        keyExtractor={(item) => item.post.uri}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 10 }}>
            {item.post.author.handle}: {item.post.record.text}
          </Text>
        )}
      />
    </View>
  );
}
