import { createBrowserRouter, redirect } from "react-router";
import { Root } from "./Root";
import { Welcome } from "./pages/Welcome";
import { Home } from "./pages/Home";
import { Check } from "./pages/Check";
import { Community } from "./pages/Community";
import { Family } from "./pages/Family";
import { ElderHome } from "./pages/ElderHome";
import { EmergencySupport } from "./pages/EmergencySupport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Welcome },
      { path: "home", Component: Home },
      { path: "check", Component: Check },
      { path: "community", Component: Community },
      { path: "emergency-support", Component: EmergencySupport },
      {
        path: "alerts",
        loader: () => redirect("/community")
      },
      { path: "family", Component: Family },
      { path: "elder-home", Component: ElderHome },
    ],
  },
]);