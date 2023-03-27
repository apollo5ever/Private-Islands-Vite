import {Helpers} from "@/utils/helpers.js";

export const FlexBoxColumn = ({className, justify='center', align='center', children}) => {

  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);

  const classNames = Helpers.formatClasses(className, 'flex flex-col justify-center align-center', Justify, Align)

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}