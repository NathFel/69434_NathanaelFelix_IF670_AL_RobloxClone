import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { recommendedGames, categories } from "./Data";
import { useNavigation } from "@react-navigation/native";
import GameDetailModal from "./GameDetailModal"; // Make sure this import is correct

const CategoryPage = ({ route }) => {
  const navigation = useNavigation();
  const { categoryName } = route.params;
  const [selectedCategory, setSelectedCategory] = useState(categoryName);
  const [modalVisible, setModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const flatListRef = useRef(null);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chart</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={30} color="#000" style={styles.icon} />
          <Ionicons name="wallet" size={30} color="#000" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="#000" />
        </View>
      </View>

      {/* Category Dropdown Box */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 12,
          marginHorizontal: 16,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          marginTop: 100
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedCategory}</Text>
        <Ionicons name="chevron-down" size={20} color="#555" />
      </TouchableOpacity>

      {/* Category Name Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginRight:10 }}>
          {selectedCategory}
        </Text>
        <Ionicons name="information-circle-outline" size={20} color="#000" />
      </View>

      {/* Game Grid */}
      <FlatList
        ref={flatListRef}
        data={recommendedGames}
        numColumns={3}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedGame(item);
              setGameModalVisible(true);
            }}
            style={{ flex: 1 / 3, padding: 8 }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 100, borderRadius: 10 }}
            />
            <Text numberOfLines={1} style={{ marginTop: 5, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Text style={{ fontSize: 12 }}>👍 {item.rating * 20}%</Text>
              <Text style={{ fontSize: 12 }}>👤 {item.players}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={scrollToTop}
            style={{ alignItems: "center", padding: 20 }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              Back to top ↑
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: "60%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
              Select Category
            </Text>

            <ScrollView>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setModalVisible(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                  }}
                >
                  <Ionicons
                    name={
                      selectedCategory === cat
                        ? "radio-button-on-outline"
                        : "radio-button-off-outline"
                    }
                    size={22}
                    color="#007bff"
                    style={{ marginRight: 10 }}
                  />
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Game Detail Modal */}
      <GameDetailModal
        visible={gameModalVisible}
        game={selectedGame}
        onClose={() => {
          setGameModalVisible(false);
          setSelectedGame(null);
        }}
      />
    </SafeAreaView>
  );
};

export default CategoryPage;
