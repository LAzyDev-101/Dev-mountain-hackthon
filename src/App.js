import "./App.css";
import SimpleStorage from "./pages/SimpleStorage";
import DefaultLayout from "./layout/default";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TranscriptPage from "./pages/TranscriptPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<SimpleStorage />} />
          <Route path="/transcript" element={<TranscriptPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
