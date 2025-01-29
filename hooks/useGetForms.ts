import { FormResponseProps } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
export const useGetForms = () => {
  return useQuery<FormResponseProps[]>({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await fetch("/api/forms");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data = await res.json();
      return data;
    },
  });
};
