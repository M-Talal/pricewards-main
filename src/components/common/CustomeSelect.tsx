import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type item = {
  title: string;
  value: string;
};

export function CustomSelect({
  item,
  placeholder,
  className,
  name,
  defaultValue,
}: {
  item: item[];
  placeholder: string;
  name: string;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <Select name={name} defaultValue={defaultValue} required>
      <SelectTrigger className={cn("max-w-md", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {item.map((item) => (
          <SelectItem key={item.title} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
