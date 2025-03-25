import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { FormPayloadProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormBuilder } from "./useFormBuilder";

export const useCreateform = () => {
  const router = useRouter();
  const resetSettingsFields = useSettingsFormStore(
    (s) => s.resetSettingsFields
  );
  const resetFields = useFormBuilder((s) => s.resetFields);
  return useMutation({
    mutationFn: async (values: FormPayloadProps) => {
      const response = await fetch("/api/forms", {
        method: "POST",
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
    onSuccess: async (data) => {
      toast.success("Your form was published sucessfully:)");
      router.push(`/forms/${data.id}/submissions`);

      // I hope this solves my hook rendering issue
      setTimeout(() => {
        resetFields();
        resetSettingsFields();
      }, 0);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
