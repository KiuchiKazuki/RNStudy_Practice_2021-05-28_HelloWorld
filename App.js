import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

export default function App() {
  const counting = async () => {
    let key = "count";
    var count = await AsyncStorage.getItem(key);
    var cnt = 0;
    if (count == null) {
      // 値がnullなら初回起動のため、1をセットする。
      cnt = 1;
    } else {
      // countはStringなので、数値型に変換してから加算する
      cnt = Number(count) + 1;
      // count++;でも暗黙的型変換されるので動くが、バグになりやすいのであまり使用し内容が良い
    }

    await AsyncStorage.setItem(key, cnt.toString());
    Alert.alert("Count!", "Button was pressed " + cnt + " times.", null, null);
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
