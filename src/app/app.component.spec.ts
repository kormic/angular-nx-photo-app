import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should render title', async () => {
    await render(AppComponent);

    expect(screen.getByRole('heading')).toHaveTextContent(/Photo Library/);
  });
});
