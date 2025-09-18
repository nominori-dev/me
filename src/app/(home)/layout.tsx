import {Header} from "@/app/(home)/layout/header";
import {Footer} from "@/app/(home)/layout/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
          <Header/>
          {children}
          <Footer/>
      </div>
  );
}
