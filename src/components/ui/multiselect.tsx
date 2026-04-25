import { ChevronDown } from "lucide-react";

const MultiSelectDropdown = ({
  value,
  setSelectedItem,
  options,
}: {
  value: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
  options: { label: string; value: string }[];
}) => {
  const isSelected = (key: string) => {
    return value?.includes(key);
  };

  const handleOnChange = (selected: string) => {
    setSelectedItem((prev) =>
      prev?.includes(selected)
        ? prev?.filter((p) => p !== selected)
        : [...prev, selected]
    );
  };
  return (
    <div className="w-full max-w-md relative">
      <div className="flex items-center justify-between border border-slate-700 rounded-md h-10">
        <span className="text-white">{value.join(", ")}</span>
        <ChevronDown />
      </div>
      <div className="absolute z-40 bg-slate-700 w-full text-white p-3 h-[150px] overflow-y-auto">
        {options?.map((option) => {
          const isOptionSelected = isSelected(option?.value);
          return (
            <p
              className={`hover:bg-gray-600 px-3 py-2 rounded-md ${
                isOptionSelected ? "bg-gray-700" : ""
              }`}
              onClick={() => handleOnChange(option?.value)}
            >
              {option?.label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
