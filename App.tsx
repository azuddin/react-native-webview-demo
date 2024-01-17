/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  const [query, onChangeText] = useState('');
  const [url, onSubmit] = useState('https://www.google.com/search?q=chip');
  const [load, setOnload] = useState(true);

  const handleSubmit = () => {
    console.log('submit');
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlRegex.test(query)) {
      onSubmit(query);
    } else {
      onSubmit(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <TextInput
          onChangeText={onChangeText}
          style={styles.searchTextInput}
          onSubmitEditing={handleSubmit}
        />
        <View style={{borderWidth: 0.5}} />
        <WebView
          source={{
            uri: url,
          }}
          style={styles.webViewStyle}
          onLoad={() => setOnload(false)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchTextInput: {
    minHeight: 40,
    margin: 24,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  webViewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
