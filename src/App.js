import "./App.css";
import SimpleStorage from "./pages/SimpleStorage";
import DefaultLayout from "./layout/default";
import BlankLayout from "./layout/blank";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import IssueCert from "./pages/IssueCert";
import TranscriptPage from "./pages/TranscriptPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<BlankLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<SimpleStorage />} />
          <Route path="/issue" element={<IssueCert />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/academy" element={<DefaultLayout />}>
          <Route path="/academy/test" element={<SimpleStorage />} />
          <Route path="/academy/transcript" element={<TranscriptPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
