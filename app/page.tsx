import LoginButtons from "@/components/login-buttons";
import StarsBanner from "@/components/ui/stars-banner";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col p-8 relative overflow-hidden">
      <StarsBanner />
      <div className="flex flex-1 flex-col justify-center items-center text-center gap-4">
        {/* 로고 */}
        <h1 className="text-white text-5xl font-serif font-semibold tracking-wide select-none">
          <span className="text-white/90">si</span>
          <span className="text-[#6C5CE7]">,</span>
          <span className="text-white/90">poem</span>
        </h1>

        {/* 서브 문구 */}
        <p className="text-white font-light text-lg">
          오늘의 <span className="text-[#6C5CE7] font-medium">특별한 하루</span>
          를 기록하세요.
        </p>
      </div>
      <LoginButtons />
    </div>
  );
}
