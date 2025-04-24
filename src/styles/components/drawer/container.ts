import { styled } from "../..";

export const DrawerContainer = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '500px',
  height: '100%',
  backgroundColor: '$gray800',
  padding: '2rem',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.5)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0)',
      },
    },
  },
});

export const CloseButton = styled('button', {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
})

export const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 40,
})

export const CartItems = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  marginTop: '2rem',
  overflowY: 'auto',
  maxHeight: 'calc(100% - 10rem)',

  'button': {
    background: '$green500',
    padding: '1.2rem',
    border: 'none',
    borderRadius: '6px',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
});

// export const FinishButton = styled('button', {
//   background: '$green500',
//   padding: '1.2rem',
//   border: 'none',
//   borderRadius: '6px',
//   color: '$white',
//   fontWeight: 'bold',
//   fontSize: '1rem',
//   cursor: 'pointer',
//   marginTop: 'auto',
// })

export const CartItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '1.5rem',
  height: '100%',

  'img': {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  },

  'div': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    gap: "0.5rem",

    p: {
      fontSize: "$md",
      color: "$white",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    strong: {
      fontSize: "$md",
      fontWeight: "bold",
      color: "$white",
    },

    'main': {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '0.5rem',

      'button': {
        color: '$green500',
        cursor: 'pointer',
        background: 'none',
        fontWeight: 'bold',
        border: 'none',
        padding: 0,
      }
    }
  },
})