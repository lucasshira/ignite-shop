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
  gap: '1.5rem',
  marginTop: '2rem',
  overflowY: 'auto',
  maxHeight: 'calc(100% - 4rem)'
})

export const CartItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  width: '100px',

  '& p': {
    fontSize: '1rem',
    color: '$gray100',
  },
})