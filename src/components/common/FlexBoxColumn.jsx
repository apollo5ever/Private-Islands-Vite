import {Helpers, MOBILE_BREAKPOINT} from "@/utils/helpers.js";
import {useMediaQuery} from "react-responsive";

export const FlexBoxColumn = ({className, justify='center', align='center', children}) => {
  const isMobile = useMediaQuery({query: `(max-width: ${MOBILE_BREAKPOINT})`})
  const Justify = Helpers.twFlexJustify(justify);
  const Align = isMobile ? 'center' : Helpers.twFlexAlignItems(align);

  const classNames = Helpers.formatClasses(className, 'flex flex-col justify-center align-center', Justify, Align)

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}