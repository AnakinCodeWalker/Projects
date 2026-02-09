import {Routes, Route } from "react-router-dom";
import Blog from "../pages/Blog"

const Blogroutes = () => {
  return <Routes>
    <Route path="/blog/:id" element={<Blog/>}></Route>
    <Route></Route>
  </Routes>
}

export default Blogroutes