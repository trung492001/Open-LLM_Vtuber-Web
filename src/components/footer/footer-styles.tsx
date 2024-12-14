export const footerStyles = {
  footer: {
    container: {
      position: 'relative',
      width: '100%',
      p: '4',
    },
    actionButton: {
      borderRadius: '12px',
      width: '50px',
      height: '50px',
      minW: '50px',
    },
    input: {
      bg: 'gray.700',
      border: 'none',
      height: '80px',
      borderRadius: '12px',
      fontSize: '18px',
      pl: '12',
      pr: '4',
      color: 'whiteAlpha.900',
      _placeholder: {
        color: 'whiteAlpha.500',
      },
      _focus: {
        border: 'none',
        bg: 'gray.700',
      },
    },
    attachButton: {
      position: 'absolute',
      left: '1',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'whiteAlpha.700',
      zIndex: 2,
      _hover: {
        bg: 'transparent',
        color: 'white',
      },
    },
  },
  aiIndicator: {
    container: {
      bg: '#7C5CFF',
      color: 'white',
      width: '110px',
      height: '30px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    text: {
      fontSize: 'sm',
    },
  },
};
