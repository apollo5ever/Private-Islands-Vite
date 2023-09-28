import { Helpers } from '@/utils/helpers.js';
import { Button } from '@/components/common/Button.jsx';

export const ModalDialog = ({ id, className, handleCloseModal, children }) => {
  const classNames = Helpers.formatClasses(className);

  return (
    <dialog className="modal" id={id}>
      <div className="modal-box w-1/2 max-w-5xl bg-secondary">
        <div className={classNames}>{children}</div>
      </div>
    </dialog>
  );
};
