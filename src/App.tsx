import { Home } from "./pages/Home";
import {NewRoom} from "./pages/NewRoom";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import {AuthContextProvider} from "./context/AuthContext";

function App() {
    return (
      <BrowserRouter>
          <AuthContextProvider>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/rooms/new" element={<NewRoom />}/>
            </Routes>
          </AuthContextProvider>
      </BrowserRouter>
    );
}

export default App;
