import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NovelFinder from "./NovelFinder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NovelFinder />
  </StrictMode>
);
