import { Helpers } from '@/utils/helpers.js';

export const FlexBoxRow = ({
  className,
  justify = 'center',
  align = 'center',
  gap,
  maxWidth = '',
  overflow = '',
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

  const styles = {
    maxWidth,
    overflow,
  };

  const classNames = Helpers.formatClasses(
    className,
    flexClasses,
    Justify,
    Align,
    Gap
  );

  return (
    <div className={classNames} style={styles}>
      {children}
    </div>
  );
};
