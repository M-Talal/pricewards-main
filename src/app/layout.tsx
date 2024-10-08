import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display_SC,
  Roboto_Serif,
  Roboto,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/form/auth-wrapper";
import { getSession } from "@/server-actions/auth";
import { ModalProvider } from "@/context/auth-modal-wrapper";
import { FilterProvider } from "@/context/filter-wrapper";
import { FabricProvider } from "@/context/fabric-wrapper";
import { NextUi } from "@/providers/NextUi";

const inter = Inter({ subsets: ["latin"] });
const playfairDisplaySC = Playfair_Display_SC({
  subsets: ["latin"],
  weight: "400",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  console.log(session);
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthWrapper value={session}>
          <NextUi>
            <ModalProvider>
              <FilterProvider>
                <FabricProvider>{children}</FabricProvider>
              </FilterProvider>
            </ModalProvider>
            <Toaster />
          </NextUi>
        </AuthWrapper>
      </body>
    </html>
  );
}
