
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Dashboard from "./Dashboard"
import Home from "./Home"
import NotFound from "./NotFound"
import Blah from "./Blah"
import Register from "./Register"
import CreateProfile from "./CreateProfile"
import GenerateData from "./GenerateData"
import '@tremor/react/dist/esm/tremor.css';

function App() {
  return (
  <div>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
       </head>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="generate-data" element={<GenerateData />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Blah" element={<Blah />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App