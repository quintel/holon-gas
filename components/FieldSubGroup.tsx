const FieldSubGroup: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div>
      <h3 className="pb-2 font-medium">{title}</h3>
      <div className="pl-6 mb-3 border-l-2">{children}</div>
    </div>
  );
};

export default FieldSubGroup;
