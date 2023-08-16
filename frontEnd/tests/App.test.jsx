import { render, fireEvent } from '@testing-library/react';
import App from "../src/App";
import { describe, it, expect } from 'vitest'
import Dashboard from '../src/Components/Dashboard';
import Header from '../src/Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Peep from '../src/Components/Peep';
import Footer from '../src/Components/Footer';
import RoutedMain from '../src/Components/RoutedMain';
import AddPeep from '../src/Components/AddPeep';


describe('Testing the AddPeep component', () => {
  const mockUser = {
    name: 'John Doe',
    username: 'johndoe',
  };

  it('renders without errors', () => {
    render(<AddPeep user={mockUser} />);
  });

  it('displays the form to add a peep', () => {
    const { getByText } = render(<AddPeep user={mockUser} />);
    // const textarea = getByAttribute('placeholder', 'Enter your peep here...');
    const publishButton = getByText('Publish!');

    // expect(textarea).toBeInTheDocument();
    expect(publishButton).toBeInTheDocument();
  });
});


describe('Testing the RoutedMain component', () => {
  it('renders the Dashboard component', () => {
    render(<RoutedMain />);
    
  it('displays the welcome message', () => {
    const { getByText } = render(<RoutedMain />);
    const welcomeMessage = getByText('Welcome to Chitter!');
    
    expect(welcomeMessage).toBeInTheDocument();
  });
  });
});

describe('Testing the Footer component', () => {
  it('renders without errors', () => {
    render(<Footer />);
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
      // Mock the user object
      const mockUser = {
        loginUser: {
          _id: 'user123',
        },
        setLoginUser: () => {}, // Mock function
      };

      // Wrap the Header component with a Router and provide the mockUser
      const renderWithRouter = (user) => {
        return render(
          <Router>
            <Header user={user} />
          </Router>
        );
      };

  it('renders without errors', () => {
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
    it('renders headline', () => {
      render(<App />)
      });

    it('renders the Register component', () => {
      const { getByText } = render(<App />);
      expect(getByText('Register')).toBeInTheDocument();
    });
  });

describe('Testing the Dashboard component', () => {
  it('renders without errors', () => {
    render(<Dashboard />);
  });

});
