import React from 'react';
import UserForm from './UserForm';
import './Header.css';

const Header = ({ username, online, updateUsername }) => {
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
