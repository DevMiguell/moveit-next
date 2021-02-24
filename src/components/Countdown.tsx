import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() { // EXPORTAÇÃO DE FUNÇÃO

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60); // CONSTANTE AONDE ESTAMOS SETANDO DENTRO DO TIME(25) E DO SETIME(60) ENTAO MULTIPLICAMOS OS DOIS PARA CONVERTELOS EM NUNBER
  const [isActive, setIsActive] = useState(false); // CASO O CLICK NO BUTTON NÃO OCORRA O USESTAT SERA FALSE
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); // PEGANDO SO MINUTO DENTRO DE TIME APOS DIVIDI-LO / ACREDITO QUE ELE MULTIPLIQUE E DEPOIUS DIVIDA PARA TRANFORMAR EM NUNBER 
  const seconds = time % 60; // SECONDE RECEBENDO O VALOR TIME (25) E DIZENDO QUE O MODULO/LIMITE É 60 E PARA CONTAR DE 60 PARA BAIXO 

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split(''); // DANDO SPLIT NOS NUMERO E FAZENDO SUA INDEPENDENCIA ASSIM O NUMERO UNICOS NAO FICARAM AFETADOS
  const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true); // CRIANDO A FUNÇÃO DE CHAMADA 
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false); // ALTERANDO VALOR DO USE EFECT PARA FALSE
    setTime(0.1 * 60);
  }

  // FAZENDO O TEMPO ABAIXAR

  useEffect(() => { // USEEFFECT É UMA LIBERE DO REACT 
    if (isActive && time > 0) { // 1) SE ACTIVE E O TIME FOR MAIOR QUE 0 INICIAREMOS O CONTADOR
      countdownTimeout = setTimeout(() => {
        setTime(time - 1); // 2) RETIRANDO UM SEGUNDO DO TIME APÓS O INICIO DO 1
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]) // 3) QUANDO TIME FOR MUDADOS A FUNÇÃO OCORRERA, ASSIM CRIAMOS O LUPE COM O ITEM 2

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