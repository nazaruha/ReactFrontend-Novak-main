import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DefaultModalProps {
    title?: string,
    body?: string,
    closeButtonText?: string,
    closeButtonColor?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link",
    applyButtonText?: string,
    applyButtonColor?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link",
    show: boolean,
    handleClose: () => void
    handleApplyEvent: (e: any) => void
}

const DefaultModal: FC<DefaultModalProps> = ({
    title = "Modal title",
    body = "Modal body text does here.",
    closeButtonText = "Close",
    closeButtonColor = "secondary",
    applyButtonText = "Save changes",
    applyButtonColor = "primary",
    show = false,
    handleClose,
    handleApplyEvent
}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant={closeButtonColor} onClick={handleClose}>
                        {closeButtonText}
                    </Button>
                    <Button variant={applyButtonColor} onClick={handleApplyEvent}>
                        {applyButtonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DefaultModal