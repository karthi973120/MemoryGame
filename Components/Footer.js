import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.score_container}>
      <Text style={styles.score}>23</Text>
    </View>
  );
};
export default Footer;

const styles = StyleSheet.create({
  score_container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
