import styles from "./ComponentCss/HomePage.module.css";
import UnityGame from "./UnityGame";

function HomePage() {
  return (
    <div className={styles.backgroundContainer}>
      <h1 className={styles.homePageTitle}> Aura Labs Presents... </h1>
      <div className={styles.gameContainer}>
       {/* <UnityGame></UnityGame> */}
      </div>
    </div>
  );
}

export default HomePage;
