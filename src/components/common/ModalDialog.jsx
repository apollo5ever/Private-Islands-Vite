import { Helpers } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';

export const ModalDialog = ({ id, className, handleCloseModal, children }) => {
  const classNames = Helpers.formatClasses(className);

  return (
    <dialog className="modal" id={id}>
      <form method="dialog" className="modal-box w-11/12 max-w-5xl">
        <div className={classNames}>{children}</div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <Button size="small" handleClick={handleCloseModal}>
          Close
        </Button>
      </form>
    </dialog>
  );
};
