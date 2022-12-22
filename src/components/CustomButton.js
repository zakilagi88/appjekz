import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text
        style={{
          color: 'skyblue',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
