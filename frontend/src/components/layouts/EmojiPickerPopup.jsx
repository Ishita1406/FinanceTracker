import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    const handleToggle = () => {
        if (!isOpen) {
            setIsRendered(true);
            setIsOpen(true);
        } else {
            setIsOpen(false);
            setTimeout(() => setIsRendered(false), 300);
        }
    };

    return (
        <div className="mb-2">
            <div 
                className="flex items-center gap-4 cursor-pointer mb-2"
                onClick={handleToggle}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icon" className='w-12 h-12' />
                    ) : (
                        <LuImage />
                    )}
                </div>

                <p className='text-base text-gray-800'>
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {isRendered && (
                <div className={`mb-4 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="relative inline-block">
                        <button 
                            className='w-6 h-6 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer hover:bg-gray-100 transition-colors'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggle();
                            }}
                        > 
                            <LuX className="w-4 h-4" />
                        </button>

                        <EmojiPicker 
                            onEmojiClick={(emoji) => {
                                onSelect(emoji?.imageUrl || "");
                                handleToggle();
                            }}
                            height={400}
                            width={350}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup