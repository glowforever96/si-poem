import Header from "./header";
import BottomNav from "./bottom-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="pt-[54px] flex-1 w-full h-[100dvh]">
        {children}
      </section>
      <BottomNav />
    </>
  );
}
