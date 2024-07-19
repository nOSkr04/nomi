import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { memo } from "react";
import { Control, Controller } from "react-hook-form";

export type ILoginForm = {
  username: string;
  password: string;
};

const LoginForm = memo(({ control }: { control: Control<ILoginForm, any> }) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value }, formState: { errors } }) => {
          return (
            <TextInput
              //   error={errors.username?.message}
              onChangeText={(value) => onChange(value.trim())}
              placeholder="Нэвтрэх нэр"
              value={value}
              style={styles.input}
            />
          );
        }}
        rules={{ required: "Заавал оруулна уу" }}
      />
      <View style={styles.h12} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <TextInput
            onChangeText={(value) => onChange(value.trim())}
            placeholder="Нууц үг"
            secureTextEntry
            value={value}
            style={styles.input}
          />
        )}
        rules={{
          required: "Заавал оруулна уу",
          minLength: { value: 4, message: "Та 4-с дээш тэмдэгт оруулна уу" },
        }}
      />
      <View style={styles.h12} />
    </View>
  );
});

LoginForm.displayName = "LoginForm";

export { LoginForm };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  h12: {
    height: 12,
  },
  input: {
    borderWidth: 1,
  },
});
