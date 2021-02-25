import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void,
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60); // CONSTANTE AONDE ESTAMOS SETANDO DENTRO DO TIME(25) E DO SETIME(60) ENTAO MULTIPLICAMOS OS DOIS PARA CONVERTELOS EM NUNBER
    const [isActive, setIsActive] = useState(false); // CASO O CLICK NO BUTTON NÃO OCORRA O USESTAT SERA FALSE
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); // PEGANDO SO MINUTO DENTRO DE TIME APOS DIVIDI-LO / ACREDITO QUE ELE MULTIPLIQUE E DEPOIUS DIVIDA PARA TRANFORMAR EM NUNBER 
    const seconds = time % 60; // SECONDE RECEBENDO O VALOR TIME (25) E DIZENDO QUE O MODULO/LIMITE É 60 E PARA CONTAR DE 60 PARA BAIXO 

    function startCountdown() {
        setIsActive(true); // CRIANDO A FUNÇÃO DE CHAMADA 
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false); // ALTERANDO VALOR DO USE EFECT PARA FALSE
        setTime(0.1 * 60);
        setHasFinished(false);
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
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}