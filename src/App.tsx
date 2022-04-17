import { Home } from "./pages/Home";
import {NewRoom} from "./pages/NewRoom";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import {AuthContextProvider} from "./context/AuthContext";
import {Room} from "./pages/Room";

function App() {
    return (
      <BrowserRouter>
          <AuthContextProvider>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/rooms/new" element={<NewRoom />}/>
                <Route path="/rooms/:id" element={<Room />}/>
            </Routes>
          </AuthContextProvider>
      </BrowserRouter>
    );
}

export default App;
