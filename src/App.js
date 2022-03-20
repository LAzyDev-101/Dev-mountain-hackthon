import "./App.css";
import SimpleStorage from "./pages/academy/SimpleStorage";
import DefaultLayout from "./layout/default";
import BlankLayout from "./layout/blank";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import IssueCert from "./pages/IssueCert";
import TranscriptPage from "./pages/academy/TranscriptPage";
import AdminProfileInfoPage from "./pages/academy/info";
import AdminTranscriptHistoryPage from "./pages/academy/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<BlankLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<SimpleStorage />} />
          <Route path="/issue" element={<IssueCert />} />
        </Route>

        <Route path="/academy" element={<DefaultLayout />}>
          <Route path="/academy/test" element={<SimpleStorage />} />
          <Route path="/academy/transcript" element={<TranscriptPage />} />
          <Route path="/academy/info" element={<AdminProfileInfoPage />} />
          <Route
            path="/academy/history"
            element={<AdminTranscriptHistoryPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
