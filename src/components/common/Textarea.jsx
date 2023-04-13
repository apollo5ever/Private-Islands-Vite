

export const Textarea = ({placeholder, rows= 10, cols = 80, disabled = false, borderColor = 'info'}) => {

  const className=`textarea textarea-${borderColor} w-full max-w-xs text-info`

  return (
    <textarea rows={rows} cols={cols} className={className} placeholder={placeholder} disabled={disabled}></textarea>
  )
}