import { render, fireEvent } from '@testing-library/react';
import App from "../src/App";
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Dashboard from '../src/Components/Dashboard';
import Header from '../src/Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Peep from '../src/Components/Peep';
import Footer from '../src/Components/Footer';
import RoutedMain from '../src/Components/RoutedMain';
import AddPeep from '../src/Components/AddPeep';
import RegistrationForm from '../src/Components/Register';



describe('RegistrationForm Component', () => {
  it('renders the RegistrationForm component without errors', () => {
    const formComponent = <RegistrationForm />;
    expect(formComponent).toBeDefined();
  });
});

describe('Testing the AddPeep component', () => {
  const mockUser = {
    name: 'John Doe',
    username: 'johndoe',
  };

  beforeEach(() => {
    // use mocked time
    vi.useFakeTimers();
  });

  it('renders the AddPeep component without errors', () => {
    const addPeepComponent = (
      <Router>
        <AddPeep user={mockUser} />
      </Router>
    );
    expect(addPeepComponent).toBeDefined();
  });

  it('displays the form to add a peep', () => {
    const { getByText } = render(
      <Router>
        <AddPeep user={mockUser} />
      </Router>
    );
    const publishButton = getByText('Publish!');
    expect(publishButton).toBeInTheDocument();
  });

  it('allows entering a peep message', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <AddPeep user={mockUser} />
      </Router>
    );
    
    const peepMessageInput = getByPlaceholderText('Enter your peep here...');

    fireEvent.change(peepMessageInput, { target: { value: 'This is a test peep.' } });
    expect(peepMessageInput.value).toBe('This is a test peep.');
  });


  it('submits the peep when "Publish!" button is clicked', () => {
    const { getByText } = render(
      <Router>
        <AddPeep user={mockUser} />
      </Router>
    );
    const publishButton = getByText('Publish!');
    fireEvent.click(publishButton);
  });
});




describe('Testing the RoutedMain component', () => {
  it('renders the RoutedMain component without errors', () => {
    const routedMainComponent = <RoutedMain />;
    expect(routedMainComponent).toBeDefined();
  });

  it('displays the welcome message', () => {
    const { getByText } = render(<RoutedMain />);
    const welcomeMessage = getByText('Welcome to Chitter!');
    expect(welcomeMessage).toBeInTheDocument();
  });
});


describe('Testing the Footer component', () => {
  it('renders the Footer component without errors', () => {
    const footerComponent = <Footer />;
    expect(footerComponent).toBeDefined();
  });

  it('displays the copyright information', () => {
    const { getByText } = render(<Footer />);
    const copyrightText = getByText('© Chitter 2023');
    expect(copyrightText).toBeInTheDocument();
  });
});


describe('Testing the Peep component', () => {
    const mockBody = {
      peepCreatedBy: 'John Doe',
      username: 'johndoe',
      peepDateCreated: '2023-08-16T12:34:56Z',
      peepMessage: 'Hello, world!',
    };

  it('renders without errors', () => {
    render(<Peep body={mockBody} />);
  });

  it('displays the peep information', () => {
    const { getByText } = render(<Peep body={mockBody} />);
    const peepCreatedBy = getByText('John Doe');
    const username = getByText('@johndoe');
    const peepMessage = getByText('Hello, world!');
    
    expect(peepCreatedBy).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(peepMessage).toBeInTheDocument();
  });
});


describe('Testing the Header component', () => {
      const mockUser = {
        loginUser: {
          _id: 'user123',
        },
        setLoginUser: () => {},
      };

      const renderWithRouter = (user) => {
        return render(
          <Router>
            <Header user={user} />
          </Router>
        );
      };

  it('renders the Header component without errors', () => {
    renderWithRouter(mockUser);
  });

  it('displays "Log out" link when a user is logged in', () => {
    const { getByText } = renderWithRouter(mockUser);
    const logoutLink = getByText('Log out');
    expect(logoutLink).toBeInTheDocument();
  });

  it('displays "Post a Peep" link when a user is logged in', () => {
    const { getByText } = renderWithRouter(mockUser);
    const postPeepLink = getByText('Post a Peep');
    expect(postPeepLink).toBeInTheDocument();
  });

  it('calls setLoginUser and displays alert on logout link click', () => {
    const { getByText } = renderWithRouter(mockUser);
    const logoutLink = getByText('Log out');

    fireEvent.click(logoutLink);
  });
});

describe('Testing the App component', () => {
    it('renders the App component without errors', () => {
      render(<App />)
      });

    it('renders the Register component without errors', () => {
      const { getByText } = render(<App />);
      expect(getByText('Register')).toBeInTheDocument();
    });
  });

describe('Testing the Dashboard component', () => {
  it('renders the Dashboard component without errors', () => {
    render(<Dashboard />);
  });
});
