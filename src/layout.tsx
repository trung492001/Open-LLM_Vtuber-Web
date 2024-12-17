export const layoutStyles = {
  appContainer: {
    width: '100vw',
    height: '100vh',
    bg: 'gray.900',
    color: 'white',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  sidebar: {
    width: '400px',
    height: '100%',
    bg: 'gray.800',
    borderRight: '1px solid',
    borderColor: 'whiteAlpha.200',
    overflow: 'hidden',
    flexShrink: 0,
  },
  mainContent: {
    flex: 1,
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  canvas: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  footer: {
    width: '100%',
    bg: 'gray.800',
    borderTop: '1px solid',
    borderColor: 'whiteAlpha.200',
    position: 'relative', 
  },
};