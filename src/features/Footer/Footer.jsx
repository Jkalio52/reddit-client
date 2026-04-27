// src/features/Footer/Footer.jsx
import './Footer.css';
import { FaReddit } from 'react-icons/fa';


const Footer = () => {

   return (
      <footer>
         <div className="logo">
            <FaReddit className="logo-icon" />
            <p>
               Reddit<span> Viewer</span> | <span>Jay Kalio 2021-26 | </span><a className="apiLink" href="https://www.reddit.com/dev/api/" target="_blank" rel="noreferrer">Reddit API</a>
            </p>
         </div>
      </footer>
   );
};

/*
<div className="footer-container">
   <div className="footer-description">
      <p>© 2021 Amir Fakhrullah | <a className="apiLink" href="https://www.reddit.com/dev/api/" target="_blank" rel="noreferrer">Reddit API</a></p>
   </div>
</div>*/

export default Footer;