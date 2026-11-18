import { Stack } from "expo-router";
import "../global.css"
import { FormContextProvider } from "../utils/FormContext";

export default function RootLayout() {
  return( 
    <FormContextProvider>
      <Stack />
    </FormContextProvider>
  );
}
