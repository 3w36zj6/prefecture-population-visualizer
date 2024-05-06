import React, { useCallback, useEffect, useState } from "react";
import { PopulationCategory } from "../../domain/models/Population";
import { RadioButtonProps } from "../atoms/RadioButton";
import Title from "../atoms/Title";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";

export interface PopulationCategoryRadioButtonProps {
  onSelectedCategoryChange: (selectedCategory: PopulationCategory) => void;
}

type PopulationRadioButtonProps = Partial<RadioButtonProps> & {
  label: PopulationCategory;
};

const categories: PopulationCategory[] = [
  "総人口",
  "年少人口",
  "生産年齢人口",
  "老年人口",
];

export const PopulationCategoryRadioButtonGroup: React.FC<
  PopulationCategoryRadioButtonProps
> = ({ onSelectedCategoryChange }) => {
  const [populationCategoryRadioButtons, setPopulationCategoryRadioButtons] =
    useState<PopulationRadioButtonProps[]>([]);
  const handleRadioButtonChange = useCallback(
    (category: PopulationCategory) => {
      setPopulationCategoryRadioButtons((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.label === category
            ? { ...item, checked: !item.checked }
            : { ...item, checked: false },
        );
        const checkedItems = updatedItems.filter((item) => item.checked);
        onSelectedCategoryChange(checkedItems[0].label);
        return updatedItems;
      });
    },
    [onSelectedCategoryChange],
  );

  useEffect(() => {
    setPopulationCategoryRadioButtons(
      categories.map((category, index) => ({
        label: category,
        name: "populationCategory",
        value: category,
        checked: index === 0,
        onChange: () => handleRadioButtonChange(category),
      })),
    );
  }, [handleRadioButtonChange]);

  return (
    <fieldset>
      <legend>
        <Title text="人口カテゴリ" level="h2" />
      </legend>
      <RadioButtonGroup
        items={populationCategoryRadioButtons as RadioButtonProps[]}
      />
    </fieldset>
  );
};

export default PopulationCategoryRadioButtonGroup;
