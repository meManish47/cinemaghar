import HeaderComponent from "@/components/header/header";
import NavBar from "@/components/header/navbar";
import HomePage from "@/components/homepage/homepage";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <HeaderComponent />
      <NavBar />
      <HomePage />
    </main>
  );
}
