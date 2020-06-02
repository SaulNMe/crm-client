import css from 'styled-jsx/css';

export default css.global`
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #202020;
    }
    ::-webkit-scrollbar-thumb {
        background: #FF881B;
    }
    * {
        transition: all 1s;
    }

    .Toastify__toast--warning {
        background-color: #f6e05e;
        color: #744210;
        border-radius: 5px;
    }
    .Toastify__toast--success {
        background-color: #68d391;
        color: #276749;
        border-radius: 5px;
    }
    .sk-chase {
        width: 25px;
        height: 25px;
        position: relative;
        animation: sk-chase 2.5s infinite linear both;
    }

    .sk-chase-dot {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0; 
        animation: sk-chase-dot 2.0s infinite ease-in-out both; 
    }

    .sk-chase-dot:before {
        content: '';
        display: block;
        width: 25%;
        height: 25%;
        background-color: #fff;
        border-radius: 100%;
        animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
    }

    .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
    .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
    .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
    .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
    .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
    .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
    .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
    .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
    .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
    .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
    .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
    .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }
    
    .appear-img {
        animation: 1s ease-in-out;
        transition: 3s all;
        position: relative;
        animation: to-top 1s 1 ease-in;
        top: 0px;
        opacity: 1;
    }

    .text-oran {
        color: #FF881B;
    }

    .animate__animated {
        --animate-duration: 1s;
    }

    @keyframes to-top {
        0% {
            top:30px;
            opacity: 0;
        }
        100% {
            top:0px; 
            opacity: 1;
        }
    }

    @keyframes sk-chase {
        100% { transform: rotate(360deg); } 
    }

    @keyframes sk-chase-dot {
        80%, 100% { transform: rotate(360deg); } 
    }

    @keyframes sk-chase-dot-before {
        50% {
            transform: scale(0.4); 
        } 100%, 0% {
            transform: scale(1.0); 
        } 
    }
`;
