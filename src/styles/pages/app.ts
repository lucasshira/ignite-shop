import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
})


export const CartButton = styled('button', {
  background: '$gray800',
  border: 0,
  cursor: 'pointer',
  color: '$gray300',
  lineHeight: 0,
  padding: '0.75rem',
  borderRadius: 6,
  position: 'relative',
  
  'span': {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$green500',
    color: '$white',
    borderRadius: '50%',
    fontSize: '0.875rem',
  }
})
