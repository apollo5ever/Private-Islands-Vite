import { Helpers } from '@/utils/helpers.js';

export const FlexBoxRow = ({
  className,
  justify = 'center',
  align = 'center',
  children,
}) => {
  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);
  const flexClasses = 'min-w-full flex flex-col pt-2 md:min-w-full md:flex-row';

  const classNames = Helpers.formatClasses(
    className,
    flexClasses,
    Justify,
    Align
  );

  return <div className={classNames}>{children}</div>;
};
