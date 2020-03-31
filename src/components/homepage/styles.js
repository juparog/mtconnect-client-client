// Dependencias
import { StyleSheet } from 'aphrodite';

// Estructura con estilos
const styles = StyleSheet.create({
  logoNavbar: {
    width: '30px',
    height: '30px',
  },
  hoverLink: {
    ':hover': {
      color: '#007bff',
    },
  },
  mastheadHeading: {
    fontSize: 'calc(24px + 6vmin)',
  },
});

export default styles;
