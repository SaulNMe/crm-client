import React from 'react';

const SecondaryBtn = (props) => {
    return ( 
        <button type="button" onClick={props.onClick} disabled={props.isLoading} className={`${props.isLoading ? 'bg-gray-600':'orange-button'} flex justify-center items-center py-4 px-1 text-white uppercase font-bold rounded-full focus:outline-none`}>
            <div className="mx-3">{props.text}</div>
            {props.isLoading && 
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
                .orange-button {
                    //border: 1px solid #FF881B; 
                    color: #FF881B;
                }
                .orange-button:hover {
                    //border: 1px solid #FFA34F; 
                    color: #FFA34F;
                }
            `}
            </style>
        </button>
     );
}

SecondaryBtn.defaultProps = {
    isLoading: false,
    text: 'asd',
    onClick: ()=> {}
}
 
export default SecondaryBtn;