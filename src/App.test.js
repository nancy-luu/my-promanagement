import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import '@testing-library/jest-dom';

jest.mock("./hooks/useAuthContext", () => ({
  __esModule: true,
  useAuthContext: jest.fn(),
}));

// const authMock = jest.fn(() => {
//     return {
//       // Mocked authentication methods based on your application's behavior
//       signInWithEmailAndPassword: jest.fn((email, password) => {
//         // Simulate successful login
//         return Promise.resolve({
//           user: {
//             uid: 'someUid888',
//             displayName: 'testUser',
//           },
//         });
//       }),
//     };
//   });
  

describe('App', () => {
  it('shows home component by default when user is not authenticated', async () => {
    // Mock the useAuthContext to return the necessary values
    const mockUseAuthContext = jest.requireMock('./hooks/useAuthContext');
    mockUseAuthContext.useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<App />);

    await waitFor(() => {
      const homeComponent = screen.getByTestId('home-component');
      expect(homeComponent).toBeInTheDocument();
    });
  });
});

// describe('Main Content', () => {
//     it('shows sidebar and content components when user is authenticated', async () => {
//         const mockUseAuthContext = jest.requireMock('./hooks/useAuthContext');
//         mockUseAuthContext.useAuthContext.mockReturnValue({
//             user: {
//                 uid: 'someUid888',
//                 displayName: 'testUser',
//             },
//             authIsReady: true,
//         });

//         render(<App />)

//         await waitFor(() => {
//             const sidebar = screen.getByTestId('sidebar-component');
//             const content = screen.getByTestId('content-component');
//             expect(sidebar).toBeInTheDocument();
//             expect(content).toBeInTheDocument();
//         })
//     })
// })
