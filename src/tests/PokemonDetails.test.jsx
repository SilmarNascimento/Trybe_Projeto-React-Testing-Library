import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Testa o componente <PokemonDetails />', () => {
  test('Verifica todos os headers da página', () => {
    const { history } = renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const {
        id,
        name: pokeName,
        summary,
      } = pokemon;

      const linkDetailsHome = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(linkDetailsHome).toBeInTheDocument();

      act(() => {
        history.push(`/pokemon/${id}`);
      });

      const linkDetailsPoke = screen.queryByRole('link', {
        name: /more details/i,
      });
      expect(linkDetailsPoke).toBeFalsy();

      const nameDetails = screen.getByRole('heading', {
        level: 2,
        name: `${pokeName} Details`,
      });
      const summaryDetails = screen.getByRole('heading', {
        level: 2,
        name: /summary/i,
      });
      const description = screen.getByText(`${summary}`);
      const locationDetails = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${pokeName}`,
      });

      expect(nameDetails).toBeInTheDocument();
      expect(summaryDetails).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(locationDetails).toBeInTheDocument();

      act(() => {
        history.push('/');
      });
    });
  });

  test('Verifica os mapas das localizações dos Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const {
        id,
        name: pokeName,
        foundAt,
      } = pokemon;

      act(() => {
        history.push(`/pokemon/${id}`);
      });

      foundAt.forEach((places, index) => {
        const { location, map } = places;
        const imageElement = screen.getAllByRole('img', {
          name: `${pokeName} location`,
        });
        const locationElement = screen.getByText(`${location}`);

        expect(imageElement[index]).toBeInTheDocument();
        expect(imageElement[index]).toHaveProperty('src', `${map}`);
        expect(locationElement).toBeInTheDocument();
      });
    });
  });

  test('Verifica se é possível favoritar um Pokémon na pagina de Details', () => {
    const { history } = renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const { id } = pokemon;

      act(() => {
        history.push(`/pokemon/${id}`);
      });

      const favoriteCheckBox = screen.getByRole('checkbox', {
        name: /pokémon favoritado/i,
      });
      userEvent.click(favoriteCheckBox);

      const favoriteMark = screen.getByRole('img', {
        name: /is marked as favorite/i,
      });

      expect(favoriteMark).toBeInTheDocument();
      expect(favoriteMark).toHaveProperty('src', 'http://localhost/star-icon.svg');
    });
  });
});
