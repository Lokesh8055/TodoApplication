import { ThemeProvider } from '../../context/ThemeContext';
import { TodoProvider } from '../../context/TodoContext';
import Container from '../Container';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Container />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
