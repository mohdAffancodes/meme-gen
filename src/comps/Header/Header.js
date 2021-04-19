import "./header.css";
import Logo from "./Trollface.png";

function Header() {
   return (
      <header>
         <img src={Logo} alt="Problem?" />
         <p>Meme Generator</p>
      </header>
   );
}

export default Header;
