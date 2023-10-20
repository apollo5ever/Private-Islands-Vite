import { Helpers } from '/src/utils/helpers';
import { useTheme } from '@/components/hooks/useTheme.js';

const ButtonColor = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  ghost: 'btn-ghost',
  link: 'btn-link',
  black: 'btn-black',
  white: 'btn-white',
  themeNeutral: 'btn-black',
};

const ButtonSize = {
  xsmall: 'py-1 px-2 text-xs',
  small: 'py-2 px-4 text-sm',
  large: 'py-3 px-6 text-lg',
  xs: 'py-1 px-2 text-xs',
  sm: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-lg',
  responsive: 'btn btn-xs sm:btn-sm md:btn-md lg:btn-lg',
  wide: 'btn-wide',
};

const ButtonVariant = {
  outline: 'btn-outline',
  circle: 'btn-circle',
};

export const Button = ({
  size,
  btnColor,
  variant,
  shadow = true,
  color = 'text-default',
  handleClick,
  children,
  className,
}) => {
  const { theme } = useTheme();
  const themeNeutralClass = theme === 'dark' ? 'btn-black' : 'btn-white';
  const shadowStyle = shadow ? 'drop-shadow-lg' : '';
  const classNames = Helpers.formatClasses(
    'btn',
    ButtonVariant[variant],
    btnColor === 'themeNeutral' ? themeNeutralClass : ButtonColor[btnColor],
    ButtonSize[size],
    shadowStyle,
    color,
    className
  );

  return (
    <button className={classNames} onClick={handleClick}>
      {children}
    </button>
  );
};
