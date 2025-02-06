import { SingleFormAnalyticsProps } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export const useSingleFormAnalytics = (id: string) => {
  return useQuery<SingleFormAnalyticsProps>({
    queryKey: ["form-analytics", id],
    queryFn: async () => {
      const res = await fetch(`/api/forms/${id}/analytics`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    retry: false,
  });
};
