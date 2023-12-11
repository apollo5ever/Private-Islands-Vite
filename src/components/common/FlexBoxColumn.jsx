import { Helpers } from '@/utils/helpers.js';

export const FlexBoxColumn = ({
  className,
  justify = '',
  align = '',
  gap,
  children,
  maxHeight = '',
  overflow = '',
}) => {
  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);
  const Gap =
    justify === 'stretch' && !gap
      ? 'space-y-2'
      : gap
      ? `space-y-${gap.toString()}`
      : '';

  const classNames = Helpers.formatClasses(
    className,
    'flex flex-col',
    Justify,
    Align,
    Gap
  );

  const styles = {
    maxHeight: maxHeight,
    overflow: overflow,
  };

  return (
    <div className={classNames} style={styles}>
      {children}
    </div>
  );
};
