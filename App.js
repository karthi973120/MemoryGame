/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import Card from './Components/Card';

const App = () => {
  const cards = [
    {
      value: 'A',
      id: 1,
    },
    {
      value: 'B',
      id: 2,
    },
    {
      value: 'C',
      id: 3,
    },
    {
      value: 'D',
      id: 4,
    },
    {
      value: 'E',
      id: 5,
    },
    {
      value: 'F',
      id: 6,
    },
    {
      value: 'G',
      id: 7,
    },
    {
      value: 'H',
      id: 8,
    },
  ];

  const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const cardspair = [...cards, ...cards];

  const [allcards, setallcards] = useState(shuffle(cardspair));
  const [matched, setmatch] = useState([]);
  const [opened, setopencard] = useState([]);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const firstmatch = allcards[opened[0]];
    const secondmatch = allcards[opened[1]];
    if (secondmatch && firstmatch.id === secondmatch.id) {
      setmatch([...matched, firstmatch.id]);
    }
    if (opened.length === 2) setTimeout(() => setopencard([]), 1000);
  }, [opened]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to quit the game?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const clickCard = (data, index) => {
    setTurn(turn + 1);
    if (!opened.includes(index)) setopencard(opened => [...opened, index]);
  };

  const Rendercards = () => {
    return (
      <>
        <View style={styles.row}>
          {allcards.map((data, index) => {
            let flipcard;
            flipcard = false;
            if (opened.includes(index)) flipcard = true;
            if (matched.includes(data.id)) flipcard = true;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => clickCard(data, index)}>
                <Card data={data} flipcard={flipcard} />
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  const reset = () => {
    setallcards([...shuffle(allcards)]);
    setmatch([]);
    setTurn(0);
    setopencard([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>{Rendercards()}</View>
      <View style={styles.footer}>
        <Text style={styles.score}>score: {matched.length} </Text>
        <Text style={styles.score}>Turns: {turn}</Text>
        <Button onPress={() => reset()} title="Reset" color="#008CFA" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  body: {
    flex: 2,
    padding: 10,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  footer: {},
  score: {
    fontSize: 30,
    margin: 20,
  },
});

export default App;
