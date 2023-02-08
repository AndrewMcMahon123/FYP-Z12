
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Dashboard from "./Dashboard"
import Home from "./Home"
import NotFound from "./NotFound"
import Blah from "./Blah"
import '@tremor/react/dist/esm/tremor.css';

function App() {
  return (
    <BrowserRouter>
    <div>
        <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
       </head>
       <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Z12 Performance</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/dashboard">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Search</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/auth">Log in</a>
            </li>
          </ul>
            </div>
          </div>
      </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Blah" element={<Blah />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App