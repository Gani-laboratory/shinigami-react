import { GlobalProvider } from "./Global/GlobalState";
import Routes from "./Router/Routes";

function App() {
  return (
    <GlobalProvider>
      <Routes/>
    </GlobalProvider>
  );
}

export default App;
