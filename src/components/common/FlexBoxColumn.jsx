import { Helpers } from '@/utils/helpers.js';

export const FlexBoxColumn = ({
  className,
  justify = '',
  align = '',
  children,
  maxHeight = '',
  overflow = '',
}) => {
  console.log('JUSTIFY FOR COL', justify);
  const Justify = Helpers.twFlexJustify(justify);
  const Align = Helpers.twFlexAlignItems(align);

  const classNames = Helpers.formatClasses(
    className,
    'flex flex-col',
    Justify,
    Align
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
