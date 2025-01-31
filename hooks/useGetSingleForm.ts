import { useQuery } from "@tanstack/react-query";
import { FormResponseProps } from "@/types/type";
export const useGetSingleForm = (id: string) => {
  return useQuery<FormResponseProps>({
    queryKey: ["forms", id],
    queryFn: async () => {
      const res = await fetch(`/api/forms/${id}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    retry: false,
  });
};
