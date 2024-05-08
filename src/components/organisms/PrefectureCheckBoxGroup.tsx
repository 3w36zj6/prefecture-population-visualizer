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
  const [error, setError] = useState<string | null>(null);

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
      try {
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
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          // eslint-disable-next-line no-console -- 意図的な標準エラー出力
          console.error(e);
        }
      }
    })();
  }, [handleCheckBoxChange]);

  return (
    <fieldset>
      <legend>
        <Title text="都道府県" level="h2" />
      </legend>
      {error && (
        <div>
          <p>都道府県一覧の取得に失敗しました。</p>
          <p>{error}</p>
        </div>
      )}
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
