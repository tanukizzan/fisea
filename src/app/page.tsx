import Logo from "components/Logo";
import SettingsButton from "components/Settings/SettingsButton";
import SearchBar from "components/SearchArea/SearchBar";
import ButtonArea from "components/ButtonArea/ButtonArea";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-[100dvh]">
      <div className="flex items-end justify-center w-full max-md:h-[calc(100dvh/3.5)] h-[calc(100dvh/3)]">
        <Logo />
      </div>
      <main className="flex flex-col items-center justify-start mx-auto p-0 w-full flex-1 overflow-hidden">
        <div className="flex flex-col items-center justify-center mt-8 w-full max-w-2xl">
          <SearchBar />
        </div>
        <ButtonArea />
      </main>
      <footer className="absolute bottom-0 flex items-center justify-center w-full h-16">
        <SettingsButton />
      </footer>
    </div>
  );
}
