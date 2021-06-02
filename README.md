# モダン技術開発勉強会（モバイル）　 2021/5/28 演習

## １　プロジェクトを作成する

- プロジェクト名：HelloWorld
- テンプレート：blank

### Answer

以下のコマンド実行後、テンプレートの Blank を選択して Enter を押します。

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
```
