import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../components/Home';

describe('Home', () => {
  it('renders the hero section and CTAs', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /welcome to my portfolio/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Jaehyeok \(Eddie\) Lee/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn about me/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view my projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
  });

  it('shows the key overview items', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Database Design/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Data Analysis/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Web Development/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cloud Computing/i).length).toBeGreaterThan(0);
  });
});
