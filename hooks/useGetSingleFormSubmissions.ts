import { useQuery } from "@tanstack/react-query";
import { GetFormSubmissionProps } from "@/types/type";

export const useGetSingleFormSubmissions = (id: string) => {
  return useQuery<GetFormSubmissionProps>({
    queryKey: ["form-submissions", id],
    queryFn: async () => {
      const res = await fetch(`/api/forms/${id}/submissions`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    retry: false,
  });
};
