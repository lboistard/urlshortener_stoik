type ErrorToastProps = {
  message: string;
};

function ErrorToast({ message }: ErrorToastProps) {
  return (
    <div className="toast toast-center" role="alert">
      <div className="alert alert-error">{message}</div>
    </div>
  );
}

export { ErrorToast };
