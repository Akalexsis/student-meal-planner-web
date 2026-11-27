`
    Defines logic and structure for multi-page forms. Specifically built for the User Preferences form.

    Saves user preferences, tracks currently displayed page, and handles navigation between
    pages in the form.
`
import { createContext, useContext, useState } from "react";
import { preferencesMetadata } from "./preferences_metadata";

const FormContext = createContext({});

// initialize object to store user preferences 
// key - question identifier, type - data type question can store
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

export function FormContextProvider({children}) {
    `
        Provider defines all variables and methods that need global access

        preferences (object) - stores all user preferences from preferences form
        currPage - stores current page index of multi-page form, initialize at 0
    `
    const [ preferences, setPreferences ] = useState(initialPreferences);
    const [currPage, setCurrPage] = useState(0);

    // save user preferences based on text input of current question
    const handlePreferences = (id, value) => {
        setPreferences((prev) => ( { ...prev, [id]: value } ))
    }

    const submitPreferences = async() => {
        try {
            let response = await fetch("http://localhost:3000/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(preferences)
            });
            let data = await response.json();

            // Reset form regardless of API result
            console.log(`User to database response: ${JSON.stringify(data)}`);
            setCurrPage(0);
        
            return data;
        } catch (error) {
            console.log(`Error creating new user: ${error}`);
        } 
    }

    return(
        <FormContext.Provider value={{ 
            preferences, 
            currPage, 
            setCurrPage, 
            handlePreferences,
            submitPreferences }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() { 
    const ctx = useContext(FormContext); 

    if (!ctx) throw new Error("FormContext must be inside FormContextProvider");
    else return ctx;
}

