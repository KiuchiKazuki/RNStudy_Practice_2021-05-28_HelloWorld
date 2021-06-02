import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

export default function App() {
  const counting = async () => {
    try {
      const key = "count";
      let tmp = await AsyncStorage.getItem(key);
      let count = 0;
      if (tmp == null) {
        // 値がnullなら初回起動のため、1をセットする。
        count = 1;
      } else {
        // countはStringなので、数値型に変換してから加算する
        count = Number(tmp) + 1;
        // count++;でも暗黙的型変換されるので動くが、バグになりやすいのであまり使用しないほうが良い
      }

      await AsyncStorage.setItem(key, count.toString());
      Alert.alert("Count!", `Button was pressed ${count} times.`, null, null);
      // 文字列内で変数の値を使いたい時には「テンプレートリテラル」を使うとみやすいコードになる。
      // テンプレートリレラルは「`(バッククォート)」で文字をくくり、その中で「${変数}」と記述すると、この部分が自動的に変数に置換される。
      // 「'（シングルクォート）」ではないので注意。
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", `An error occurred.\n${error}`, null, null);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Count up on Press" onPress={() => counting()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
