import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '../pages/homepage';

test('renders learn react link', () => {
    render(<Index />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
