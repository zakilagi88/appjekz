import { TextInput, View } from 'react-native';
import React from 'react';

export default function InputField({
  label,
  value,
  icon,
  inputType,
  keyboardType,
  onChangeText,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: 'skyblue',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 25,
        borderRadius: 10,
      }}
    >
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
          }}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          style={{
            flex: 1,
            paddingVertical: 0,
          }}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
        />
      )}
    </View>
  );
}
