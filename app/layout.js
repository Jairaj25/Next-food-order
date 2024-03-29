"use client";
import NavbarComponent from "./components/navbar/index.js";
import CustomCursor from "./components/custom_cursor/index.js";
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <CustomCursor />
          <div className="nav-bar">
            <NavbarComponent />
          </div>
          <div id="root">
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
