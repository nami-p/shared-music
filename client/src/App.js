
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './main/store'; // Correct import statement
import RouterComponents from './main/RouterComponent';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  mode: 'light',
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      'cursive',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#72e2e3',
    },
    secondary: {
      main: '#ffaeb5',
    },
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <RouterComponents/>  
          </ThemeProvider>
        </PersistGate>
      </Provider>
  </> );
}

export default App;
