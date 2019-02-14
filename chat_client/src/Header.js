import React from 'react';
import UserForm from './UserForm';
import './Header.css';

const Header = ({
  username,
  online,
  updateUsername,
  color,
  closeConnection,
}) => {
  return (
    <React.Fragment>
      <header>
        <nav>
          <div className="intro">
            <h1>Awesome Chat</h1>
            <UserForm username={username} updateUsername={updateUsername} />
          </div>
          <div>
            <div className="user-info">
              <h4 style={{ color: color }}>
                Username: {username || 'Anonymous'}
              </h4>
              <h4>Status: {online ? 'online' : 'offline'} </h4>
              {online ? (
                <input type="button" value="close" onClick={closeConnection} />
              ) : null}
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
