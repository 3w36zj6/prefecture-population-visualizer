import { CheckBox, CheckBoxProps } from "../atoms/CheckBox";

export interface CheckBoxGroupProps {
  items: CheckBoxProps[];
}

export const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ items }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {items.map((item, index) => (
        <CheckBox
          key={index}
          label={item.label}
          checked={item.checked}
          onChange={item.onChange}
        />
      ))}
    </div>
  );
};
