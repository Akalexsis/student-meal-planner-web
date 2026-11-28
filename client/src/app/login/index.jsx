// Form user must fill out to log into their account
import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { API_URL } from "../../utils/config";

export default function LoginForm() {
    `
        Creates a new session for user if they don't already have an account

        VARIABLES
        username (string) - data entered by the user. Used to validate the user
        error (string) - creates an 
    `
    const [ username, setUsername ] = useState("");
    const [ error, setError ] = useState("");

    const handleLogin = async() => {
        console.log(`EXECUTING LOG IN`);
        try {
            let response = await fetch(`http://localhost:3000/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"name": username})
            });
            let data = await response.json();

            console.log(`Login feth response: ${response}, data: ${JSON.stringify(data)}`);

            // Route to dashboard if login attempt successful
            if (data.status===200) {
                setUsername("");
                setError("");

                router.replace("../(tabs)/Dashboard");
            }
            else {
                setError(data.body);
            }

        } catch (err) {
            console.log(`Error authenticating user: ${err}`);
        }
    }

    return(
        <View className="flex-1 p-6 bg">
            {/* PAGE HEADER */}
            <Text className="text-5xl/[2] text-primaryGreen text-center font-small">
                Student Meal Planner
            </Text>
            <Text className="text-secondaryGreen text-lg text-center">
                Please enter username below to login to app
            </Text>

            {/* LOGIN FORM */}
            <Text className="mb-2 text-red-500 text-lg">
                { error ? error : null } 
            </Text>

            <Text className="mb-2 text-secondaryGreen text-lg">
                Login
            </Text>
            <TextInput 
                className="w-30 p-2 text-md"
                onChangeText={setUsername}
                placeholder="Username"
                value={username}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <Pressable className="m-auto mt-4 mb-2 p-2 w-20 bg/100 hover:bg-primaryOrange hover:font-medium border-2 border-primaryGreen rounded-100"
                onPress={handleLogin}
            >
                <Text className="text-primaryGreen text-lg text-center"> Login </Text>
            </Pressable>

            {/* LINK TO CREATE ACCOUNT */}
            <Text className="mb-2 text-secondaryGreen text-lg text-center">
                Don't have an account? Create one 
                <Link className="text-primaryOrange" href="/preferences"> here </Link>
            </Text>
        </View>
    )
}