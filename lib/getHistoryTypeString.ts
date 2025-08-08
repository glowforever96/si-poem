import { POST_TYPE_LABEL } from "@/types/histories";

export const getHistoryTypeString = (type: number) => {
  return POST_TYPE_LABEL[type];
};
