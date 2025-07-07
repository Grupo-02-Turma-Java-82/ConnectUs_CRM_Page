import { DynamicIcon, type IconName } from "lucide-react/dynamic";

type Props = {
  icon: IconName;
  iconSize: number;
  title: string;
};

export function EmptyTable({ icon, iconSize, title }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-gray-300 py-8">
      <DynamicIcon name={icon} size={iconSize} />
      <h2 className="text-2xl font-bold text-center">{title}</h2>
    </div>
  );
}
