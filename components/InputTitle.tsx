import HelpButton from "./HelpButton";

interface Props {
  children: React.ReactNode;
  helpText?: string;
}

export default function InputTitle({ children, helpText }: Props): React.ReactElement {
  return (
    <p className="relative flex items-center pb-1">
      <span>{children}</span>
      <span className="mx-3 block h-px flex-grow bg-gray-200 last:mr-0" />
      {helpText && <HelpButton text={helpText} />}
    </p>
  );
}
