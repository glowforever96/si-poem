import { db } from "@/db";
import { communityTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

// 게시글 생성(POST) API
export async function POST(request: NextRequest) {
  try {
    const { userId, historyId, title, content } = await request.json();

    const result = await db.insert(communityTable).values({
      userId,
      historyId,
      title,
      content,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("커뮤니티 글 생성 오류:", error);
    return NextResponse.json(
      { error: "커뮤니티 글 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
