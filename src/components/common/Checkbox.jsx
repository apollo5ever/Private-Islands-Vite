import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";


export const Checkbox = ({label, borderColor = 'info', disabled = false}) => {

  const className = `checkbox checkbox-${borderColor}`

  return (
    <FlexBoxRow>
      <label className="cursor-pointer label">
        <div className="prose">
          <span className="label-text pr-3">{label}</span>
        </div>
        <input type="checkbox" className={className} disabled={disabled} />
      </label>
    </FlexBoxRow>
  )
}