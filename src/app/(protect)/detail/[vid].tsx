import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import { wp } from "@/src/helpers/common";

const VideoScreen = () => {
  const { vid } = useLocalSearchParams<{ vid: string }>();

  return (
    <View>
      <Text>{vid}</Text>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
