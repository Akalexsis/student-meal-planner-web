import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import Screen from "../components/Screen";
import { API_URL } from "../utils/config";

export default function Index() {
  ` Allow users to create a new account or login using an existing account `

  // Check if a session is already active for the current user. Grant access if session active 
  const isSessionActive = async () => {
    `
      Check if there is an active session for the user. If the session is active
      (status == 202), route to dashboard. Else, require user to login or make a new account
    `
    try {
      let response = await fetch(API_URL);
      let data = await response.json();

      console.log(`Response: ${response}, data: ${JSON.stringify(data)}`);

      // Route user to dashboard ONLY IF session is active
      if (data.status == 202) {
        router.replace("../(tabs)/Dashboard");
      }
      return;

    } catch (err) {
      console.log(`There was an error authenticating your session: ${err}`);
    }
  }

  useEffect(() => { isSessionActive() }, []);

  return (
    <Screen >
      <Text className="text-5xl/[2] text-yellowAccent font-medium tracking-wide">WELCOME</Text>
      <Text className="text-xl text"> Make meal planning fast, affordable, and stress free! 
        Login or click the button below to get started.
      </Text>

      <Link className="m-auto pl-4 pr-4 pt-2 pb-2 mb-2 
                        text-primaryGreen text-lg text-center
                        bg/100 hover:bg border-2 border-primaryGreen rounded-100"
                        href="/login">
          Login
      </Link>

      {/* Directs users to the preferences questionnaire */}
      <Link className="m-auto pl-4 pr-4 pt-2 pb-2 text text-lg bg-primaryOrange" href="/"> 
        Get Started 
      </Link>
      
    </Screen>
  );
}