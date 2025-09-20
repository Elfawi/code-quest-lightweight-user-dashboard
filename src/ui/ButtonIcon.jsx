import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
    transition: all 0.2s;
    @media (max-width: 800px) {
      width: 3.4rem;
      height: 3.4rem;
    }
  }
`;

export default ButtonIcon;
