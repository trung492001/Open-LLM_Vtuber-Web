export const canvasStyles = {
    background: {
        container: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden"
        },
        image: {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1
        }
    },
    canvas: {
        container: {
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: "1"
        }
    },
    subtitle: {
        container: {
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '15px 30px',
            borderRadius: '12px',
            minWidth: '60%',
            maxWidth: '95%',
            zIndex: 2
        },
        text: {
            color: 'white',
            fontSize: '1.5rem',
            textAlign: 'center',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap'
        }
    }   
}