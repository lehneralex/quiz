import {Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons';


export default function TabsLayout(){
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerTitle: "Home",
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
            }}/>
            <Tabs.Screen name="users/[id]" options={{
                headerTitle: "User Page",
                title: "User Page",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" color={color} size={size} />
                ),
            }}/>
        </Tabs>
    )
}