import React from 'react';

const PrimaryBtn = ({isLoading, text, type, onTap}) => {
    return (
        <button 
            type={type} 
            disabled={isLoading} 
            onClick={onTap}
            className={`${isLoading ? 'bg-disabled-orange':'orange-button'} flex justify-center items-center py-4 px-6 focus:outline-none text-white uppercase font-bold rounded-full`}
        >
            <div className="mx-3">{text}</div>
            {isLoading && 
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
            }
            <style jsx>{`
                .bg-disabled-orange {
                    background-color: #FFA34F;
                }
                .orange-button {
                    background: #FF881B;
                }
                .orange-button:hover {
                    background: #FFA34F;
                }
            `}
            </style>
        </button>
    );
}

PrimaryBtn.defaultProps = {
    type: "submit",
    isLoading: false,
    text: "...",
    onTap: () => {},
}
 
export default PrimaryBtn;