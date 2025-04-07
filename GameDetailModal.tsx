import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { storeItems, recommendedGames } from "./Data";

const { height } = Dimensions.get("window");

type Game = {
  id: string;
  title: string;
  rating: number;
  players: string;
  image: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  game: any;
};

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

const GameDetailModal = ({ visible, onClose, game }: Props) => {
  if (!game) return null;

  const [modalHeight] = useState(new Animated.Value(height * 0.5));
  const [locked, setLocked] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const [selectedGame, setSelectedGame] = useState(game); // <-- NEW

  const scrollRef = useRef<ScrollView>(null);
  const atBottomRef = useRef(false);

  useEffect(() => {
    if (visible) {
      setSelectedGame(game);
      Animated.timing(modalHeight, {
        toValue: height * 0.5,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setLocked(false);
        setShowHeader(false);
      });
    }
  }, [visible, game]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !locked,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy < 0) {
        Animated.timing(modalHeight, {
          toValue: height * 0.95,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setLocked(true);
          setShowHeader(true);
        });
      } else if (gesture.dy > 0 && !locked) {
        Animated.timing(modalHeight, {
          toValue: height * 0.5,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy > 100 && !locked) {
        onClose();
      }
    },
  });

  const handleScroll = (e: any) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const contentHeight = e.nativeEvent.contentSize.height;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
  
    const isAtBottom = yOffset + scrollViewHeight >= contentHeight - 10;
    const isAtTop = yOffset <= 0;
  
    if (isAtBottom) {
      atBottomRef.current = true;
    } else {
      atBottomRef.current = false;
    }
  
    // Unlock and hide header if user scrolls to top
    if (isAtTop) {
      setLocked(false);
      setShowHeader(false);
    }
  };

  const handleScrollEndDrag = (e: any) => {
    if (atBottomRef.current && e.nativeEvent.velocity.y > 1.5) {
      onClose(); // close on quick pull-down after bottom
    }
  };
  const renderContent = () => {
    switch (selectedGame.id) {
      case "1":
        return (
          <View style={styles.contentBlock}>
            <Text style={styles.heading}>About Epic Quest</Text>
            <ExpandableParagraph
              text="Embark on a thrilling journey through the fantasy world of Epic Quest. Fight terrifying monsters, complete epic quests, and level up to unlock powerful abilities. Explore enchanted forests, ancient ruins, and mystical cities as you uncover hidden secrets and forge your legend. Meet allies along the way, each with their own story and skills. Are you ready to become the hero this realm desperately needs?"
            />
            
            {/* Vote */}
            <View style={styles.voteContainer}>
              <FontAwesome name="thumbs-up" size={45} color="black" />
              <View style={styles.voteInfo}>
                <Text style={styles.votePercent}>90%</Text>
                <Text style={styles.voteCount}>4000 votes</Text>
              </View>
              <View style={styles.voteActions}>
                <FontAwesome style={{ borderWidth: 1, borderRadius: 5, padding: 2 }} name="arrow-up" size={40} color="black" />
                <FontAwesome style={{ borderWidth: 1, borderRadius: 5, padding: 2 }} name="arrow-down" size={40} color="black" />
              </View>
            </View>
  
            {/* Store */}
            <View style={styles.storeContainer}>
              <View style={styles.storeHeader}>
                <Text style={styles.storeTitle}>Store</Text>
                <FontAwesome name="arrow-right" size={20} color="black" />
              </View>
              <FlatList
                data={storeItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemCard}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                      <FontAwesome name="money" size={16} color="gold" />
                      <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
  
            {/* Game Info */}
            <View style={styles.header}><Text>Content Maturity</Text><Text>Mild</Text></View>
            <View style={styles.header}><Text>Developer {'>'}</Text><Text>RobloxCreator {'>'}</Text></View>
            <View style={styles.header}><Text>Server Size</Text><Text>12</Text></View>
            <View style={styles.header}><Text>Genre</Text><Text>Simulator</Text></View>
            <View style={styles.header}><Text>Created</Text><Text>1/13/2023</Text></View>
            <View style={styles.header}><Text>Updated</Text><Text>4/4/2025</Text></View>
            <View style={styles.header}><Text>Voice Chat</Text><Text>Supported</Text></View>
            <View style={styles.header}><Text>Camera</Text><Text>Supported</Text></View>
            <View style={styles.header}><Text>Server</Text><Text>{'->'}</Text></View>
  
            {/* Social Links */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <FontAwesome name="twitter" size={40} color="#1DA1F2" />
              <FontAwesome name="youtube-play" size={40} color="#FF0000" />
              <FontAwesome name="twitch" size={40} color="#6441A5" />
            </View>
  
            {/* Recommended Games */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recomended Game</Text>
              </View>
              <FlatList
                data={recommendedGames}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSelectedGame(item)} style={styles.gameItem}>
                    <Image source={{ uri: item.image }} style={styles.squareImage} />
                    <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.gameInfo}>👍 {item.rating * 20}% 👤 {item.players}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        );
  
      case "2":
        return (
          <View style={styles.contentBlock}>
            <Text style={styles.heading}>About Space Runner</Text>
            <ExpandableParagraph
              text="Run through asteroid belts, dodge lasers, and collect crystals to upgrade your ship. Space Runner is an endless arcade challenge that tests your reflexes and strategy. Compete with friends in speedrun mode, climb the galactic leaderboard, and customize your ship with rare parts from across the universe."
            />
          </View>
        );
  
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalWrapper}>
        {/* Outside Close Button */}
        <TouchableOpacity style={styles.outsideCloseButton} onPress={onClose}>
          <FontAwesome name="close" size={28} color="white" />
        </TouchableOpacity>

        {/* Modal Content */}
        <Animated.View
          style={[styles.modalContainer, { height: modalHeight }]}
          {...(!locked ? panResponder.panHandlers : {})}
        >
          <View {...panResponder.panHandlers} style={styles.handle}>
            <View style={styles.handleBar} />
          </View>
                  
          <ScrollView
            ref={scrollRef}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            onScrollEndDrag={handleScrollEndDrag}
            scrollEventThrottle={16}
          >
            <Image source={{ uri: selectedGame.image }} style={styles.banner} />
            <View style={styles.detailBlock}>
              <Text style={styles.title}>{selectedGame.title}</Text>
              <Text style={styles.subtitle}>
                👍 {selectedGame.rating * 20}% 👤 {selectedGame.players} players
              </Text>
            </View>
            {renderContent()}
          </ScrollView>

          {/* Play Button */}
          <View style={styles.playButtonContainer}>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="users" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default GameDetailModal;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    maxHeight: height * 0.95,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    position: "relative",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 12,
  },
  detailBlock: {
    marginTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  contentBlock: {
    marginTop: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
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
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    width: "95%",
    alignSelf: "center",
  },
  voteInfo: {
    alignItems: "center",
    marginLeft: -80,
  },
  votePercent: {
    fontSize: 30,
    fontWeight: "bold",
  },
  voteCount: {
    fontSize: 12,
    textDecorationLine: "underline",
    color: "#555",
    marginTop: -5,
  },
  voteActions: {
    flexDirection: "row",
    gap: 12,
  },
  storeContainer: {
    marginTop: 20,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemCard: {
    width: 120,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  playButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    height: 60,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    zIndex: 10,
  },
  playButton: {
    backgroundColor: "#00cc66",
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  playButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    width: 100,
    textAlign: "center",
  },
  outsideCloseButton: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 999,
  },

  section: { paddingHorizontal: 16, paddingVertical: 10, marginBottom: 80 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600" },

  gameItem: { width: 100, marginRight: 12 },
  squareImage: { width: 100, height: 100, borderRadius: 12 },
  gameTitle: { fontSize: 14, fontWeight: "600", marginTop: 4 },
  gameInfo: { fontSize: 12, color: "#555" },

  handle: {
    alignItems: "center",
  },
  handleBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginTop: 5,
    marginBottom: -5,
  },
  
});
