import React from "react";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <div className="nav-mob">
        <div>
            <h1>CryptoCurrencies</h1>
        </div>
        <div className="icon">
            <MenuIcon style={{fontSize:"40px"}}/>
        </div>
    </div>
  );
};

export default Header;
