import Button from './Button'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <h3>Ocurrió un problema</h3>
      <p>{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  )
}

export default ErrorMessage
