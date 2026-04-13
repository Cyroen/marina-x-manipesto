import ThemeProv from "@/app/comps/themeprov";
import { Fragment } from "react";

export const metadata = {
  title: "marinapesto",
  description: "marinapesto created by me.",
};

export default function RootLayout({ children }) {
  return (
    <Fragment>{children}</Fragment>
  );
}
