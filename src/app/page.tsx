import Logo from "components/Logo";
import Header from "components/Header";
import Footer from "components/Footer";
import SearchBar from "components/SearchArea/SearchBar";
import ButtonArea from "components/ButtonArea/ButtonArea";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[100dvh]">
      <Header />
      <main className="flex flex-col items-center justify-center mx-auto p-0 w-full flex-1 overflow-hidden">
        <Logo />
        <div className="flex flex-col items-center justify-center mt-8 w-full max-w-xl">
          <SearchBar />
        </div>
        <ButtonArea />
      </main>
      <Footer />
    </div>
  );
}
