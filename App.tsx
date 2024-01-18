/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  const [query, onChangeText] = useState('');
  const [url, onSubmit] = useState('https://www.google.com/search?q=chip');
  const [loadProgress, setOnloadProgress] = useState(1);

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
        {loadProgress < 1 && (
          <View
            style={{
              height: 5,
              backgroundColor: 'purple',
              width: loadProgress * Dimensions.get('window').width,
            }}
          />
        )}
        <ScrollView
          style={styles.scrollViewStyle}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollViewContent}>
          <WebView
            onLoadProgress={({nativeEvent}) => {
              setOnloadProgress(nativeEvent.progress);
            }}
            onStartShouldSetResponder={() => true}
            source={{
              uri: url,
            }}
            style={styles.webViewStyle}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchTextInput: {
    color: 'black',
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
  scrollViewStyle: {width: '100%'},
  scrollViewContent: {flexGrow: 1},
});

export default App;
