import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = data => {
  const {
    data: {value},
    flipcard,
  } = data;

  return (
    <View style={styles.card}>
      <View style={styles.card_body}>
        {flipcard ? <Text style={styles.text}>{value}</Text> : null}
      </View>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  card: {
    flexWrap: 'wrap',
    width: '20%',
    margin: '1.5%',
    paddingVertical: 3,
  },
  card_body: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 85,
    height: 85,
    padding: 10,
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'red',
  },
});
