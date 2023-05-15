import React from "react";

interface PopupProps {
    title: string;
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ title, isOpen, onClose, children }) => {
    const handlePopupClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    return (
        <>
            <div className="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 text-gray-950">
                <div className="relative z-20 px-8 py-6 bg-white rounded-lg shadow-md m-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium">{title}</h2>
                        <button
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 10.585l5.292-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.292 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707A1 1 0 0 1 6.707 5.293L12 10.586z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div onClick={handlePopupClick}>{children}</div>
                </div>
            </div>
        </>
    );
};

export default Popup;
