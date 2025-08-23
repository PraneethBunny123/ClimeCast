import Layout from './components/Layout'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter } from "react-router-dom"

function App() {

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Layout>
                    <h1 className="text-3xl font-bold underline">
                        
                    </h1>
                </Layout>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
