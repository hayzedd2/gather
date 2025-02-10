import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { FormPayloadProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormBuilder } from "./useFormBuilder";

export const useCreateform = () => {
  const router = useRouter();
  const { saveFields, resetSettingsFields } = useSettingsFormStore();
  const { setFields, resetFields } = useFormBuilder();
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
      resetFields()
      resetSettingsFields()

    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
