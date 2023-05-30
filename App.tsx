import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MyComponent from './components/MyComponent';

import {faker} from '@faker-js/faker';
function App(): JSX.Element {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const generateData = () => {
    const data = [];
    for (let i = 1; i <= 10000; i++) {
      data.push({
        id: i,
        name: faker.person.fullName(),
      });
    }
    setData(data);
    setLoading(true);
    return data;
  };

  useEffect(() => {
    generateData();
  }, []);

  // const generateDataJSON = () => {
  //   const jsonData = generateData();
  //   const jsonStr = JSON.stringify(jsonData, null, 2);

  //   fs.writeFile('data.json', jsonStr, err => {
  //     if (err) {
  //       console.error('Error writing JSON file:', err);
  //     } else {
  //       console.log('JSON file generated successfully!');
  //     }
  //   });
  // };
  // const data = [
  //   {
  //     id: 1,
  //     name: 'Ram prasad shrestha',
  //   },
  //   {
  //     id: 2,
  //     name: 'shyam prasad shrestha',
  //   },
  //   {
  //     id: 3,
  //     name: 'shyam prasad shrestha',
  //   },
  //   {
  //     id: 4,
  //     name: 'Ram',
  //   },
  //   {
  //     id: 5,
  //     name: 'ram',
  //   },
  // ];

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        {loading ? (
          <MyComponent data={data} />
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Data are bing loaded please wait ...</Text>
            <ActivityIndicator color={'#000'} size={'small'} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
