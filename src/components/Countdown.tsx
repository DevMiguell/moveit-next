import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown() { // EXPORTAÇÃO DE FUNÇÃO

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split(''); // DANDO SPLIT NOS NUMERO E FAZENDO SUA INDEPENDENCIA ASSIM O NUMERO UNICOS NAO FICARAM AFETADOS
  const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRigth}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado

        </button>
      ) : (// O FRAGMENT ABAIXO <> É USADO PARA RESOLVER UMA LIMITAÇÃO DO REACT, ELE NAO É MOSTRADO NO HTML
          <>
            { isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo

              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo

                </button>
              )
            }
          </>
        )}


    </div >
  );
}