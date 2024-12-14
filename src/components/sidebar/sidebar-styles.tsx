export const sidebarStyles = {
    sidebar: {
        container: {
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflow: 'hidden'
        },
        header: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 2
        },
    },

    settingUI: {
        
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
            maxWidth: '150px'
        }
    },

    chatBubble: {
        container: {
            display: 'flex',
            position: 'relative',
            _hover: {
                bg: 'whiteAlpha.50'
            }
        },
        message: {
            maxW: '90%',
            bg: 'transparent',
            p: 2
        },
        text: {
            fontSize: 'xs',
            color: 'whiteAlpha.900'
        },
        dot: {
            position: 'absolute',
            w: '2',
            h: '2',
            borderRadius: 'full',
            bg: 'white',
            top: '2'
        }
    },

    chatHistoryPanel: {
        container: {
            flex: 1,
            overflow: 'hidden',
            px: 4
        },
        title: {
            mb: 4,
            fontSize: 'lg',
            fontWeight: 'semibold',
            color: 'white'
        },
        messageList: {
            p: 4,
            border: '1px solid',
            borderColor: 'whiteAlpha.200',
            borderRadius: 'lg',
            bg: 'blackAlpha.400',
            maxH: '200px',
            overflowY: 'auto',
            css: {
                '&::-webkit-scrollbar': {
                    width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                    bg: 'whiteAlpha.100',
                    borderRadius: 'full'
                },
                '&::-webkit-scrollbar-thumb': {
                    bg: 'whiteAlpha.300',
                    borderRadius: 'full'
                }
            }
        }
    },

    systemLogPanel: {
        container: {
            width: '100%',
            overflow: 'hidden',
            px: 4,
            minH: '200px',
            marginTop: 'auto'
        },
        title: {
            mb: 4,
            fontSize: 'lg',
            fontWeight: 'semibold',
            color: 'white'
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
                    width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                    bg: 'whiteAlpha.100',
                    borderRadius: 'full'
                },
                '&::-webkit-scrollbar-thumb': {
                    bg: 'whiteAlpha.300',
                    borderRadius: 'full'
                }
            }
        },
        entry: {
            p: 2,
            borderRadius: 'md',
            _hover: {
                bg: 'whiteAlpha.50'
            }
        }
    }
};