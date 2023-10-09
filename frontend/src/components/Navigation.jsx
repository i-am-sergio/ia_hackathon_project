import { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { useUser } from "../UserHooking";
import styles from "../scss/navigation.module.scss";

function Navigation() {
  const [showNav, setShowNav] = useState(false);
  const { user, logout } = useUser();

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const navClassName = showNav ? `${styles.nav} ${styles.show}` : styles.nav;

  return (
    <nav className={navClassName}>
      <button className={styles.menu_button} onClick={toggleNav}>
        <BiMenuAltRight className={styles.img} />
      </button>
      <ul className={styles.ul}>
        <li className={styles.navItem}>
          <Link to="/camera" className={styles.link}>
            Camera
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/collection" className={styles.link}>
            Collection
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/info" className={styles.link}>
            InfoPage
          </Link>
        </li>
        {user && (
          <li className={styles.navItem}>
            <button onClick={logout} className={styles.link}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

