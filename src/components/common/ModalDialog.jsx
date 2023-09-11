import { Helpers } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';

export const ModalDialog = ({ id, className, handleCloseModal, children }) => {
  const classNames = Helpers.formatClasses(className);

  return (
    <dialog className="modal" id={id}>
      <div className={classNames}>{children}</div>

      {/*<form method="dialog" className="modal-backdrop">*/}
      {/*  <Button size="small" handleClick={handleCloseModal}>*/}
      {/*    Close*/}
      {/*  </Button>*/}
      {/*</form>*/}
    </dialog>
  );
};
