import React, {useEffect, useState} from 'react';
import {ColorpalettesType, dataPalettes} from '../utils/colorPalettes';

interface Props {
  selected: string;
}
const useColorPalettes = ({selected}: Props) => {
  const [color, setColor] = useState(dataPalettes[0].colors[0]);
  const [palette, setPalette] = useState<ColorpalettesType>({
    id: 0,
    namePalette: '',
    colors: [],
  });

  const changeColor = (color: string) => setColor(color);

  useEffect(() => {
    dataPalettes.forEach(
      palette => palette.namePalette === selected && setPalette(palette),
    );
    setColor(palette.colors[0]);
  }, [selected, palette]);

  return {palette, changeColor, color};
};

export default useColorPalettes;
