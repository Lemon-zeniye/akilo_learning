import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
