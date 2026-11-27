import { Link } from "expo-router";
import { Text, Pressable } from "react-native";
import Screen from "../components/Screen";

export default function Index() {
  ` Allow users to create a new account or login using an existing account `

  // If user is already logged in - route to dashboard, else route to login page 
  const handleLogin = () => {
    console.log(`New login attempt`);
  }

  return (
    <Screen >
      <Text className="text-5xl/[2] text-yellowAccent font-medium tracking-wide">WELCOME</Text>
      <Text className="text-lg text"> Make meal planning fast, affordable, and stress free! 
        Login or click the button below to get started.
      </Text>

      <Pressable className="text-primaryGreen text-md bg" onClick={handleLogin}>
        <Text>
          Login
        </Text>
      </Pressable>

      {/* Directs users to the preferences questionnaire */}
      <Link className="text text-md bg-primaryOrange" href="/"> 
        Get Started 
      </Link>

      
    </Screen>
  );
}