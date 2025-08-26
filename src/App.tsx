import Layout from './components/Layout'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import City from './pages/City'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: false,
            refetchOnWindowFocus: false 
        }
    }
})

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Dashboard />}></Route>
                            <Route path='/city/:cityName' element={<City />}></Route>
                        </Routes>
                    </Layout>
                    <Toaster richColors/>
                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
