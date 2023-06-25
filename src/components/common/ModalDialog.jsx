import { Helpers } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';
import { WALLET_INPUT_RENDERS } from '@/utils/helpers.js';

export const ModalDialog = ({ id, className, handleCloseModal, children }) => {
  const classNames = Helpers.formatClasses(className);

  console.log('CLASSNAMES FOR MODAL = ', classNames, id);

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
