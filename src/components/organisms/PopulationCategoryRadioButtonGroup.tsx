import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Reset } from "styled-reset";
import { PopulationCategory } from "../../core/domain/models/Population";
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

const StyledFieldset = styled.fieldset`
  & > * {
    margin: 0.5em;
  }
`;

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
        return updatedItems;
      });
    },
    [],
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

  useEffect(() => {
    const checkedItems = populationCategoryRadioButtons.filter(
      (item) => item.checked,
    );
    if (checkedItems.length > 0)
      onSelectedCategoryChange(checkedItems[0].label);
  }, [onSelectedCategoryChange, populationCategoryRadioButtons]);

  return (
    <StyledFieldset>
      <Reset />
      <legend>
        <Title text="人口カテゴリ" level="h2" />
      </legend>
      <RadioButtonGroup
        items={populationCategoryRadioButtons as RadioButtonProps[]}
      />
    </StyledFieldset>
  );
};

export default PopulationCategoryRadioButtonGroup;
