import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Render initial score', () => {
    render(<App />);
    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
