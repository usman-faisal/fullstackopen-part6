import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient,QueryClientProvider} from "react-query";
import {NotificationContextProvider} from "./NotificationContext";

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationContextProvider>
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>
    </NotificationContextProvider>
)