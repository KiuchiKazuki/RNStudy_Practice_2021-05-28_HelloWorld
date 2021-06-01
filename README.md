#

## １　プロジェクトを作成する

- プロジェクト名：HelloWorld
- テンプレート：blank

### Answer

以下のコマンド実行後、テンプレートの Blank を洗濯して Enter を推します。

```
$ expo init HelloWorld
```

### EX

以下のコマンドでプロジェクトのテンプレート選択をスキップして一発作成することもできます。

```
$ expo init HelloWorld -t blank
```

逆に、以下のコマンドならプロジェクト名の決定も対話形式で出来ます。

```
$ expo init
```

## ２　実機　 or 　エミュレータで作成したアプリを起動する

### Answer

割愛

## ３　 DB（AsyncStorage）を追加する

- ボタンを追加する
- AsyncStorage をインストールする
- 実装する
  - AsyncStorage を使ってボタンを押した回数をカウントする
  - 押した回数をダイアログに表示する

### Answer

- ボタンの追加

App.js に以下を追加

```jsx
<Button title="Count up on Press" onPress={() => counting()} />
```

counting()はこのあと作る Function 名です。

- AsyncStorage をインストールする

ターミナルで以下を実行します。

```
$ npm install @react-native-async-storage/async-storage
```

- 実装する

App.js に以下を実装

```js
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
```
