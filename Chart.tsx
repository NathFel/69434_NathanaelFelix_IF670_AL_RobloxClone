import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { recommendedGames, categories } from "./Data";
import GameDetailModal from "./GameDetailModal";

const Chart = () => {
   const navigation = useNavigation(); 

  const [deviceModalVisible, setDeviceModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("All Devices");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const devices = ["All Devices", "Phone", "Tablet", "Console"];
  const locations = ["All Locations", "USA", "UK", "Indonesia", "Japan"];

  const openModal = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  const renderRecommendedGame = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={{ width: 180, marginRight: 12 }}>
      <Image source={{ uri: item.image }} style={styles.recommendedImage} />
      <Text style={styles.gameTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.gameInfo}>👍 {item.rating * 20}%</Text>
        <Text style={styles.gameInfo}>👤 {item.players} playing...</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPickerModal = (
    label,
    visible,
    setVisible,
    options,
    selected,
    setSelected
  ) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            height: "60%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            paddingBottom: 80,
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 10,
            }}
          >
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Select {label}
          </Text>

          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setSelected(option)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Ionicons
                  name={
                    selected === option
                      ? "radio-button-on-outline"
                      : "radio-button-off-outline"
                  }
                  size={24}
                  color="#007bff"
                  style={{ marginRight: 10 }}
                />
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Apply Button */}
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#007bff",
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>Chart</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={30} color="#000" style={styles.icon} />
          <Ionicons name="wallet" size={30} color="#000" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="#000" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 90 }}>
        {/* Filters */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 15, marginBottom: 10 }}>Popular on:</Text>
          <View style={{ flexDirection: "row", gap: 10, alignItems:"flex-start", width: 250 }}>
            <TouchableOpacity
              onPress={() => setDeviceModalVisible(true)}
              style={ styles.popularonBox }
            >
              <Text numberOfLines={1}>{selectedDevice} ⌄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLocationModalVisible(true)}
              style={ styles.popularonBox }
            >
              <Text numberOfLines={1}>{selectedLocation} ⌄</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Game Categories */}
        {categories.map((category, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => navigation.navigate("CategoryPage", { categoryName: category })}
              >
                <Text style={styles.sectionTitle}>{category} {'->'}</Text>
              </TouchableOpacity>
              <Ionicons name="information-circle-outline" size={24} color="#000" />
            </View>

            <FlatList
              data={recommendedGames}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={renderRecommendedGame}
              ListEmptyComponent={() => (
                <Text style={{ padding: 20, color: "#999" }}>
                  No games available
                </Text>
              )}
            />
          </View>
        ))}
      </ScrollView>

      {/* Game Detail Modal */}
      <GameDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        game={selectedGame}
      />

      {/* Device Picker Modal */}
      {renderPickerModal(
        "Device",
        deviceModalVisible,
        setDeviceModalVisible,
        devices,
        selectedDevice,
        setSelectedDevice
      )}

      {/* Location Picker Modal */}
      {renderPickerModal(
        "Location",
        locationModalVisible,
        setLocationModalVisible,
        locations,
        selectedLocation,
        setSelectedLocation
      )}
    </SafeAreaView>
  );
};

export default Chart;
