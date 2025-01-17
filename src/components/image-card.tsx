import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import { getImageSize, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const ImageCard = ({ item, index, columns, router }) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };
  const imageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };
  return (
    <Pressable
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
      onPress={() => router.push({ pathname: `/detail/${item.id}` })}
    >
      <AnimatedImage
        style={[styles.image, imageHeight()]}
        source={item?.webformatURL}
        transition={100}
        sharedTransitionTag="WP"
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});
