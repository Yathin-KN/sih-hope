
import "./../globals.css";
import clsx from "clsx";
import Provider from "../utils/Provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("flex")}>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
