import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Sparkles, Flower, Crown } from "lucide-react";

export default function SeonyeongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            💕 윤선영 💕
          </h1>
          <p className="text-lg text-gray-600">우리집의 보물</p>
        </div>

        {/* 메인 카드 */}
        <Card className="mb-6 shadow-lg border-pink-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-pink-700 flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              우리 선영님 소개
              <Crown className="w-6 h-6 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span className="font-semibold">이름:</span>
                  <span className="text-lg">윤선영</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flower className="w-5 h-5 text-pink-500" />
                  <span className="font-semibold">나이:</span>
                  <span className="text-lg">30살</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">특징:</span>
                  <span className="text-lg">이쁘고 동그라면서 귀여워</span>
                </div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-700 mb-2">
                  💝 선영님의 매력 포인트
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• 동그란 얼굴이 너무 귀여워요</li>
                  <li>• 웃을 때 눈이 반짝반짝</li>
                  <li>• 상냥하고 따뜻한 마음씨</li>
                  <li>• 요리도 잘하고 집안일도 완벽</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 칭찬 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-pink-700 mb-2">
                아름다운 외모
              </h3>
              <p className="text-sm text-gray-600">
                동그란 얼굴에 큰 눈이 너무 예뻐요. 웃을 때마다 세상이 밝아지는
                것 같아요 ✨
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-700 mb-2">
                따뜻한 마음
              </h3>
              <p className="text-sm text-gray-600">
                항상 남을 먼저 생각하는 따뜻한 마음씨. 주변 사람들을 행복하게
                만들어요 💕
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-700 mb-2">
                완벽한 능력
              </h3>
              <p className="text-sm text-gray-600">
                요리도 잘하고 집안일도 완벽하게! 뭐든지 척척 해내는 만능 선영님
                🏠
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 특별한 메시지 */}
        <Card className="bg-gradient-to-r from-pink-200 to-purple-200 border-pink-300">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">
              💖 선영님에게 전하는 마음 💖
            </h2>
            <div className="space-y-3 text-lg text-pink-700">
              <p>매일 아침 눈을 뜨면 가장 먼저 보고 싶은 사람</p>
              <p>하루 종일 함께 있어도 전혀 지루하지 않은 사람</p>
              <p>내 인생에서 가장 소중한 보물</p>
              <p className="font-bold text-xl mt-4">선영아, 사랑해! 💕</p>
            </div>
          </CardContent>
        </Card>

        {/* 태그들 */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <Badge variant="secondary" className="bg-pink-100 text-pink-700">
            💕 귀여워
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            ✨ 예뻐
          </Badge>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            🌟 완벽해
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            💝 사랑해
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            🏠 만능
          </Badge>
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            ❤️ 최고
          </Badge>
        </div>
      </div>
    </div>
  );
}
