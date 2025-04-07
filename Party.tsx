import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";

import { friends } from "./Data";

const Party = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedHeader}>
                <Text style={styles.headerTitle}>Party</Text>
                <View style={styles.headerIcons}>              
                    <Ionicons name="notifications-outline" size={30} color="#000" />
                    <Ionicons name="search" size={30} color="#000" style={styles.icon} />
                    <Ionicons name="add-outline" size={40} color="#000" style={styles.icon2} />
                </View>
            </View>

            <ScrollView style={styles.PartyScroll}>
                <View style={styles.container}>

                    <View style={{borderBottomWidth: 0.5, padding: 5,}}>
                    <View style={styles.row}>
                        <View style={styles.partyLeftSection}>
                        <Ionicons name="people-outline" size={40} color="#111" style={{marginRight: 15}} />
                        <View style={styles.partyText1}>
                            <Text style={styles.partyName}>Communities</Text>
                            <Text numberOfLines={1} style={styles.partyLastChat}>
                                Create and explore communities
                            </Text>
                        </View>
                        </View>
                        <Text style={styles.partyName}>{'->'}</Text>
                    </View>
                    </View>

                    {friends.map((friend) => (
                    <View style={{borderBottomWidth: 0.5, padding: 5,}}>
                    <View style={styles.row}>
                        <View style={styles.partyLeftSection}>
                        <Image source={{ uri: friend.avatar }} style={styles.PartyImg} />
                        <View style={styles.partyText1}>
                            <Text style={styles.partyName}>{friend.name}</Text>
                            <Text numberOfLines={1} style={styles.partyLastChat}>
                            {friend.LastChat}
                            </Text>
                        </View>
                        </View>
                        <Text style={styles.partyTime}>{friend.lastMessageTime}</Text>
                    </View>
                    </View>
                    ))}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Party;