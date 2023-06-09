import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import PasswordCard from './Components/PasswordCard';

function App() {

  const [username, setUsername] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [password, setPassword] = useState("");
  const [allPasswordList, setAllPasswordList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(allPasswordList);

  useEffect(() => (
    setSearchResults(allPasswordList)
  ), [allPasswordList]);

  const [error, setError] = useState(false);

  const handleOnChangeWebSite = (event) => {
    setWebsiteName(event.target.value);
  };

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const checkAllFields = () => {
    if (websiteName !== "" && username !== "" && password !== "") {
      return true;
    }
    return false;
  }

  const handleClickAddBtn = () => {
    if (checkAllFields() === true) {
      setError(false);
      const newPassword = {
        websiteName,
        username,
        password,
        id: uuidv4()
      };
      const passwordList = [...allPasswordList, newPassword];
      setAllPasswordList(passwordList);
      setWebsiteName("");
      setUsername("");
      setPassword("");
    }
    else setError(true);
  }

  const handleShowPassword = (event) => {
    setShowPassword(event.target.checked);
  }

  const handleDeletePassword = (id) => {
    const remainingPasswordList = allPasswordList.filter(password => password.id !== id);
    setAllPasswordList(remainingPasswordList);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const results = allPasswordList.filter((item) =>
      item.websiteName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  }

  return (
    <>
      <div className='main-container'>
        <div className="logo-container">
          <img src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" alt="logo" className='logo-img' />
        </div>
        {/* top container */}
        <div className='add-new-password-container'>
          <div className="add-new-password-inner-container">
            <h3 className='add-new-password-inner-container-heading'>Add New Password</h3>
            <div className="password-input-container">
              <img src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png" alt="website" />
              <input type='text' placeholder='Enter Website' value={websiteName} onChange={handleOnChangeWebSite} />
            </div>
            <div className="password-input-container">
              <img src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png" alt="name" />
              <input type='text' placeholder='Enter Username' value={username} onChange={handleOnChangeUsername} />
            </div>
            <div className="password-input-container">
              <img src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png" alt="password" />
              <input type='password' placeholder='Enter Password' value={password} onChange={handleOnChangePassword} />
            </div>
            <div className='add-password-error-button-container'>
              {error && <p>Please Fill All Details</p>}
              <button className='add-password-button' type='button' onClick={handleClickAddBtn}>Add</button>
            </div>
          </div>
          <div className="add-new-password-img-container">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png" alt="add-password" className='add-new-password-img' />
          </div>
        </div>

        {/* bottom-container */}
        <div className="all-password-container">
          <div className='all-password-top-container'>
            <div className="all-password-heading-error-container">
              <h3>Your Passwords</h3>
              <span>{allPasswordList.length}</span>
            </div>
            <div className="all-password-search-container">
              <button type="button" className="search-btn">
                <img alt="search" src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png" className='search-icon' />
              </button>
              <input type='text' placeholder='Search' value={search} onChange={handleSearch} />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input type='checkbox' id="show_password" onChange={handleShowPassword} />
            <label htmlFor="show_password">Show Passwords</label>
          </div>

          {/* password display container */}
          <div className="all-password-display-container">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div className='password-cards-container' key={item.id}>
                  <PasswordCard
                    passwordDetails={item}
                    showPassword={showPassword}
                    handleDeletePassword={handleDeletePassword}
                  />
                </div>
              ))
            ) : (
              <div className="no-password-container">
                <img
                  alt="no-password"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  className='no-password-img'
                />
                <p className='no-password-heading'>No Passwords</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default App