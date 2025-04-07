import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { dummyItems } from "./Data";

const ExpandableParagraph = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <Text
        style={styles.paragraph}
        numberOfLines={expanded ? undefined : 3}
      >
        {text}
      </Text>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Text style={styles.expandIcon}>{expanded ? "▲" : "▼"}</Text>
      </Pressable>
    </View>
  );
};

const ItemDetail = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Item Name */}
        <Text style={styles.itemName}>Spiky Hair</Text>

        {/* Big Item Image */}
        <Image
          source={{ uri: "data:image/jpeg;base64,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" }}
          style={styles.itemImage}
        />

        {/* Expandable Description */}
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <ExpandableParagraph
              text="Spiky Hair is a bold accessory that adds serious flair to any avatar.
            Stand out in every game with this electrifying look. It’s perfect for
            players who want to show off their wild style and confidence. Tap to
            read more about how it can transform your gameplay aesthetic."
            />
        </TouchableOpacity>

        {/* Favorite Section */}
        <View style={styles.favoriteRow}>
          <Ionicons name="star" size={55} color="gold" />
          <View style={styles.favoriteColumn}>
            <Text style={styles.favoriteCount}>2.1K</Text>
            <Text style={styles.favoriteLabel}>Favorites</Text>
          </View>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}><Text>Creator</Text><Text>Robloc User →</Text></View>
        <View style={styles.infoRow}><Text>Type</Text><Text>Accessory | Hair</Text></View>

        {/* You May Also Like */}
        <Text style={styles.sectionTitle}>You May Also Like</Text>
        <FlatList
          data={dummyItems.slice(0, 6)}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.recommendedList}
          renderItem={({ item }) => (
            <View style={styles.recommendCard}>
              <Image source={{ uri: item.image }} style={styles.recommendImage} />
              <Text style={styles.recommendName} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.itemTab}>
            <View style={styles.logoContainer}>
                <FontAwesome5 name="ellipsis-h" size={15} color="#333" />
            </View>
            <TouchableOpacity style={styles.buyButton}>
                <View style={styles.coinContainer}>
                    <FontAwesome5 name="coins" size={16} color="#FFD700" />
                </View>
                <Text style={styles.buyButtonText}>500</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  itemName: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginBottom: 20,
  },
  favoriteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  favoriteColumn: {
    marginLeft: 8,
  },
  favoriteCount: {
    fontSize: 30,
    fontWeight: "bold",
  },
  favoriteLabel: {
    fontSize: 15,
    color: "#888",
    marginTop: -5
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 0.2,
  },
  infoItem: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 20
  },
  recommendedList: {
    gap: 12,
  },
  recommendCard: {
    flex: 1 / 3,
    alignItems: "center",
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  recommendImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 1,
  },
  recommendName: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 12,
    fontWeight: "bold"
  },
  paragraph: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    lineHeight: 20,
  },
  expandIcon: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 12,
  },
  itemTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
    flexDirection: 'row'
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: 'center',
    marginRight: 25,
    borderWidth: 2,
    padding: 5,
    borderRadius: 20, 
    marginTop: 5
  },
  buyButton: {
    backgroundColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  coinContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5, 
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});
