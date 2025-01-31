import SingleFormHeader from "@/components/SingleFormHeader";
interface SingleFormLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const SingleFormLayout = async ({ children,params }: SingleFormLayoutProps) => {
  const id =  (await params).id

  return (
    <div className="max-w-3xl mx-auto py-10">
      <SingleFormHeader id={id} />
      {children}
    </div>
  );
};

export default SingleFormLayout;
