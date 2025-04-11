import MainLayout from "./components/layout/MainLayout";
import Protectedroute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <Protectedroute role={undefined}>
      <MainLayout />
    </Protectedroute>
  );
}

export default App;
