import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Unit tests

test('should render same text passed into title prop', () => {
  render(<Header title="header"/>);
  const headingElement = screen.getByText(/header/i);
  expect(headingElement).toBeInTheDocument();
});

test('should have a role of heading', () => {
    render(<Header title="header"/>);
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();
});

// async - await
test('should render same text passed into title prop', async () => {
    render(<Header title="header"/>);
    const headingElement = await screen.findByText(/header/i);
    expect(headingElement).toBeInTheDocument();
});

// not any other text in the element
test('should render same text passed into title prop', () => {
    render(<Header title="header"/>);
    const headingElement = screen.queryByText(/not your header/i);
    expect(headingElement).not.toBeInTheDocument();
});

test('should render one heading element', () => {
    render(<Header title="header"/>);
    const headingElement = screen.queryAllByRole("heading");
    expect(headingElement.length).toBe(1);
});
