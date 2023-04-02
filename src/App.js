import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import { Home, ImageAnalysis, Text } from "./pages";
function App() {
  return (
    <div className="w-full">
      <Header />

      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/ImageAnalysis" element={<ImageAnalysis />} />
          <Route path="/Text" element={<Text />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
