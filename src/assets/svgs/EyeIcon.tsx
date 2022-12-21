import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

interface Props {
  fillColor: string;
}

const EyeIcon = ({fillColor}: Props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 64 64" fill="none">
      <Path
        d="M61 34.73C57.0061 29.8591 52.1859 25.7294 46.76 22.53L49.16 20.12C49.2755 20.0044 49.3672 19.8672 49.4297 19.7163C49.4923 19.5653 49.5245 19.4034 49.5245 19.24C49.5245 19.0766 49.4923 18.9147 49.4297 18.7637C49.3672 18.6128 49.2755 18.4756 49.16 18.36C49.0444 18.2444 48.9072 18.1528 48.7562 18.0902C48.6052 18.0277 48.4434 17.9955 48.28 17.9955C48.1165 17.9955 47.9547 18.0277 47.8037 18.0902C47.6527 18.1528 47.5155 18.2444 47.4 18.36L44.4 21.31C40.9128 19.5783 37.1156 18.5584 33.23 18.31V12.5C33.23 12.1685 33.0983 11.8505 32.8638 11.6161C32.6294 11.3817 32.3115 11.25 31.98 11.25C31.6484 11.25 31.3305 11.3817 31.0961 11.6161C30.8617 11.8505 30.73 12.1685 30.73 12.5V18.29C26.8444 18.5384 23.0472 19.5583 19.56 21.29L16.56 18.34C16.3266 18.1066 16.01 17.9755 15.68 17.9755C15.3499 17.9755 15.0334 18.1066 14.8 18.34C14.5666 18.5734 14.4355 18.8899 14.4355 19.22C14.4355 19.5501 14.5666 19.8666 14.8 20.1L17.2 22.51C11.7867 25.7192 6.98012 29.8555 2.99996 34.73C2.82467 34.9484 2.72913 35.22 2.72913 35.5C2.72913 35.78 2.82467 36.0516 2.99996 36.27C3.51996 36.94 16.09 52.75 32 52.75C47.91 52.75 60.46 36.94 61 36.27C61.1753 36.0516 61.2708 35.78 61.2708 35.5C61.2708 35.22 61.1753 34.9484 61 34.73V34.73ZM32 50.25C19.25 50.25 8.33996 38.64 5.62996 35.5C8.33996 32.36 19.25 20.75 32 20.75C44.75 20.75 55.66 32.36 58.37 35.5C55.66 38.64 44.75 50.25 32 50.25Z"
        fill={fillColor}
      />
      <Path
        d="M32 26.25C30.1705 26.25 28.3821 26.7925 26.861 27.8089C25.3398 28.8253 24.1542 30.27 23.4541 31.9602C22.754 33.6504 22.5708 35.5103 22.9277 37.3046C23.2847 39.0989 24.1656 40.7471 25.4593 42.0407C26.7529 43.3344 28.4011 44.2154 30.1954 44.5723C31.9897 44.9292 33.8496 44.746 35.5398 44.0459C37.23 43.3458 38.6747 42.1602 39.6911 40.639C40.7075 39.1179 41.25 37.3295 41.25 35.5C41.2474 33.0476 40.272 30.6963 38.5378 28.9622C36.8037 27.228 34.4524 26.2526 32 26.25V26.25ZM32 42.25C30.665 42.25 29.3599 41.8541 28.2499 41.1124C27.1399 40.3707 26.2747 39.3165 25.7638 38.0831C25.2529 36.8497 25.1193 35.4925 25.3797 34.1831C25.6402 32.8738 26.283 31.671 27.227 30.727C28.171 29.783 29.3738 29.1401 30.6831 28.8797C31.9925 28.6192 33.3497 28.7529 34.5831 29.2638C35.8165 29.7747 36.8707 30.6399 37.6124 31.7499C38.3541 32.8599 38.75 34.165 38.75 35.5C38.7474 37.2894 38.0354 39.0048 36.7701 40.2701C35.5048 41.5353 33.7894 42.2474 32 42.25Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default EyeIcon;

EyeIcon.defaultProps = {
  fillColor: 'black',
};
