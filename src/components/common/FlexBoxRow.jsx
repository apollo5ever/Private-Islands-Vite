import {Helpers, MOBILE_BREAKPOINT} from "@/utils/helpers.js";
import {useMediaQuery} from 'react-responsive';

export const FlexBoxRow = ({className, justify = 'center', align='center', children}) => {
  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);
  const isMobile = useMediaQuery({query: `(max-width: ${MOBILE_BREAKPOINT})`})
  const flexClasses = isMobile ? 'min-w-full flex flex-col pt-2' : 'min-w-full flex flex-row'

  const classNames = Helpers.formatClasses(className, flexClasses, Justify, Align)

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}