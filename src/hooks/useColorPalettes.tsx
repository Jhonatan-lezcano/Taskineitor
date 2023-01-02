import React, {useEffect, useState} from 'react';
import {ColorpalettesType, dataPalettes} from '../utils/colorPalettes';

const useColorPalettes = () => {
  const [selected, setSelected] = useState(dataPalettes[0].namePalette);
  const [color, setColor] = useState(dataPalettes[0].colors[0]);
  const [palette, setPalette] = useState<ColorpalettesType>({
    id: 0,
    namePalette: '',
    colors: [],
  });

  const changeSelected = (value: string) => setSelected(value);

  const changeColor = (color: string) => setColor(color);

  useEffect(() => {
    dataPalettes.forEach(
      palette => palette.namePalette === selected && setPalette(palette),
    );
    setColor(palette.colors[0]);
  }, [selected, palette]);

  return {selected, changeSelected, palette, changeColor, color};
};

export default useColorPalettes;
