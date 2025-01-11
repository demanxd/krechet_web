import React, { useEffect } from 'react';

const ModalCardView = ({ isOpen, onClose, task }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="card-modal-overlay" onClick={handleOverlayClick}>
            <div className="card-modal-content" tabIndex={0} onClick={(e) => e.stopPropagation()}>
                <div className="card-lside">
                    <div className="card-header">
                        <h3>{task.name}</h3>
                    </div>
                    <div className="card-description">
                        <p>fdsafasfadsffd</p>
                    </div>
                    <div className="card-comments">
                        <p>fdsafasfadsffd</p>
                        <p>fdsafasfadsffd2222</p>
                    </div>
                </div>
                <div className="card-rside">
                    <h3>rside</h3>
                </div>
            </div>
        </div>
    );
};

export default ModalCardView