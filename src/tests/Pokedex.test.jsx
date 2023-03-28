import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { NotFound, Pokedex } from '../pages';
import pokemonList from '../data';

describe('Testa o componente <Pokedex />', () => {
  test('Verifica se na página contem o heading correto', () => {
    renderWithRouter(<App />);

    const titleElement = screen.getAllByRole('heading', {
      level: 2,
      name: /encountered pokémon/i,
    });

    expect(titleElement).toHaveLength(1);
  });

  test('Verifica se o próximo pokémon é listado corretamente', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(firstPokemon).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);

    const secondPokemon = screen.getByRole('img', {
      name: /charmander/i,
    });
    expect(secondPokemon).toBeInTheDocument();
  });

  test('Verifica se ao clicar no último pokémon, o próximo volta ao primeiro', () => {
    renderWithRouter(<App />);
    const arrayId = pokemonList.map((poke) => poke.id);
    console.log(arrayId);

    const firstPokemon = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(firstPokemon).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextBtn).toBeInTheDocument();
    arrayId.forEach(() => {
      userEvent.click(nextBtn);
    });

    const screenPokemon = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(screenPokemon).toBeInTheDocument();
  });

  test('Verifica se é renderizado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getAllByRole('link', {
      name: /details/i,
    });
    const imgRole = screen.getAllByRole('img');

    expect(detailsLink).toHaveLength(1);
    expect(imgRole).toHaveLength(1);
  });

  test('Verifica se os botões de filtro estão renderizados', () => {
    renderWithRouter(<App />);

    const filterAll = screen.getByRole('button', {
      name: /all/i,
      class: /filter-button/i,
    });
    expect(filterAll).toBeInTheDocument();

    const filterBtn = screen.getAllByTestId(/pokemon-type-/i);
    const types = pokemonList.map((poke) => poke.type);
    const nTypes = types.filter((item, index) => types.indexOf(item) === index).length;

    expect(filterBtn.length).toBe(nTypes);
  });
});
