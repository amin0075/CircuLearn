import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@src/components/Typography';
import { NextRouter } from 'next/router';

interface INotify {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  router: NextRouter;
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
}

export const notify = ({
  message,
  router,
  type,
  position = 'top-right',
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
}: INotify) => {
  toast(<Typography>{message}</Typography>, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    rtl: router.locale === 'en-US' ? false : true,
    pauseOnFocusLoss,
    draggable,
    pauseOnHover,
    type,
  });
};

export { ToastContainer };
