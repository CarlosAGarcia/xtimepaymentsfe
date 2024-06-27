import { css, keyframes } from '@emotion/react';


export const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const animationStyles = {
  slideOut: css`
    animation: ${slideOut} 0.5s forwards;
  `,
  slideIn: css`
    animation: ${slideIn} 0.5s forwards;
  `,
};