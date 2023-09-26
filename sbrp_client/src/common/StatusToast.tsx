import moment from "moment";
import React, {Dispatch, useEffect} from "react";
import { ToastContainer, Toast } from "react-bootstrap";

type ActionData = {
  success: boolean,
  time: moment.Moment,
  message: string,
}

type StatusToastProps = {
  showToast: boolean,
  setShowToast: Dispatch<React.SetStateAction<boolean>>,
  now: moment.Moment,
  actionData: ActionData
}

export default function StatusToast ({ showToast, setShowToast, now, actionData }: StatusToastProps) {
  
  // Close toast if new submission
  useEffect(() => {
    const closeSoon = setTimeout(() => {
      setShowToast(false);
    }, 3000)

    return () => {clearTimeout(closeSoon)};
  }, [actionData])

  return (
    <ToastContainer
      className="p-3"
      position="bottom-start"
      style={{ zIndex: 1 }}>
      <Toast
        show={showToast}
        onClose={() => { setShowToast(prev => !prev); }}
        bg={actionData?.success ? "success-subtle" : "danger-subtle"}>
        <Toast.Header>
          <strong className="me-auto">{actionData?.success ? "✅ " : "❌ "}SBRP</strong>
          <small>{actionData?.time.from(now)}</small>
        </Toast.Header>
        <Toast.Body>{actionData?.message || ""}</Toast.Body>
      </Toast>
    </ToastContainer>);
}
