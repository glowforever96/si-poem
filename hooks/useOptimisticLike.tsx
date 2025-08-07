import { useState, useCallback } from "react";

interface UseOptimisticLikeProps {
  commentId: number;
  initialLikes: number;
  initialLiked: boolean;
}

interface OptimisticLikeState {
  likes: number;
  liked: boolean;
}

export default function useOptimisticLike({
  commentId,
  initialLikes,
  initialLiked,
}: UseOptimisticLikeProps) {
  const [state, setState] = useState<OptimisticLikeState>({
    likes: initialLikes,
    liked: initialLiked,
  });

  const toggleLike = useCallback(async () => {
    setState((prev) => ({
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
      liked: !prev.liked,
    }));

    try {
      // 서버에 좋아요 토글 요청
      const response = await fetch("/api/comment/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      if (!response.ok) {
        throw new Error("좋아요 처리에 실패했습니다.");
      }

      setState((prev) => ({
        ...prev,
        isPending: false,
      }));
    } catch (error) {
      console.error("좋아요 토글 오류:", error);

      // 실패 시 이전 상태로 롤백
      setState({
        likes: initialLikes,
        liked: initialLiked,
      });
    }
  }, [commentId, initialLikes, initialLiked]);

  return {
    likes: state.likes,
    liked: state.liked,
    toggleLike,
  };
}
