import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GameDetailModal from "./GameDetailModal";
import { friends, continueGames, popularGames, recommendedGames } from "./Data";
import styles from "./style";

const Home = () => {

  const navigation = useNavigation(); 

  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  const renderFriends = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.statusText}>{item.status}</Text>
    </View>
  );

  const renderSquareGame = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.gameItem}>
      <Image source={{ uri: item.image }} style={styles.squareImage} />
      <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.gameInfo}>👍 {item.rating * 20}% 👤 {item.players}</Text>
    </TouchableOpacity>
  );

  const renderRecommendedGame = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => openModal(item)}
      style={styles.recommendedCard}
    >
      <Image source={{ uri: item.image }} style={styles.recommendedImage} />
      <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
      <View style={{justifyContent:"space-between", flexDirection:"row"}}>
        <Text style={styles.gameInfo}>👍 {item.rating * 20}%</Text>
        <Text style={styles.gameInfo}>👤 {item.players} playing...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={30} color="#000" style={styles.icon} />
          <Ionicons name="wallet" size={30} color="#000" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="#000" />
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems:"center", marginTop:70 }}>
            <Image
              source={{ uri: friends[0].avatar }}
              style={styles.profile}
            />
              <Text style={styles.sectionTitle}>Nathanael Felix</Text>
          </View>
        </View>
        
        {/* Friends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("Friends")} >
            <Text style={styles.sectionTitle}>Friends ({friends.length}) {'->'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              <View style={styles.friendItem}>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="person-add" size={40} color="#007bff" />
                </TouchableOpacity>
                <Text>Add Friend</Text>
              </View>
              <FlatList
                data={friends}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderFriends}
              />
            </View>
          </ScrollView>
        </View>

        {/* Continue */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue {'->'}</Text>
          </View>
          <FlatList
            data={continueGames}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderSquareGame}
          />
        </View>

        {/* Popular */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular {'->'}</Text>
          </View>
          <FlatList
            data={popularGames}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderSquareGame}
          />
        </View>

        {/* Recomended */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <View style={styles.grid}>{recommendedGames.map(renderRecommendedGame)}</View>
        </View>
      </ScrollView>

      <GameDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        game={selectedGame}
      />
    </SafeAreaView>
  );
};

export default Home;
