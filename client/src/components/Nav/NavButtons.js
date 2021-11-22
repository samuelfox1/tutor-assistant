import React, { useContext } from 'react';
import { Button, Navbar } from 'react-bulma-components';
import { useNavigate } from 'react-router';
import { AppContext } from '../../Context/AppProvider';
import { tokenKey } from '../../hooks/config';


export const NavButtons = () => {

    const { tutorDetails, setTutorDetails, updateAppComponent } = useContext(AppContext);
    const { loggedIn } = tutorDetails;
    const navigate = useNavigate();

    const handleLogout = () => {
        setTutorDetails({ loggedIn: false });
        localStorage.removeItem(tokenKey);
        updateAppComponent(null);
        navigate('/');
    };

    return (
        <Navbar.Item>
            {!loggedIn
                ? <>
                    < Button
                        size="small"
                        color="primary"
                        onClick={() => updateAppComponent('login')}
                    >
                        Login
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        className='ml-4'
                        onClick={() => updateAppComponent('signup')}
                    >
                        signup
                    </Button>
                </>
                : < Button
                    size="small"
                    color="primary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            }
        </Navbar.Item>
    );
};
