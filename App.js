import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constant/style";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpenseContextProvider from "./store/Expense-context";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({navigation,route})=>({
        headerStyle: { backgroundColor: "#269B9E" },
        headerTintColor: "white",
        headerTitle: "All Expenses",
        tabBarStyle: { backgroundColor: "#269B9E" },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "white",

        headerRight:({tintColor})=>(
          <IconButton icon='add' size={24} color={tintColor} onPress={()=>{
            navigation.navigate('Manage')
          }}/>
        )
      })}
    >
      <Tab.Screen
        options={{
          headerTitle: "Recent Expenses",
          tabBarLabel:'Recent',
          tabBarIcon:({size,color})=>(
        <Ionicons name='hourglass' color={color} size={size} />
          )
        }}
        name="RecentExpenses"
        component={RecentExpenses}
      />
      <Tab.Screen name="AllExpenses" component={AllExpenses}
         options={{
          headerTitle: "All Expenses",
          tabBarLabel:'All Expenses',
          tabBarIcon:({size,color})=>(
        <Ionicons name='calendar' color={color} size={size} />
          )
        }}
         />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:'#269B9E'},
          headerTintColor:'white',

        }}>
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name="ExpensesOverview"
            component={BottomTabs}  
          />
          <Stack.Screen name="Manage" component={ManageExpenses} options={{
            headerBackTitle:'Expenses',title:'Manage Expense',presentation:'modal'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
