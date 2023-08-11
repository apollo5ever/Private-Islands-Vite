import { Helpers } from '/src/utils/helpers';

const ButtonType = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

const ButtonSize = {
  xsmall: 'py-1 px-2 text-xs',
  small: 'py-2 px-4 text-sm',
  large: 'py-3 px-6 text-lg',
  xs: 'py-1 px-2 text-xs',
  sm: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-lg',
};

export const Button = ({
  size,
  type,
  shadow = true,
  color = 'text-default',
  handleClick,
  children,
}) => {
  const shadowStyle = shadow ? 'drop-shadow-lg' : '';
  const classNames = Helpers.formatClasses(
    'btn',
    ButtonType[type],
    ButtonSize[size],
    shadowStyle,
    color
  );

  return (
    <button className={classNames} onClick={handleClick}>
      {children}
    </button>
  );
};
