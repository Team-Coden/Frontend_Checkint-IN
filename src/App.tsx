import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardLayout from "./layout"



function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
         
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App
