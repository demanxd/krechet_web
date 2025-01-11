import React, { useState, useEffect } from 'react';

const ModalCardView = ({ isOpen, onClose, task }) => {
    const [text, setText] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.stopPropagation();
        setIsEditing(false);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setIsEditing(false);
        setText(task.description);
    };

    return (
        <div className="card-modal-overlay" onClick={handleOverlayClick}>
            <div className="card-modal-content" tabIndex={0} onClick={(e) => e.stopPropagation()}>
                <div className="card-lside">
                    <div className="card-header">
                        <h3>{task.name}</h3>
                    </div>
                    <div className="card-description" onClick={handleEditClick}>
                        {isEditing ? (
                            <div className="card-description-text-change-field">
                                <textarea
                                    className="card-description-fixed-textarea"
                                    value={text}
                                    onChange={handleChange}
                                />
                                <div className="button-container">
                                    <button onClick={(e) => handleSave(e)}>Сохранить</button>
                                    <button onClick={(e) => handleCancel(e)}>Отменить</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ cursor: 'pointer' }}>
                                {text}
                            </div>
                        )}
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