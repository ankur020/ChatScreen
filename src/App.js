//import ChatScreen from "./components/chatScreen";
import { lazy, Suspense } from "react";
const ChatScreen = lazy(() => import("./components/chatScreen"));

function App() {
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ChatScreen />
      </Suspense>
    </div>
  );
}

export default App;
