import { SettingsProvider } from "contexts/SettingsContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SettingsProvider>
      <div>{children}</div>
    </SettingsProvider>
  )
}