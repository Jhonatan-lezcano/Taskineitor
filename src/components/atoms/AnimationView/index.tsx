import React, {useEffect, useRef} from 'react';
import Lottie, {AnimationObject} from 'lottie-react-native';

interface Props {
  animation: AnimationObject;
  size: number | string;
}

const AnimationView = ({animation, size}: Props) => {
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <Lottie
      ref={animationRef}
      source={animation}
      style={{width: size}}
      autoPlay
      loop
    />
  );
};

export default AnimationView;
