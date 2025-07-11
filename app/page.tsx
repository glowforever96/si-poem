import LoginButtons from "@/components/login-buttons";
import AppLogo from "@/components/ui/app-logo";
import StarsBanner from "@/components/ui/stars-banner";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col p-8 relative overflow-hidden">
      <StarsBanner />
      <div className="flex flex-1 flex-col justify-center items-center text-center gap-4">
        <AppLogo size="5xl" />
        <p className="text-white font-light text-lg">
          오늘의 <span className="text-[#6C5CE7] font-medium">특별한 하루</span>
          를 기록하세요.
        </p>
      </div>
      <LoginButtons />
    </div>
  );
}
