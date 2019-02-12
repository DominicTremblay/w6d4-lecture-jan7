import React from 'react';

const Header = ({ username, online }) => {
  return (
    <React.Fragment>
      <header>
        <nav>
          <h1>Awesome Chat</h1>
          <div>
            <div className="user-info">
              <h4>Username: {username || 'Anonymous'}</h4>
              <h4>Status: {online ? 'online' : 'offline'} </h4>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
