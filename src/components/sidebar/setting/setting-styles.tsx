export const settingStyles = {
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
  },
  general: {
    container: {
      align: 'stretch',
      gap: 6,
      p: 4,
    },
    field: {
      root: {
        css: { '--field-label-width': '120px' },
      },
      label: {
        fontSize: 'sm',
        color: 'whiteAlpha.800',
      },
    },
    select: {
      root: {
        width: '100%',
      },
      trigger: {
        width: '100%',
        bg: 'whiteAlpha.100',
        borderColor: 'whiteAlpha.200',
        _hover: {
          bg: 'whiteAlpha.200',
        },
      },
    },
    input: {
      bg: 'whiteAlpha.100',
      borderColor: 'whiteAlpha.200',
      _hover: {
        bg: 'whiteAlpha.200',
      },
    },
    buttonGroup: {
      gap: 4,
      width: '100%',
    },
    button: {
      width: '50%',
      variant: 'outline' as const,
      bg: 'blue',
      color: 'white',
      _hover: {
        bg: 'whiteAlpha.300'
      },
    },
  },
  live2d: {
    container: {
      gap: 8,
      maxW: 'sm',
      css: { '--field-label-width': '120px' },
    },
    field: {
      orientation: 'horizontal' as const,
    },
    fieldLabel: {
      fontSize: 'sm',
      color: 'whiteAlpha.800',
    },
    input: {
      flex: 1,
      bg: 'whiteAlpha.100',
      borderColor: 'whiteAlpha.200',
      _hover: {
        bg: 'whiteAlpha.200',
      },
    },
    numberInput: {
      root: {
        pattern: '[0-9-]*([.][0-9]*)?',
        inputMode: 'decimal' as const,
      },
      input: {
        bg: 'whiteAlpha.100',
        borderColor: 'whiteAlpha.200',
        _hover: {
          bg: 'whiteAlpha.200',
        },
      },
    },
    emotionMap: {
      title: {
        fontWeight: 'bold',
        mb: 4,
      },
      entry: {
        mb: 2,
      },
      button: {
        colorPalette: 'blue',
        mt: 2,
      },
      deleteButton: {
        colorPalette: 'red',
      },
    },
  },
}; 