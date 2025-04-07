import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { friends } from './Data';
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32 - 12) / 2; // padding 16 * 2, gap 12

const FriendCard = ({ friend }: { friend: typeof friends[0] }) => (
  <View style={[styles.card, { width: cardWidth }]}>
    <Image
      source={{ uri: friend.avatar }}
      style={styles.avatar}
      resizeMode="cover"
    />
    <Text style={styles.name}>{friend.name}</Text>
    <Text style={styles.username}>@{friend.name}</Text>
    <Text style={styles.status}>{friend.status}</Text>
  </View>
);

export default function FriendsPage() {
  const navigation = useNavigation();

  const [visibleCount, setVisibleCount] = useState(12);

  const displayedFriends = friends.slice(0, visibleCount);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>        
        <Text style={styles.title}>Friends</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity>
            <Ionicons name="search" size={22} color="#000" />
          </TouchableOpacity>
          <View style={styles.partyIconWrapper}>
            <Ionicons name="people" size={24} color="#000" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Friends Grid */}
      <FlatList
        data={displayedFriends}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FriendCard friend={item} />}
        contentContainerStyle={styles.friendList}
        ListFooterComponent={() =>
          visibleCount < friends.length ? (
            <TouchableOpacity
              onPress={() => setVisibleCount((prev) => prev + 12)}
              style={styles.loadMoreButton}
            >
              <Text style={styles.loadMoreText}>Show More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  partyIconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  friendList: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12
  },
  avatar: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    color: '#555',
    fontSize: 14,
  },
  status: {
    marginTop: 4,
    fontSize: 12,
    color: '#444',
  },
  loadMoreButton: {
    paddingVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  loadMoreText: {
    color: 'black',
    fontWeight: '500',
  },
});
