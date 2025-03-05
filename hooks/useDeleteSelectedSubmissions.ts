import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSelectedSubmissions = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: string[]) => {
      const response = await fetch(`/api/forms/${id}/submissions`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["form-submissions", id],
      });
    },
  });
};
