import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { ILoginForm, LoginForm } from "@/src/components/auth/login-form";
import { hp, wp } from "@/src/helpers/common";
import { theme } from "@/src/constants/theme";
import { UserApi } from "@/src/apis";
import { authLogin } from "@/src/store/auth-slice";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const imagePosition = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    handleSubmit: handleLogin,
    control: loginControl,
    setError: setLoginError,
  } = useForm<ILoginForm>();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
      marginHorizontal: 20,
      marginTop: 20,
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

  const loginHandler = useCallback(() => {
    imagePosition.value = 0;
    opacity.value = withTiming(0, { duration: 500 });
  }, [imagePosition]);

  const onCloseHandler = useCallback(() => {
    opacity.value = withTiming(1, { duration: 500 });
    imagePosition.value = 1;
  }, []);

  const onLogin = useCallback(
    async (data: ILoginForm) => {
      setLoading(true);
      const createData = {
        username: data.username,
        password: data.password,
      };

      try {
        const res = await UserApi.login(createData);
        dispatch(authLogin(res));
      } catch (err: any) {
        setLoginError("username", {
          message: err.error.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, setLoginError]
  );

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      <Animated.View style={[styles.container, translateStyle]}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg height={height + 100} width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={height + 100} />
            </ClipPath>
            <Image
              clipPath="url(#clipPathId)"
              height={height + 100}
              href={require("../../assets/images/nomi.jpg")}
              preserveAspectRatio="xMidYMid slice"
              width={width}
            />
          </Svg>
          <Animated.View style={animatedOpacity}>
            <LinearGradient
              colors={[
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0.5)",
                "white",
                "white",
              ]}
              style={{
                width: wp(100),
                height: hp(65),
                bottom: 0,
                position: "absolute",
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.8 }}
            />
          </Animated.View>
          <TouchableOpacity onPress={onCloseHandler}>
            <Animated.View
              style={[styles.closeButtonContainer, closeButtonContainerStyle]}
            >
              <AntDesign color={theme.colors.white} name="close" size={24} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={styles.bottomContainer}>
          <Animated.View style={buttonsAnimatedStyle}>
            <View style={styles.contentContainer}>
              <Animated.Text
                entering={FadeInDown.delay(400).springify()}
                style={styles.title}
              >
                🎉 Бидний хайрт Номи 🎂
              </Animated.Text>
              <Animated.Text
                entering={FadeInDown.delay(500).springify()}
                style={styles.punchline}
              >
                Төрсөн өдрийн мэнд хүргье 🎊🎈🎁
              </Animated.Text>
              <Animated.View entering={FadeInDown.delay(600).springify()}>
                <Pressable style={styles.startButton} onPress={loginHandler}>
                  <Text style={styles.startText}>Тусгай эрхээр нэвтрэх</Text>
                </Pressable>
              </Animated.View>
            </View>
          </Animated.View>
          <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
            <LoginForm control={loginControl} />
            <TouchableOpacity
              onPress={handleLogin(onLogin)}
              style={styles.formButton}
            >
              <Text style={styles.formTitle}>Нэвтрэх</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.white,
  },

  bottomContainer: {
    justifyContent: "center",
    height: height / 3,
  },
  formButton: {
    marginHorizontal: 20,
    borderColor: "blue",
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    backgroundColor: theme.colors.black,
    padding: 15,
  },
  formInputContainer: {
    marginBottom: 70,
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    justifyContent: "center",
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: theme.colors.black,
    borderRadius: 20,
    top: -20,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  title: {
    fontSize: hp(5),
    color: theme.colors.neutral(0.9),
    fontWeight: "700",
    textAlign: "center",
  },
  punchline: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center",
  },
  formTitle: {
    fontSize: hp(2.5),
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center",
    color: theme.colors.white,
  },
});
