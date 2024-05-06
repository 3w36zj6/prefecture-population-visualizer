import { RadioButton, RadioButtonProps } from "../atoms/RadioButton";

export interface RadioButtonGroupProps {
  items: RadioButtonProps[];
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  items,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {items.map((item, index) => (
        <RadioButton
          key={index}
          label={item.label}
          name={item.name}
          value={item.value}
          checked={item.checked}
          onChange={item.onChange}
        />
      ))}
    </div>
  );
};
