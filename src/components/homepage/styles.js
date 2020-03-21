import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  logo_navbar: { 
    width: "30px",
    height: "30px"
  },
  hover_link: {
    ':hover': {
      color: '#007bff',
    },
  },
  masthead_heading: {
    fontSize: 'calc(24px + 6vmin)'
  }
});
  
export default styles;