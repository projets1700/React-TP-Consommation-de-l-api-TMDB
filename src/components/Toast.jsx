import { createPortal } from 'react-dom'

function Toast({ message }) {
  if (!message) return null
  return createPortal(
    <div className="toast">
      <span className="toast-star">★</span>
      {message}
    </div>,
    document.body
  )
}

export default Toast
