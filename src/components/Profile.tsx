// CONTROLE DE IMAGEM DE PERFIL 
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/DevMiguell.png" alt="Miguel Santos" />
            <div>
                <strong>Miguel Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}