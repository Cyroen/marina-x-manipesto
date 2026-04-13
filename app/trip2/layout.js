import ThemeProv from "@/app/comps/themeprov";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "marinapesto",
  description: "marinapesto created by me.",
};

export default function RootLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
  );
}
