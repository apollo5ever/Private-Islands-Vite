import { Helpers } from '@/utils/helpers.js';

export const FlexBoxRow = ({
  className,
  justify = 'center',
  align = 'center',
  gap,
  children,
}) => {
  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);
  const Gap =
    justify === 'stretch' && !gap
      ? 'space-x-2'
      : gap
      ? `space-x-${gap.toString()}`
      : '';
  const flexClasses = 'min-w-full flex flex-col pt-2 md:min-w-full md:flex-row';

  console.log('GAP/gap', Gap, gap);
  const classNames = Helpers.formatClasses(
    className,
    flexClasses,
    Justify,
    Align,
    Gap
  );

  console.log('CLASSES', classNames);

  return <div className={classNames}>{children}</div>;
};
