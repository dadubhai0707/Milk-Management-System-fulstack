import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootNavigator />
        <Toast />
      </Provider>
    </NavigationContainer>
  );
}
