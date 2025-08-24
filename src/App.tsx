import Layout from './components/Layout'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import City from './pages/City'

function App() {

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Layout>
                    <Routes>
                        <Route path='/' element={<Dashboard />}></Route>
                        <Route path='/city/:cityName' element={<City />}></Route>
                    </Routes>
                </Layout>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
