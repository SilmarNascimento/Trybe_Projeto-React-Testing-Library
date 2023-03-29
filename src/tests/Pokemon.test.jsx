import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente <Pokemon /> e suas rotas', () => {
  test('Verificar os cards de Pokemon na tela', () => {
    renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const {
        name: pokeName,
        type,
        averageWeight: { value, measurementUnit: unit },
        image: img,
      } = pokemon;

      const checkFavorite = screen.queryByRole('img', {
        name: `${pokeName} is marked as favorite`,
      });
      console.log(checkFavorite);
      const nameElement = screen.getByText(`${pokeName}`);
      const typeElement = screen.getByTestId('pokemon-type');
      const weightElement = screen.getByText(`Average weight: ${value} ${unit}`);
      const imgElement = screen.getByRole('img', {
        name: `${pokeName} sprite`,
      });

      expect(checkFavorite).toBeFalsy();
      expect(checkFavorite).not.toBeInTheDocument();
      expect(nameElement).toBeInTheDocument();
      expect(typeElement).toBeInTheDocument();
      expect(typeElement).toHaveTextContent(`${type}`);
      expect(weightElement).toBeInTheDocument();
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveProperty('src', `${img}`);

      const nextBtn = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(nextBtn).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
  });

  test('Verificar funcionalidade do botão More Details', () => {
    const { history } = renderWithRouter(<App />);

    const linkBtn = screen.getByRole('link', {
      name: /more details/i,
    });
    console.log(linkBtn);
    expect(linkBtn).toBeInTheDocument();

    userEvent.click(linkBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');
    console.log(history);
  });

  test('Verifica se ao favoritar pokemon, um icone estrela é renderizado', () => {
    renderWithRouter(<App />);

    let checkFavorite = screen.queryByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(checkFavorite).toBeFalsy();

    const linkBtn = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkBtn);

    const checkBoxElement = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(checkBoxElement);

    const favoriteMark = screen.getByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(favoriteMark).toBeInTheDocument();

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);

    checkFavorite = screen.getByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(checkFavorite).toBeInTheDocument();
  });
});
