export default function InputDescription({
  children,
  isSubGroup,
}: {
  children: React.ReactNode;
  isSubGroup?: boolean;
}) {
  const classes = isSubGroup ? "pb-4 -mt-2" : "pb-1";
  return <p className={`${classes} text-xs leading-relaxed text-gray-500`}>{children}</p>;
}
