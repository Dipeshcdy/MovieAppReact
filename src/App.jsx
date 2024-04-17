import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ToastProvider from "./ToastProvider";
import ModifiedRoutes from "./ModifiedRoutes";
function App() {
  
  return (
    <>
    <Router>
      <ToastProvider>
        <ModifiedRoutes />
      </ToastProvider>
    </Router>
    </>
  );
}

export default App;
