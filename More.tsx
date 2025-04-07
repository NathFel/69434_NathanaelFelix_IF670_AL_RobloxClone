import React from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";
import { options } from "./Data";

const More = () => {
    const navigation = useNavigation(); 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedHeader}>
                <Text style={styles.headerTitle}>More</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="wallet" size={30} color="#000" style={styles.icon} />
                    <Ionicons name="notifications-outline" size={30} color="#000" />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.grid}>
                    {options.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionBox}
                            onPress={() => {
                                if (item.route2 === "Main") {
                                  navigation.getParent()?.navigate(item.route2, { screen: item.route });
                                } else {
                                  navigation.getParent()?.navigate(item.route2);
                                }}}
                        >
                            <View style={styles.iconWrapper}>
                                <Ionicons name={item.icon} size={28} color="#000" />
                                {item.badge && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.badge}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.optionText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.accountSection}>
                    <TouchableOpacity
                        style={styles.switchAccountBtn}
                        onPress={() => {
                        // Add logic
                        alert("Switch Account tapped!");
                        }}
                    >
                        <Text style={styles.switchAccountText}>Switch Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => {
                            navigation.getParent()?.navigate("StartPage");
                        }}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default More;
