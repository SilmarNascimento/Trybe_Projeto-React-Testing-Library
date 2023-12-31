import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { NotFound } from '../pages';

describe('', () => {
  test('Verifica se a página contem o heading correto', () => {
    render(<NotFound />);

    const titleElement = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(titleElement).toBeInTheDocument();
  });

  test('Verifica se a imagem é redenrizada corretamente', () => {
    render(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgElement = screen.getAllByRole('img', {
      name: /requested was not found/i,
    });
    expect(imgElement).toHaveLength(1);
    expect(imgElement[0]).toHaveProperty('src', URL);
  });

  test('Vefirica se com uma URL errada o componente Not Found é renderizado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/misericordia');
    });

    const titleElement = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    const imgElement = screen.getByRole('img', {
      name: /page requested was not found/i,
    });

    expect(titleElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });
});
