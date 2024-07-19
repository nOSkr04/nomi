// import {
//   Dimensions,
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { memo, useCallback, useState } from "react";
// import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
// import Animated, {
//   interpolate,
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withSequence,
//   withSpring,
//   withTiming,
// } from "react-native-reanimated";
// import { ILoginForm, LoginForm } from "../../components/auth/login-form";
// import {
//   IRegisterForm,
//   RegisterForm,
// } from "../../components/auth/register-form";
// import { Colors } from "../../constants/colors";
// import { useForm } from "react-hook-form";
// import { usePushNotifications } from "../../hooks/use-notification";
// import { UserApi } from "../../api";
// import { useDispatch } from "react-redux";
// import { authLogin } from "../../store/auth-slice";
// import AntDesign from "@expo/vector-icons/AntDesign";
// const { width, height } = Dimensions.get("window");

// const AuthScreen = memo(() => {
//   const imagePosition = useSharedValue(1);
//   const formButtonScale = useSharedValue(1);
//   const [isLogin, setIsLogin] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { expoPushToken } = usePushNotifications();
//   const {
//     handleSubmit: handleLogin,
//     control: loginControl,
//     formState: { errors: loginErros },
//     setError: setLoginError,
//   } = useForm<ILoginForm>();
//   const {
//     handleSubmit: handleRegister,
//     control: registerControl,
//     formState: { errors: registerErros },
//     setError: setRegisterError,
//   } = useForm<IRegisterForm>();
//   const imageAnimatedStyle = useAnimatedStyle(() => {
//     const interpolation = interpolate(
//       imagePosition.value,
//       [0, 1],
//       [-height / 2, 0]
//     );
//     return {
//       transform: [
//         { translateY: withTiming(interpolation, { duration: 1000 }) },
//       ],
//     };
//   });

//   const buttonsAnimatedStyle = useAnimatedStyle(() => {
//     const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
//     return {
//       opacity: withTiming(imagePosition.value, { duration: 500 }),
//       transform: [
//         { translateY: withTiming(interpolation, { duration: 1000 }) },
//       ],
//     };
//   });

//   const closeButtonContainerStyle = useAnimatedStyle(() => {
//     const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
//     return {
//       opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
//       transform: [
//         { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
//       ],
//     };
//   });

//   const formAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity:
//         imagePosition.value === 0
//           ? withDelay(400, withTiming(1, { duration: 800 }))
//           : withTiming(0, { duration: 300 }),
//     };
//   });

//   const formButtonAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: formButtonScale.value }],
//     };
//   });

//   const loginHandler = useCallback(() => {
//     imagePosition.value = 0;
//     runOnJS(setIsLogin)(true);
//     setIsLogin(true);
//   }, [imagePosition]);

//   const registerHandler = useCallback(() => {
//     imagePosition.value = 0;
//     runOnJS(setIsLogin)(false);
//   }, [imagePosition]);

//   const onLogin = useCallback(
//     async (data: ILoginForm) => {
//       formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
//       setLoading(true);
//       const createData = {
//         username: data.username,
//         password: data.password,
//         expoPushToken: expoPushToken?.data,
//       };

//       try {
//         const res = await UserApi.login(createData);
//         dispatch(authLogin(res));
//       } catch (err: any) {
//         if (err.statusCode === 404) {
//           setLoginError("root", {
//             message: "Серверт алдаа гарсан байна та түр хүлээнэ үү",
//           });
//           return;
//         }
//         setLoginError("username", {
//           message: err.error.message,
//         });
//       } finally {
//         setLoading(false);
//       }
//     },
//     [dispatch, expoPushToken?.data, formButtonScale, setLoginError]
//   );
//   const onRegister = useCallback(
//     async (data: IRegisterForm) => {
//       formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
//       setLoading(true);
//       const createData = {
//         username: data.username,
//         password: data.password,
//         expoPushToken: expoPushToken?.data,
//       };

//       try {
//         const res = await UserApi.register(createData);
//         dispatch(authLogin(res));
//       } catch (err: any) {
//         if (err.statusCode === 404) {
//           setRegisterError("root", {
//             message: "Серверт алдаа гарсан байна та түр хүлээнэ үү",
//           });
//           return;
//         }
//         setRegisterError("username", {
//           message: err.error.message,
//         });
//       } finally {
//         setLoading(false);
//       }
//     },
//     [dispatch, expoPushToken?.data, formButtonScale, setRegisterError]
//   );

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
//         <Svg height={height + 100} width={width}>
//           <ClipPath id="clipPathId">
//             <Ellipse cx={width / 2} rx={height} ry={height + 100} />
//           </ClipPath>
//           <Image
//             clipPath="url(#clipPathId)"
//             height={height + 100}
//             href={require("../../assets/auth.jpg")}
//             preserveAspectRatio="xMidYMid slice"
//             width={width + 100}
//           />
//         </Svg>
//         <TouchableOpacity onPress={() => (imagePosition.value = 1)}>
//           <Animated.View
//             style={[styles.closeButtonContainer, closeButtonContainerStyle]}
//           >
//             <AntDesign color={Colors.black} name="closecircleo" size={24} />
//           </Animated.View>
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={styles.bottomContainer}>
//         <Animated.View style={buttonsAnimatedStyle}>
//           <Pressable onPress={loginHandler} style={styles.button}>
//             <Text style={styles.buttonText}>LOGIN</Text>
//           </Pressable>
//         </Animated.View>
//         <Animated.View style={buttonsAnimatedStyle}>
//           <Pressable onPress={registerHandler} style={styles.button}>
//             <Text style={styles.buttonText}>SIGN</Text>
//           </Pressable>
//         </Animated.View>
//         <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
//           {isLogin ? (
//             <LoginForm control={loginControl} errors={loginErros} />
//           ) : (
//             <RegisterForm control={registerControl} errors={registerErros} />
//           )}
//           <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
//             {isLogin ? (
//               <Pressable disabled={loading} onPress={handleLogin(onLogin)}>
//                 <Text style={styles.buttonText}>LOGIN</Text>
//               </Pressable>
//             ) : (
//               <Pressable
//                 disabled={loading}
//                 onPress={handleRegister(onRegister)}
//               >
//                 <Text style={styles.buttonText}>REGISTER</Text>
//               </Pressable>
//             )}
//           </Animated.View>
//         </Animated.View>
//       </Animated.View>
//     </View>
//   );
// });

// AuthScreen.displayName = "AuthScreen";

// export { AuthScreen };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   button: {
//     backgroundColor: Colors.primary,
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 35,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: Colors.white,
//   },
//   buttonText: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: Colors.white,
//     letterSpacing: 0.5,
//   },
//   bottomContainer: {
//     justifyContent: "center",
//     height: height / 3,
//   },
//   textInput: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: Colors.black20,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 25,
//     paddingLeft: 10,
//   },
//   formButton: {
//     backgroundColor: Colors.primary,
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 35,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: Colors.white,
//     shadowColor: Colors.black,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   formInputContainer: {
//     marginBottom: 70,
//     ...StyleSheet.absoluteFillObject,
//     zIndex: -1,
//     justifyContent: "center",
//   },
//   closeButtonContainer: {
//     height: 40,
//     width: 40,
//     justifyContent: "center",
//     alignSelf: "center",
//     alignItems: "center",
//     shadowColor: Colors.black,
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//     elevation: 1,
//     backgroundColor: Colors.white,
//     borderRadius: 20,
//     top: -20,
//   },
// });
