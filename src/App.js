import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import { Home, TextSentimentAnalaysis } from "./pages";
function App() {
  return (
    <div className="w-full">
      <Header />

      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TextSentimentAnalaysis" element={<TextSentimentAnalaysis />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
