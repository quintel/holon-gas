const FieldSubGroup: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="mb-3 last:mb-0">
      <h3 className="pb-2 font-medium">{title}</h3>
      <div className="pl-6 border-l-2">{children}</div>
    </div>
  );
};

export default FieldSubGroup;
