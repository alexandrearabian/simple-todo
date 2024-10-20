import { faPowerOff, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function BurgerMenu({handleLogout}) {

    return (
        <>
            <nav role="navigation">
                <div id="menuToggle">

                    <input type="checkbox" />


                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <a href="#">
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} /> Contact
                            </li>
                        </a>
                        <a href="https://github.com/alexandrearabian" target="_blank">
                            <li>
                                <FontAwesomeIcon icon={faGithub} style={{ marginRight: '10px' }} /> More cool stuff</li>
                        </a>
                        <a href="#" onClick={handleLogout()}>
                            <li>
                                <FontAwesomeIcon icon={faPowerOff} style={{ marginRight: '10px' }} /> Logout
                            </li>
                        </a>

                    </ul>
                </div>
            </nav>
        </>
    )

}