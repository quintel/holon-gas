import HelpButton from "./HelpButton";

const FieldSubGroup: React.FC<{ children: React.ReactNode; helpText?: string; title: string }> = ({
  children,
  helpText,
  title,
}) => {
  return (
    <div className="field-sub-group -mx-6 mt-2 mb-5 border-b-2 border-t-2 border-gray-100 px-6 py-4 first:mt-0 first:border-t-0 first:pt-0 last:mb-0 last:border-b-0 last:pb-0">
      <h3 className="pb-3 text-base font-medium text-gray-800">
        {title}
        {helpText && <HelpButton text={helpText} />}
      </h3>
      {children}
    </div>
  );
};

export default FieldSubGroup;
