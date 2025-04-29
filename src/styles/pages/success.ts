import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    marginTop: '2rem',
    lineHeight: 1.4,
    textAlign: 'center',
    maxWidth: 560,
  },

  a: {
    display: 'block',
    color: '$green500',
    textDecoration: 'none',
    fontSize: '$lg',
    fontWeight: 'bold',
    marginTop: '5rem',

    '&:hover': {
      color: '$green300',
    }
  },

  'div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',
    gap: '1rem',

    'main': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 160,
      borderRadius: '50%',
      height: 120,
      background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

      img: {
        objectFit: 'cover',
      },
    }
  },
});

// export const ImageContainer = styled('div', {

// });