"use client";

import { useState, useRef } from "react";
import { Button } from "./button";
import { Camera, X } from "lucide-react";
import { updateUserImage } from "@/data/updateUserImage";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";

interface ProfileImageUploadProps {
  currentImageUrl?: string | null;
  onUploadSuccess?: (url: string) => void;
}

export default function ProfileImageUpload({
  currentImageUrl,
}: ProfileImageUploadProps) {
  const { data: session, update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setHasSelectedFile(true);
  };

  const handleCancelSelection = () => {
    setHasSelectedFile(false);
    setPreviewUrl(currentImageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      toast.error("업로드할 이미지를 선택해주세요.");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadResponse.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }
      const { url } = await uploadResponse.json();
      const updateResult = await updateUserImage(url);
      if (!updateResult.ok) {
        throw new Error(
          updateResult.error || "프로필 이미지 업데이트에 실패했습니다."
        );
      }
      setPreviewUrl(url);
      await update({ ...session, user: { ...session?.user, image: url } });
      setHasSelectedFile(false);
      toast.success("프로필 이미지가 업데이트되었습니다!");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      toast.error("이미지 업로드에 실패했습니다.");
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
          {previewUrl ? (
            <Image
              priority
              src={previewUrl}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Camera size={32} />
            </div>
          )}
        </div>
        {hasSelectedFile && (
          <button
            onClick={handleCancelSelection}
            className="absolute -top-3 -right-3 bg-gray-400 text-white rounded-full p-1 hover:bg-gray-500 transition-colors cursor-pointer"
            title="선택 취소"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full max-w-xs">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-fit"
        >
          이미지 업로드
        </Button>
        {hasSelectedFile && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-fit"
          >
            {isUploading ? "저장 중..." : "저장"}
          </Button>
        )}
      </div>
      <p className="text-xs text-gray-500 text-center">
        최대 5MB 이미지 파일만 가능합니다.
      </p>
    </div>
  );
}
