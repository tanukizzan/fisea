import Logo from "components/Logo";
import SaveButton from "components/Settings/SaveButton";
import SearchBar from "components/SearchArea/SearchBar";
import ButtonSettingsArea from "components/Settings/ButtonSettingsArea";
import SelectorSettingsArea from "components/Settings/SelectorSettingsArea";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-[100dvh]">
      <div className="flex items-end justify-center w-full max-md:h-[calc(100dvh/3.5)] h-[calc(100dvh/3)]">
        <Logo />
      </div>
      <main className="flex flex-col items-center justify-center mx-auto p-0 w-full flex-1 overflow-hidden">
        <div className="flex flex-col items-center justify-center mt-8 w-full max-w-2xl">
          <SearchBar />
        </div>
        <ButtonSettingsArea />
        <SelectorSettingsArea />
      </main>
      <footer className="flex items-center justify-center w-full h-20">
        <SaveButton />
      </footer>
    </div>
  );
}
