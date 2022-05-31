const FieldSubGroup: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="field-sub-group -mx-6 px-6 py-4 mt-2 mb-5 border-b-2 border-t-2 border-gray-100 first:border-t-0 first:mt-0 first:pt-0 last:border-b-0 last:mb-0 last:pb-0">
      <h3 className="pb-3 text-base text-gray-500">{title}</h3>
      {children}
    </div>
  );
};

export default FieldSubGroup;
