import React, { useCallback, useEffect, useState } from "react";
import { Prefecture } from "../../domain/models/Prefecture";
import { PrefectureController } from "../../interface/PrefectureController";
import Title from "../atoms/Title";
import { CheckBoxGroup } from "../molecules/CheckBoxGroup";

interface PrefectureCheckBoxProps {
  onSelectedPrefecturesChange: (selectedPrefectures: Prefecture[]) => void;
}

interface PrefectureCheckBox {
  prefCode: number;
  prefName: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PrefectureCheckBoxGroup: React.FC<PrefectureCheckBoxProps> = ({
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
    (async () => {
      const controller = new PrefectureController();
      const prefectures = await controller.getPrefectures();

      setPrefectureCheckBoxes(
        prefectures.map((prefecture) => ({
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          label: prefecture.prefName,
          checked: false,
          onChange: () => handleCheckBoxChange(prefecture),
        })),
      );
    })();
  }, [handleCheckBoxChange]);

  return (
    <fieldset>
      <legend>
        <Title text="都道府県" level="h2" />
      </legend>
      <CheckBoxGroup
        items={prefectureCheckBoxes.map(
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars -- CheckBoxGroupの引数のitemsに不要なプロパティを削除している */
          ({ prefCode, prefName, ...item }) => item,
        )}
      />
    </fieldset>
  );
};

export default PrefectureCheckBox;
