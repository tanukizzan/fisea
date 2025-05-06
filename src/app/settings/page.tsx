import Logo from "components/Logo";
import SaveButton from "components/Settings/SaveButton";
import SearchBar from "components/SearchArea/SearchBar";
import ButtonArea from "components/ButtonArea/ButtonArea";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[100dvh]">
      <main className="flex flex-col items-center justify-center mx-auto p-0 w-full flex-1 overflow-hidden">
        <Logo />
        <div className="flex flex-col items-center justify-center mt-8 w-full max-w-2xl">
          <SearchBar />
        </div>
        <ButtonArea />
      </main>
      <footer className="absolute bottom-0 flex items-center justify-center w-full h-16">
        <SaveButton />
      </footer>
    </div>
  );
}
