export const layoutStyles = {
  appContainer: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    bg: 'black',
    color: 'white',
    overflow: 'hidden',
  },

  sidebar: {
    width: '26%',
    height: '100%',
    borderRight: '1px solid',
    borderColor: 'whiteAlpha.300',
    px: 0,
    py: 2,
  },

  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },

  canvas: {
    flex: 1,
    position: 'relative',
    pointerEvents: 'auto',
  },

  subtitle: {
    position: 'absolute',
    bottom: '120px',
    left: '50%',
    transform: 'translateX(-50%)',
    bg: 'blackAlpha.700',
    p: 4,
    borderRadius: 'md',
    maxWidth: '80%',
  },

  footer: {
    height: '100px',
    p: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
};
