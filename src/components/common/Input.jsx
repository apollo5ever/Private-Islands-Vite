
export const Input = ({type, placeholder, disabled = false, borderColor = 'info'}) => {

  const className=`input input-${borderColor} w-full max-w-xs text-info`

  return (
    <input type={type} className={className} placeholder={placeholder} disabled={disabled} />
  )
}