import ThemeProv from "./comps/themeprov";

export const metadata = {
  title: "marinapesto",
  description: "marinapesto created by me.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProv>
        <body>{children}</body>
      </ThemeProv>
    </html>
  );
}
