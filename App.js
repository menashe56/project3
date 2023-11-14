import { StatusBar } from 'expo-status-bar';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const db = SQLite.openDatabase('mydb.db');
  
  // State variable to store SQLite data
  const [sqliteData, setSqliteData] = useState([]);

  const handlePrintData2 = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY NOT NULL, name TEXT, age INTEGER);',
        [],
        () => console.log('Table created successfully'),
        (error) => console.log('Error:', error)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO mytable (name, age) VALUES (?, ?)',
        ['John', 30],
        () => console.log('Data inserted successfully'),
        (error) => console.log('Error:', error)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM mytable',
        [],
        (_, { rows: { _array } }) => {
          const data = _array;
          console.log('SQLite Data:', data);
          setSqliteData(data); // Update state with SQLite data
        },
        (error) => console.log('Error:', error)
      );
    });
    setModalOpen(true)
  };

  // Add your handleInsertData function here (to insert data into SQLite)

  const [data, setData] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');

  return (
    <View style={{ marginTop: 80 }}>
      <Button title='Print' onPress={handlePrintData2} />
      <View style={{ marginTop: 40 }}>
        <TextInput
          placeholder='name'
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          placeholder='email'
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder='age'
          style={styles.input}
          onChangeText={(text) => setAge(text)}
          value={age}
        />
        <TextInput
          placeholder='date of birth'
          style={styles.input}
          onChangeText={(text) => setDob(text)}
          value={dob}
        />
      </View>
      <Modal visible={ModalOpen} animationType='slide'>
        <MaterialIcons name='close' size={45} onPress={() => setModalOpen(false)} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Text style={{ left: -80, fontSize: 24, fontWeight: 'bold' }}>
              Data from Database:
            </Text>
            {sqliteData.map((item, index) => (
              <View key={index}>
                <Text>ID: {item.id}</Text>
                <Text>Name: {item.name}</Text>
                <Text>Age: {item.age}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  scroll: {
    height: '100%'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    textAlign: 'center',
    marginHorizontal: 20,
    marginLeft: '20%',
    marginBottom: 10
  }
});
