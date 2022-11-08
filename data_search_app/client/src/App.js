import "./App.css";
import { DataContextProvider } from "./store/DataContextProvider";
import TotalPage from "./pages/TotalPage";

function App() {
  return (
    <DataContextProvider>
      <TotalPage />
    </DataContextProvider>
  );
}

export default App;
