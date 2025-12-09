import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getMyLists } from '../lists/lists';

export default function ListsScreen() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getMyLists().then(setLists);
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 10 }}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}
