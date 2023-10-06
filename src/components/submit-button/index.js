import React, { Component } from 'react';


class SubmitButton extends Component {
    render() {
        return (
            <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading
              ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true" />
              : "Submit"
            }
          </Button>
        );
    }
}

export default SubmitButton;