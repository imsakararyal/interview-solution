import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {XCircleIcon, CheckCircleIcon} from 'react-native-heroicons/outline';
const MyComponent = ({data}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setDataSource(filteredData);
  }, [data, searchTerm]);

  const handleSelect = item => {
    const itemExists = selectedItems.some(
      selectedItem =>
        selectedItem.name.toLowerCase() === item.name.toLowerCase(),
    );
    if (itemExists) {
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(
          selectedItem =>
            selectedItem.name.toLowerCase() !== item.name.toLowerCase(),
        ),
      );
    } else {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setDataSource(data);
    inputRef.current.clear();
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.card, isSelected==true?styles.selectedCard:null]}
        onPress={() => handleSelect(item)}>
        <Text style={styles.name}>{item.name}</Text>
        {isSelected ? (
          <CheckCircleIcon color="#000" fill="#fff" size={24} />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search Name"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        {searchTerm !== '' && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <XCircleIcon color="#000" fill="#fff" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={dataSource}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<View style={{height: 20}} />} // Example header component
        ListFooterComponent={<View style={{height: 20}} />} // Example footer component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedCard: {
    backgroundColor: '#e6f2e6',
    borderColor: 'green',
  },
  name: {
    flex: 1,
    marginRight: 10,
  },
});

export default MyComponent;
