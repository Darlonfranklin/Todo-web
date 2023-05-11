import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, QR, Task } from "../views";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/qrcode" element={<QR />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
