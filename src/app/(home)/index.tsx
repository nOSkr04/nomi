import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { apiCall } from "@/src/api";
import Categories from "@/src/components/categories";
import ImageGrid from "@/src/components/image-grid";
import { hp, wp } from "@/src/helpers/common";
import { theme } from "@/src/constants/theme";
import { SimpleLineIcons } from "@expo/vector-icons";
import { UserApi } from "@/src/apis";
import { useDispatch } from "react-redux";
import { authLogout } from "@/src/store/auth-slice";
import { useSWRConfig } from "swr";
const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState<null | string>(null);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const handleChangeCategory = (cat: string | null) => {
    setActiveCategory(cat);
    setImages([]);
    let params = {
      page: 1,
    };
    if (cat) {
      params["category"] = cat;
    }
    fetchImages(params, false);
  };

  const fetchImages = async (params = { page: 1 }, append = true) => {
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res?.data?.hits]);
      } else {
        setImages([...res?.data?.hits]);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleScrollUp = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  const onLogout = useCallback(async () => {
    try {
      await UserApi.logout();
      dispatch(authLogout());
      mutate("swr.user.me", null, false);
    } catch (err: any) {
      console.log(err);
    }
  }, [dispatch, mutate]);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>💖Номи💖</Text>
        </Pressable>
        <Pressable onPress={onLogout}>
          <SimpleLineIcons name="logout" size={hp(4)} />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={5}
        ref={scrollRef}
      >
        <View style={styles.categories}>
          <Categories
            handleChangeCategory={handleChangeCategory}
            activeCategory={activeCategory}
          />
        </View>
        <View>
          {images?.length > 0 && <ImageGrid images={images} router={router} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  title: {
    fontSize: hp(4),
    fontWeight: "600",
    color: theme.colors.neutral(0.9),
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    gap: 15,
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});
