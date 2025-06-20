import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import TabsLayout from "./(tabs)/_layout";

export default function Page() {
  return (
      <>
       <TabsLayout>


       </TabsLayout>
        <HomeScreen navigation={undefined}>
        </HomeScreen>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
