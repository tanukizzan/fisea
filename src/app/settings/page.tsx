import Logo from "components/Logo";
import SaveButton from "components/Settings/SaveButton";
import SearchBar from "components/SearchArea/SearchBar";
import ButtonSettingsArea from "components/Settings/ButtonSettingsArea";
import SelectorSettingsArea from "components/Settings/SelectorSettingsArea";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定",
};

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-[100dvh]">
      <header className="fixed top-0 flex items-center justify-center w-full my-4 z-99">
        <SaveButton />
      </header>
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
      <footer className="flex items-center justify-center w-full mt-6 mb-10">
        <SaveButton />
      </footer>
    </div>
  );
}
