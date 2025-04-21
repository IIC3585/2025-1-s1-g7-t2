import styled from "@emotion/styled";

export const ToggleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  padding: 12px;
  background-color: var(--background-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 12px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px;
    gap: 6px;
  }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: var(--secondary-color);
      &:before {
        transform: translateX(24px);
        background-color: var(--primary-color);
      }
    }
  }
`;

export const Slider = styled.span<{ theme: string }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.theme === "dark" ? "var(--secondary-color)" : "#ccc"};
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: ${(props) =>
      props.theme === "dark" ? "var(--primary-color)" : "white"};
    transition: 0.4s;
    border-radius: 50%;
  }

  svg {
    position: absolute;
    top: 4px;
    width: 16px;
    height: 16px;
    transition: 0.4s;
  }

  .sun-icon {
    left: 4px;
    fill: ${(props) => (props.theme === "dark" ? "#ffffff80" : "#fff")};
  }

  .moon-icon {
    right: 4px;
    fill: ${(props) => (props.theme === "dark" ? "#fff" : "#ffffff80")};
  }
`;

export const CustomThemeButton = styled.button<{ colors: any }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  padding: 0;
  background: var(--secondary-color);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${(props) => props.colors.primary} 0%,
      ${(props) => props.colors.primary} 50%,
      ${(props) => props.colors.secondary} 50%,
      ${(props) => props.colors.secondary} 100%
    );
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;