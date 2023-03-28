import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { About } from '../pages';

describe('Testa o Componente <About />', () => {
  test('Verifica se há um titulo na tela sobre a Pokédex', () => {
    render(<About />);

    const titleElement = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(titleElement).toBeInTheDocument();
  });
  test('Verifica se a pagina contém a imagem correta', () => {
    render(<About />);

    const imgElement = screen.getByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });
    expect(imgElement).toBeInTheDocument();
  });
});
