export const sidebarStyles = {
  sidebar: {
    container: (isCollapsed: boolean) => ({
      position: 'absolute' as const,
      left: 0,
      top: 0,
      height: '100%',
      width: '350px',
      bg: 'gray.900',
      transform: isCollapsed ? 'translateX(calc(-100% + 24px))' : 'translateX(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
      overflow: isCollapsed ? 'visible' : 'hidden',
    }),
    toggleButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '24px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'whiteAlpha.700',
      _hover: { color: 'white' },
      bg: 'transparent',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    content: {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
      overflow: 'hidden',
    },
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      p: 2,
    },
  },

  settingUI: {
    container: {
      width: '100%',
      height: '100%',
      p: 4,
      gap: 4,
      position: 'relative',
      overflowY: 'auto',
      css: {
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          bg: 'whiteAlpha.100',
          borderRadius: 'full',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: 'whiteAlpha.300',
          borderRadius: 'full',
        },
      },
    },
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    title: {
      ml: 4,
      fontSize: 'lg',
      fontWeight: 'bold',
    },
    tabs: {
      root: {
        width: '100%',
        variant: 'line' as const,
        colorPalette: 'gray',
      },
      content: {
      },
      trigger: {
        color: 'whiteAlpha.600',
        _selected: {
          color: 'white',
        },
        _hover: {
          color: 'white',
        }
      }
    },
    footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2,
      mt: 'auto',
      pt: 4,
      borderTop: '1px solid',
      borderColor: 'whiteAlpha.200',
    }
  },

  configCard: {
    container: {
      flex: 1,
      px: 3,
      py: 0,
      bg: 'whiteAlpha.100',
      borderRadius: '12px',
      border: '1px solid',
      borderColor: 'whiteAlpha.200',
      maxWidth: '150px',
    },
  },

  chatBubble: {
    container: {
      display: 'flex',
      position: 'relative',
      _hover: {
        bg: 'whiteAlpha.50',
      },
    },
    message: {
      maxW: '90%',
      bg: 'transparent',
      p: 2,
    },
    text: {
      fontSize: 'xs',
      color: 'whiteAlpha.900',
    },
    dot: {
      position: 'absolute',
      w: '2',
      h: '2',
      borderRadius: 'full',
      bg: 'white',
      top: '2',
    },
  },

  chatHistoryPanel: {
    container: {
      flex: 1,
      overflow: 'hidden',
      px: 4,
    },
    title: {
      mb: 4,
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'white',
    },
    messageList: {
      p: 4,
      border: '1px solid',
      borderColor: 'whiteAlpha.200',
      borderRadius: 'lg',
      bg: 'blackAlpha.400',
      width: '97%',
      height: '400px',
      overflowY: 'auto',
      css: {
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          bg: 'whiteAlpha.100',
          borderRadius: 'full',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: 'whiteAlpha.300',
          borderRadius: 'full',
        },
      },
    },
  },

  systemLogPanel: {
    container: {
      width: '100%',
      overflow: 'hidden',
      px: 4,
      minH: '200px',
      marginTop: 'auto',
    },
    title: {
      mb: 4,
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'white',
    },
    logList: {
      p: 4,
      border: '1px solid',
      borderColor: 'whiteAlpha.200',
      borderRadius: 'lg',
      bg: 'blackAlpha.400',
      height: '200px',
      overflowY: 'auto',
      fontFamily: 'mono',
      css: {
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          bg: 'whiteAlpha.100',
          borderRadius: 'full',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: 'whiteAlpha.300',
          borderRadius: 'full',
        },
      },
    },
    entry: {
      p: 2,
      borderRadius: 'md',
      _hover: {
        bg: 'whiteAlpha.50',
      },
    },
  },

  cameraPanel: {
    container: {
      width: '97%',
      overflow: 'hidden',
      px: 4,
      minH: '240px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 4,
    },
    title: {
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'white',
    },
    videoContainer: {
      width: '100%',
      height: '240px',
      border: '1px solid',
      borderColor: 'whiteAlpha.200',
      borderRadius: 'lg',
      bg: 'blackAlpha.400',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transition: 'all 0.2s',
      '@keyframes pulse': {
        '0%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
        '100%': {
          opacity: 1,
        },
      },
    },
  },

  historyPopover: {
    content: {
      bg: 'gray.900',
    },
    historyButton: {
      w: '100%',
      mb: 2,
      color: 'white',
      fontFamily: 'mono',
      textAlign: 'left',
      fontSize: 'xs',
      height: '32px',
      px: 3,
      _hover: { bg: 'whiteAlpha.200' },
      _active: { bg: 'whiteAlpha.300' },
      transition: 'all 0.2s ease-in-out',
    },
    deleteButton: {
      variant: 'ghost' as const,
      colorScheme: 'red' as const,
      size: 'sm' as const,
      mt: '-1.5',
    },
    historyButtonSelected: {
      bg: 'whiteAlpha.300',
      borderColor: 'blue.500',
      borderWidth: '2px'
    },
    historyButtonNormal: {
      bg: 'whiteAlpha.50',
      borderColor: 'whiteAlpha.200',
      borderWidth: '1px'
    }
  },
};
