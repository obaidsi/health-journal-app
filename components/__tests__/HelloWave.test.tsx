import Animated from 'react-native-reanimated';
import { render } from '@testing-library/react-native';

import { HelloWave } from '../HelloWave';

describe('HelloWave', () => {
  it('renders animated view', () => {
    const { UNSAFE_getByType } = render(<HelloWave />);
    expect(UNSAFE_getByType(Animated.View)).toBeTruthy();
  });
});
