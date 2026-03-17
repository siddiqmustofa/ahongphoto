import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "./pages/Landing";
import FrameSelect from "./pages/FrameSelect";
import Capture from "./pages/Capture";
import Filter from "./pages/Filter";
import Preview from "./pages/Preview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/frame-select" element={<FrameSelect />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 105, 180, 0.3)',
            borderRadius: '1.5rem',
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#592E39'
          }
        }}
      />
    </div>
  );
}

export default App;