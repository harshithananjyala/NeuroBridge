import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";

export const metadata = {
  title: "NeuroBridge",
  description: "An adaptive neuro-support companion for every kind of mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-sky-50 text-slate-900 min-h-screen">
        <ConditionalHeader>
          <div className="pt-16">{children}</div>
        </ConditionalHeader>
      </body>
    </html>
  );
}

