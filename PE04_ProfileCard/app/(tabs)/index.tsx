import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cardsData = Array.from({ length: 6 }, (_, i) => ({
  id: i.toString(),
  name: 'John Doe',
  occupation: 'React Native Developer',
  description:
    'John is a really great JavaScript developer. He loves using JS to build React Native applications for iOS and Android.',
}));

export default function Index() {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleCard = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const renderCard = ({ item }) => {
    const isExpanded = expandedCardId === item.id;
    return (
      <TouchableOpacity
        onPress={() => toggleCard(item.id)}
        activeOpacity={0.9}
        style={[styles.cardBase, isExpanded ? styles.cardExpanded : styles.cardCollapsed]}
      >
        <View style={styles.innerContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('/workspaces/CS624-PE-Tejasree-Kokkanti/PE04-profile_cards/assets/images/user.png')}
              style={isExpanded ? styles.profileImage : styles.collapsedProfileImage}
            />
          </View>
          {isExpanded && (
            <>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.occupation}>{item.occupation}</Text>
              <View style={styles.line} />
              <Text style={styles.description}>{item.description}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cardsData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const cardWidth = Dimensions.get('window').width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },
  listContent: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardBase: {
    backgroundColor: '#2F95DC',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardExpanded: {
    width: Dimensions.get('window').width * 0.9,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  cardCollapsed: {
    width: cardWidth,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  collapsedProfileImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  occupation: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  line: {
    width: 100,
    borderBottomColor: '#fff',
    borderBottomWidth: 1.5,
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
  },
});
