import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App />', () => {
  test('Verifica se o componente possui um link Home para navegação', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    console.log(history);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Verifica se o componente possui um link About para navegação', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('Verifica se o componente possui um link Favotite Pokémon para navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
