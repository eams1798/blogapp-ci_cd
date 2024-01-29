import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Collapse, Container } from "react-bootstrap";

export interface TogglableProps {
  className?: string;
  openButtonLabel: string;
  closeButtonLabel?: string;
  children: JSX.Element[];
  isVisible?: boolean;
}

export type TogglableRef = ({
  toggleVisibility: () => void;
})

const Togglable = forwardRef<TogglableRef, TogglableProps>(
  (
    { className, openButtonLabel, closeButtonLabel, children, isVisible },
    refs,
  ) => {
    const [visible, setVisible] = useState(isVisible || false);

    const [componentOnHide, componentOnShow] = children;

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <Container className={`${className} togglable-container`}>
        <Collapse in={visible}>
          <div id="example-collapse-text">
            {visible ? componentOnShow : componentOnHide}
          </div>
        </Collapse>
        { visible && closeButtonLabel !== "_nobutton" ?
          <Button
            onClick={toggleVisibility}
            aria-controls="example-collapse-text"
            aria-expanded={visible}
          >
            {visible ? (closeButtonLabel ? closeButtonLabel : "Cancel") : openButtonLabel}
          </Button>:
          <></>
        }
        { !visible && openButtonLabel !== "_nobutton" ?
          <Button
            onClick={toggleVisibility}
            aria-controls="example-collapse-text"
            aria-expanded={visible}
          >
            {openButtonLabel}
          </Button>
          : <></>}
      </Container>
    );
  },
);

Togglable.displayName = "Togglable";

export default Togglable;
