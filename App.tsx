import RootNavigator from "./src/app/RootNavigator";
import AuthenticationProvider from "./src/context/authenticationContext";

export default function App() {
  return (
    <AuthenticationProvider>
      <RootNavigator />
    </AuthenticationProvider>
  );
}
