import { RouterContainer } from "./routes";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return <>
    <GoogleOAuthProvider clientId="628302636406-ukqj6crho2f4n5he3jvemqvqbll80che.apps.googleusercontent.com">
      <RouterContainer />
    </GoogleOAuthProvider>
  </>;
}

export default App;
