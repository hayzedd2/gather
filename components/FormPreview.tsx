import { useFormBuilder } from "@/hooks/useFormBuilder";
import EmptyFormPreview from "./EmptyFormPreview";

const FormPreview = () => {
  const fields = useFormBuilder((state) => state.fields);
  if (fields.length === 0) {
    return <EmptyFormPreview />;
  }

  return (
    <div className="basis-[50%]">
      {fields.map((f) => (
        <div key={f.id}>
          <label htmlFor={f.label}>{f.label}</label>
          <input className="bg-red-800" type={f.type} placeholder={f.placeholder} />
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
