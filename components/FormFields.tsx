import { useFormBuilder } from "@/hooks/useFormBuilder";
import { useSelectedFieldStore } from "@/store/useSelectedFieldStore";
import { FilePenLine, Trash } from "lucide-react";

const FormFields = () => {
  const fields = useFormBuilder((state) => state.fields);
  const setSelectedField = useSelectedFieldStore(
    (state) => state.setSelectedField
  );
  return (
    <div className="p-4 rounded-lg light-shadow flex-col flex gap-2">
      <h3 className="text-[1.3rem] font-[500]">Form fields</h3>
      <div className="flex flex-col gap-4">
        {fields.map((f) => {
          return (
            <div
              key={f.id}
              className="flex w-full gap-2 items-center justify-between"
            >
              <p className="font-[500]">{f.label}</p>
              <div className="flex gap-2">
                <button onClick={() => setSelectedField(f.id)}>
                  <FilePenLine size={18} />
                </button>
                <button>
                  <Trash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormFields;
