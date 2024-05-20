import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";


const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <React.StrictMode>
                <RouterProvider router={router}/>
            </React.StrictMode>
        </Provider>,
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    );
}
