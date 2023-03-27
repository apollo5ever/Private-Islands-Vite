import {Helpers} from '/src/utils/helpers'

const ButtonType = {
  primary: "bg-sky-900 hover:bg-cyan-600 text-slate-300 font-bold rounded-lg",
  secondary: "bg-cyan-400 hover:bg-cyan-700 text-sky-900 hover:text-slate-300 font-bold rounded-lg",
  basic: "bg-white hover:bg-gray-700 text-gray-700 font-bold rounded-lg",
  danger: "bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg",
  transparent: "bg-transparent hover:text-gray-700 font-bold text-2xl"
};

const ButtonSize = {
  xs: "py-1 px-2 text-xs",
  sm: "py-2 px-4 text-sm",
  lg: "py-3 px-6 text-lg"
}

export const Button = ({size, type, handleClick, children}) => {

  const classNames = Helpers.formatClasses(ButtonType[type], ButtonSize[size])

  return (
    <button className={classNames} onClick={handleClick}>{children}</button>
  )
}
