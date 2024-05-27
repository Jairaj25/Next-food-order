"use client";
import NavbarComponent from "./components/navbar/index.js";
import CustomCursor from "./components/custom_cursor/index.js";
import { Provider } from 'react-redux';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import store from './redux/store/store.js';
import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <Provider store={store}>
      <html lang="en">
        <UserProvider>
          <body>
            <div className="nav-bar">
              <NavbarComponent />
            </div>
            <div id="root">
            <CustomCursor />
              {children}
            </div>
          </body>
        </UserProvider>
      </html>
    </Provider>
  );
}
