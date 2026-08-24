import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";
import New from "./New";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
