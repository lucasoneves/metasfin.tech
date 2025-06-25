export type ToastType = "Success" | "Error" | "Warning" | null;

export interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
}

const defaultState: ToastState = {
  isVisible: false,
  message: "",
  type: null,
};

export const useToast = () => {
  const toastState = useState<ToastState>("toastState", () => ({
    ...defaultState,
  }));

  const showToast = (
    message: string,
    type: ToastType = "Success",
    duration: number = 2000
  ) => {
    toastState.value = { isVisible: true, message, type };
    setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    toastState.value = { ...defaultState };
  };

  return {
    toastState,
    showToast,
    hideToast,
  };
};
