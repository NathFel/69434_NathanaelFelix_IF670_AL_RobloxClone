import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  section: { paddingHorizontal: 16, paddingVertical: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600" },
  link: { color: "#007bff" },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#007bff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: { width: 80, height: 80, borderRadius: 35 },
  profile: { width: 80, height: 80, borderRadius: 35, marginRight: 20 },
  gameItem: { width: 100, marginRight: 12 },
  squareImage: { width: 100, height: 100, borderRadius: 12 },
  gameTitle: { fontSize: 14, fontWeight: "600", marginTop: 4 },
  gameInfo: { fontSize: 12, color: "#555" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  recommendedCard: { width: "48%", marginBottom: 12 },
  recommendedImage: { width: "100%", height: 120, borderRadius: 10 },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    zIndex: 10,
    justifyContent: "space-between",
    paddingTop: 28,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "space-evenly",
  },
  icon: {
    marginRight: 8,
  },
  icon2: {
    marginLeft: -10,
  },
  friendItem: {
    alignItems: "center",
    marginRight: 15,
  },
  nameText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  statusText: {
    fontSize: 12,
    color: "#888",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  popularonBox: {  
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,

  },
  PartyImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  PartyScroll: {
    marginHorizontal: 5,
    marginTop: 85,
  },
  partyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  partyLastChat: {
    fontSize: 14,
    color: "#666",
  },
  partyTime: {
    fontSize: 12,
    color: "#888",
    paddingLeft: 10,
  },
  partyLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  partyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  partyText1: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  scroll: {
    marginTop: 60,
    padding: 16,
  },
  optionBox: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#D3D3D3",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  iconWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  badge: {
    position: "absolute",
    top: -20,
    right: -60,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 0,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  accountSection: {
    marginTop: -450,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  
  switchAccountBtn: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  
  switchAccountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  
  logoutBtn: {
    backgroundColor: "#ffe5e5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});

export default styles;