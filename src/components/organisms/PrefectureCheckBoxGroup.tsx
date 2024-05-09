import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Prefecture } from "../../core/domain/models/Prefecture";
import Title from "../atoms/Title";
import { CheckBoxGroup } from "../molecules/CheckBoxGroup";

interface PrefectureCheckBoxProps {
  prefectures: Prefecture[];
  onSelectedPrefecturesChange: (selectedPrefectures: Prefecture[]) => void;
}

interface PrefectureCheckBox {
  prefCode: number;
  prefName: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledFieldset = styled.fieldset`
  & > * {
    margin: 0.5em;
  }
`;

export const PrefectureCheckBoxGroup: React.FC<PrefectureCheckBoxProps> = ({
  prefectures,
  onSelectedPrefecturesChange,
}) => {
  const [prefectureCheckBoxes, setPrefectureCheckBoxes] = useState<
    PrefectureCheckBox[]
  >([]);

  const handleCheckBoxChange = useCallback(
    (prefecture: Prefecture) => {
      setPrefectureCheckBoxes((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.prefCode === prefecture.prefCode
            ? { ...item, checked: !item.checked }
            : item,
        );
        const checkedItems = updatedItems.filter((item) => item.checked);
        onSelectedPrefecturesChange(checkedItems);
        return updatedItems;
      });
    },
    [onSelectedPrefecturesChange],
  );

  useEffect(() => {
    setPrefectureCheckBoxes(
      prefectures.map((prefecture) => ({
        prefCode: prefecture.prefCode,
        prefName: prefecture.prefName,
        label: prefecture.prefName,
        checked: false,
        onChange: () => handleCheckBoxChange(prefecture),
      })),
    );
  }, [handleCheckBoxChange, prefectures]);

  return (
    <StyledFieldset>
      <legend>
        <Title text="都道府県" level="h2" />
      </legend>
      <CheckBoxGroup
        items={prefectureCheckBoxes.map(
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars -- CheckBoxGroupの引数のitemsに不要なプロパティを削除している */
          ({ prefCode, prefName, ...item }) => item,
        )}
      />
    </StyledFieldset>
  );
};

export default PrefectureCheckBox;
