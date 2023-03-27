import {Helpers} from "@/utils/helpers.js";

export const FlexBoxRow = ({className, justify = 'center', align='center', children}) => {

  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);

  const classNames = Helpers.formatClasses(className, 'min-w-full flex flex-row', Justify, Align)

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}