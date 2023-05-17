import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store";
import { Provider } from "react-redux";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TailwindProvider>
          <Navigation />
        </TailwindProvider>
      </NavigationContainer>
    </Provider>
  );
}
