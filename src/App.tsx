import MainLayout from "./components/layout/MainLayout";
import Protectedroute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <Protectedroute>
      <MainLayout />
    </Protectedroute>
  );
}

export default App;
