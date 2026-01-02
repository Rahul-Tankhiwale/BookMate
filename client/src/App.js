import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookDetailsPage from "./pages/BookDetailsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/AddBookPage";
import UploadBookPage from "./pages/UploadBookPage";
import SearchBooksPage from "./pages/SearchBooksPage";
import BookRequestListPage from "./pages/BookRequestListPage";
function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/books/add" element={<AddBookPage />} />
            <Route path="/books/upload" element={<UploadBookPage />} />
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
            <Route path="/my-requests" element={<BookRequestListPage />} />
            

            <Route path="*" element={<div style={{ padding: "2rem" }}>404 - Page not found</div>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
