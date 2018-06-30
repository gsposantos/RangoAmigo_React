import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function Contato({contato, onSelect}) {
  return (
    <TouchableOpacity onPress={() => onSelect(contato)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          //source={getImageSrc(recipe)}
        />
        <View style={styles.content}>
          <Text style={styles.contentTitle} numberOfLines={1}>
            {contato.givenName}
          </Text>
          <View style={styles.contentScore}>
            <Text>
              Fone:
              <Text style={{fontWeight: 'bold'}}>
                {' '}{contato.phoneNumbers[0].number}%
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentScore: {
    marginTop: 5,
  }
});
