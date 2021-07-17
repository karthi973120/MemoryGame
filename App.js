/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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

  // cards = shuffle(cards.concat(clone));

  const [matched, setmatch] = useState([]);
  const [opened, setopencard] = useState([]);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const firstmatch = cardspair[opened[0]];
    const secondmatch = cardspair[opened[1]];
    if (secondmatch && firstmatch.id === secondmatch.id) {
      setmatch([...matched, firstmatch.id]);
    }
    if (opened.length === 2) setTimeout(() => setopencard([]), 1000);
  }, [opened]);

  const clickCard = (data, index) => {
    setTurn(turn + 1);
    setopencard(opened => [...opened, index]);
  };
  console.log(turn, 'matched');
  const Rendercards = () => {
    return (
      <>
        <View style={styles.row}>
          {cardspair.map((data, index) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.body}>{Rendercards()}</View>
      <View style={styles.footer}>
        <Text style={styles.score}>score: {matched.length} </Text>
        <Text style={styles.score}>Turns: {turn}</Text>
        <Button title="Reset" color="#008CFA" />
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
