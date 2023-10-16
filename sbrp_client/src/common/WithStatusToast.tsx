import React, { useEffect, useState } from 'react';
import { useActionData } from 'react-router-dom';
import StatusToast from './StatusToast';
import { useNow } from './utilities';



export function WithStatusToast(Element) {
  return (props) => {

    // form action return result
    const formActionData = useActionData();
    // Current time, updated ever 1s
    const now = useNow();

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
      formActionData && setShowToast(true);
    }, [formActionData]);

    return (
      <>
        <StatusToast
          showToast={showToast}
          setShowToast={setShowToast}
          now={now}
          actionData={formActionData} />

        <Element {...props} />
      </>
    );
  };
}
