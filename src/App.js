import "./App.css";
import SimpleStorage from "./pages/SimpleStorage";
import DefaultLayout from "./layout/default";
import BlankLayout from "./layout/blank";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VerifyCert from "./pages/VerifyCert";
import TranscriptPage from "./pages/TranscriptPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<BlankLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<SimpleStorage />} />
          <Route path="/verify" element={<VerifyCert />} />
        </Route>

        <Route path="/academy" element={<BlankLayout />}>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/academy/test" element={<SimpleStorage />} />
          <Route path="/academy/transcript" element={<TranscriptPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
