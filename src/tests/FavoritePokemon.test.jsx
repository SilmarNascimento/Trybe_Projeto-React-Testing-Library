import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('', () => {
  test('Verifica se não há nenhum Pokémon favorito ao carregar o App', () => {
    render(<FavoritePokemon />);

    const favoriteTitle = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémon/i,
    });
    const emptyFavorite = screen.getByText('No favorite Pokémon found');

    expect(favoriteTitle).toBeInTheDocument();
    expect(emptyFavorite).toBeInTheDocument();
  });

  test('Verifica se apenas os Pokémon favoritos são exibidos na tela', () => {
    const { history } = renderWithRouter(<App />);

    const favoritelink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const checkFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(checkFavorite);
    userEvent.click(favoritelink);

    const favoriteStar = screen.getByRole('img', {
      name: /marked as favorite/i,
    });
    const { location: { pathname } } = history;

    console.log(favoriteStar);
    expect(pathname).toBe('/favorites');
    expect(favoriteStar).toBeInTheDocument();
  });
});
