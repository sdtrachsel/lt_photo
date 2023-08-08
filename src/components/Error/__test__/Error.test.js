import { render, screen } from '@testing-library/react';
import { Error } from '../Error';

describe('Error component', () => {
  it('renders "Opppsss..."', () => {
    render(<Error />);

    const headingElement = screen.getByText(/Opppsss.../i);
    expect(headingElement).toBeInTheDocument();
  });

  it('renders custom error message when passed as prop', () => {
    const customMessage = 'Custom Error Message';

    render(<Error errorMsg={customMessage} />);

    const errorMessage = screen.getByText(customMessage);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders default error message when no prop provided', () => {
    const defaultMessage = 'We are currently experiencing issues. Please try again later';

    render(<Error />);

    const errorMessage = screen.getByText(defaultMessage);
    expect(errorMessage).toBeInTheDocument();
  });
});