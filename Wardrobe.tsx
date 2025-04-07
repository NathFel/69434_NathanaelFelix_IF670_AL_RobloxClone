import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { dummyItems } from "./Data"

const { height, width } = Dimensions.get("window");

const categories = ["Shirts", "Pants", "Accessories", "Hats", "Shoes", "Glasses"];
const subcategories = ["subcat1", "subcat2", "subcat3", "subcat4", "subcat5"];

const SNAP_POINTS = {
  MIN: height * 0.1,
  MID: height * 0.5,
  MAX: height * 0.9,
};

const Wardrobe = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const animatedHeight = useRef(new Animated.Value(SNAP_POINTS.MID)).current;

  let startHeight = SNAP_POINTS.MID;

  useEffect(() => {
    Animated.spring(animatedHeight, {
      toValue: SNAP_POINTS.MID,
      useNativeDriver: false,
    }).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedHeight.stopAnimation((value) => {
          startHeight = value;
        });
      },
      onPanResponderMove: (_, gesture) => {
        const newHeight = startHeight - gesture.dy;
        animatedHeight.setValue(
          Math.max(SNAP_POINTS.MIN, Math.min(SNAP_POINTS.MAX, newHeight))
        );
      },
      onPanResponderRelease: (_, gesture) => {
        const newHeight = startHeight - gesture.dy;
        let snapTo = SNAP_POINTS.MIN;

        if (newHeight >= (SNAP_POINTS.MAX + SNAP_POINTS.MID) / 2) {
          snapTo = SNAP_POINTS.MAX;
        } else if (newHeight >= (SNAP_POINTS.MID + SNAP_POINTS.MIN) / 2) {
          snapTo = SNAP_POINTS.MID;
        }

        Animated.spring(animatedHeight, {
          toValue: snapTo,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const avatarTranslateY = animatedHeight.interpolate({
    inputRange: [SNAP_POINTS.MIN, SNAP_POINTS.MID, SNAP_POINTS.MAX],
    outputRange: [0, -40, -80],
    extrapolate: "clamp",
  });

  const avatarScale = animatedHeight.interpolate({
    inputRange: [SNAP_POINTS.MIN, SNAP_POINTS.MAX],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalHeight, setModalHeight] = useState(SNAP_POINTS.MID);
  useEffect(() => {
    animatedHeight.addListener(({ value }) => {
      setModalHeight(value);
    });
  
    return () => {
      animatedHeight.removeAllListeners();
    };
  }, [animatedHeight]);

  const renderItem = ({ item }) => {
    const isSelected = selectedItem === item;
  
    return (
      <TouchableOpacity
        style={[styles.itemCard, isSelected && styles.selectedItem]}
        onPress={() => setSelectedItem(prevItem => (prevItem === item ? null : item))}
        activeOpacity={0.8}
      >
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
  
          {/* Check icon when selected */}
          {isSelected && (
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark-circle" size={22} color="green" />
            </View>
          )}
  
          {/* Detail button when selected */}
          {isSelected && (
            <TouchableOpacity 
              style={styles.detailButton}
              onPress={() => {
                navigation.getParent()?.navigate("ItemDetail");
              }}           
            >
              <Text style={styles.detailButtonText}>Detail</Text>
            </TouchableOpacity>
          )}
        </View>
  
        <Text numberOfLines={1} style={styles.itemName}>{item.name}</Text>
        <Text style={styles.creatorName}>{item.creatorName}</Text>
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginTop: 2 }}>
          <FontAwesome5 name="coins" size={16} color="#FFD700" />
          <Text>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Avatar Preview */}
      <Animated.View
        style={[
          styles.avatarPreview,
          {
            transform: [{ translateY: avatarTranslateY }, { scale: avatarScale }],
          },
        ]}
        pointerEvents="none"
      >
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYP5bAly5wUckNDCUa_LWfHzEynO-9yFgAQg&s" }}
          style={styles.avatar}
        />
      </Animated.View>

      {/* Navigation Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.navTitleWrapperL}>
          <Text style={styles.navTitle}>Marketplace</Text>
        </View>

        <View style={styles.navTitleWrapperR}>
          <Text style={styles.navTitle}>Customize</Text>
        </View>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* ABSOLUTE TOP LEFT — Avatar */}
      <View style={styles.topLeftWrapper}>
        <Image
          source={{ uri: "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-BB11FDD0A9208DDE07120F97CC26B555-Png/150/150/AvatarHeadshot/Webp/noFilter" }}
          style={styles.smallAvatar}
        />
      </View>
      
      {/* ABSOLUTE TOP LEFT — adjustment */}
      <View style={styles.topLeftWrapper2}>
        <FontAwesome5 name="sliders-h" size={40} color="black" />
      </View>
      

      {/* ABSOLUTE TOP RIGHT — Money Logo + Amount */}
      <View style={styles.topRightWrapper}>
        <FontAwesome5 name="coins" size={16} color="#FFD700" />
        <Text style={styles.moneyAmount}>1234</Text>
      </View>

      {/* Wardrobe Modal */}
      <Animated.View style={[styles.modalContainer, { height: animatedHeight }]}>
        <View {...panResponder.panHandlers} style={styles.handle}>
          <View style={styles.handleBar} />
        </View>

        {/* Categories */}
        <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categorySelected,
              ]}
            >
              <Text
                style={{
                  color: selectedCategory === cat ? "#333" : "#333",
                  fontSize: 14,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>

        {/* Subcategories with Filter Icon */}
        <View style={styles.categoryWrapper}>
          <TouchableOpacity style={styles.filterIcon}>
            <Ionicons name="filter" size={20} color="#333" />
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subcategoryScroll}
          >
            {subcategories.map((sub) => (
              <TouchableOpacity
                key={sub}
                onPress={() => setSelectedSubcategory(sub)}
                style={[
                  styles.subcategoryButton,
                  selectedSubcategory === sub && styles.categorySelected,
                ]}
              >
                <Text
                  style={{
                    color: selectedSubcategory === sub ? "#333" : "#333",
                    fontSize: 13,
                  }}
                >
                  {sub}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Item Grid */}
        <FlatList
          data={dummyItems}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Show Tab Below if an Item is Selected */}
        {selectedItem && modalHeight >= SNAP_POINTS.MID && (
        <View style={styles.itemTab}>
            <View style={styles.logoContainer}>
            <FontAwesome5 name="ellipsis-h" size={15} color="#333" />
            </View>
            <TouchableOpacity style={styles.buyButton}>
            <View style={styles.coinContainer}>
                <FontAwesome5 name="coins" size={16} color="#FFD700" />
            </View>
            <Text style={styles.buyButtonText}>{selectedItem.price}</Text>
            </TouchableOpacity>
        </View>
        )}
      </Animated.View>
    </View>
  );
};

export default Wardrobe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 38,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#fff",
    zIndex: 99,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  navButton: {
    width: 32,
    alignItems: "center",
  },
  navTitleWrapperL: {
    flex: 1,
    alignItems: "center",
    marginLeft: 50,
  },
  navTitleWrapperR: {
    flex: 1,
    alignItems: "center",
    marginRight: 50,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  avatarPreview: {
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 20,
  },
  handle: {
    alignItems: "center",
    paddingVertical: 6,
  },
  handleBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
  categoryScroll: {
    flexDirection: "row",
    marginBottom: 5
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 5,
    height: 25,
  },
  categorySelected: {
    borderBottomWidth: 2,
  },
  categoryWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    marginRight: 8,
    padding: 4,
    backgroundColor: "#f0f0f0",
    marginBottom: 10
  },
  subcategoryScroll: {
    flexDirection: "row",
    marginBottom: 10,
  },
  subcategoryButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  subcategoryText: {
    fontSize: 13,
    color: "#333",
  },
  itemCard: {
    width: (width - 60) / 3,
    margin: 6,
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 8,
  },
  itemImage: {
    width: 95,
    height: 95,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "D3D3D3",
    backgroundColor: "#D3D3D3",
  },
  itemName: {
    fontSize: 15,
    textAlign: "center",
  },
  creatorName: {
    fontSize: 11,
    textAlign: "center",
    marginTop: -4,
    marginBottom: 3
  },
  topLeftWrapper: {
    position: "absolute",
    top: 110,
    left: 16,
    alignItems: "center",
    zIndex: 10,
  },
  topLeftWrapper2: {
    position: "absolute",
    top: 180,
    left: 16,
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    padding: 5,
  },
  smallAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginBottom: 4,
  },
  topRightWrapper: {
    position: "absolute",
    top: 110,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  moneyAmount: {
    marginLeft: 6,
    fontWeight: "bold",
    color: "#333",
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
    flexDirection: 'row', // Align the coin logo and price horizontally
    alignItems: 'center', // Vertically center the coin logo and text
    gap: 5, // Space between the coin logo and price
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5, // Adds a small gap between the coin logo and price text
  },
  selectedItem: {
    backgroundColor:"#D3D3D3",
  },
  checkIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 50,
    padding: 2,
    zIndex: 5,
  },
  
  detailButton: {
    position: 'absolute',
    bottom: 9,
    left: 3,
    right: 3,
    backgroundColor: 'green',
    paddingVertical: 4,
    borderRadius: 7,
    alignItems: 'center',
  },
  
  detailButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});
