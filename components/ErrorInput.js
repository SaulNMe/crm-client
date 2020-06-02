import React from 'react';

const ErrorInput = ({text}) => {
    return ( 
        <div className=" mb-8 bg-red-100 text-red-700 px-3 py-2 rounded-lg flex items-center">
            <svg fill="currentColor" className="w-6 h-6 mr-6" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            <p>{text}</p>
        </div>
     );
}
 
export default ErrorInput;