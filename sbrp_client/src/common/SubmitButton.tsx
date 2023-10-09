import React from "react";
import { Button, Spinner } from "react-bootstrap";

export function SubmitButton(props) {
    return (
        <Button
            variant="primary"
            type="submit"
            disabled={props.isLoading}
        >
            {props.isLoading
                ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                : props.text}

        </Button>);
}