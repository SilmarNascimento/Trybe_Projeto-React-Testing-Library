import React from 'react';
import { render, screen } from '@testing-library/react';
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

  test('Verifica se há dois paragráfos na página com os textos corretos', () => {
    render(<About />);
    const textP11 = 'This application simulates a Pokédex,';
    const textP12 = 'a digital encyclopedia containing all Pokémon';
    const textP21 = 'One can filter Pokémon by type,';
    const textP22 = 'and see more details for each one of them';

    const firstParagraph = screen.getByText(`${textP11} ${textP12}`);
    const secondParagraph = screen.getByText(`${textP21} ${textP22}`);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Verifica se a pagina contém a imagem correta', () => {
    render(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imgElement = screen.getByRole('img', {
      src: `${URL}`,
    });
    console.log(imgElement);
    expect(imgElement).toBeInTheDocument();
  });
});
