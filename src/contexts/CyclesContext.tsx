import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from "react";
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  // Pois quando não tiver nenhum ciclo ativo ele fica undefined.
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  // função que não recebe retorno
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  // Aqui é interessante iniciar o nome do arquivo com o prefixo sendo o nome da aplicação para não ter erro ou chance de outra aplicação substituir e a versão também caso eu precise trocar a variável em algum dia.

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  // função criada para facilitar a comunicação entre os componentes, parte do useEffect do componnete Countdown

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    // Data atual (new Date) em milisegundos (getTime ) convertida em String já que reconhecemos do lado de fora que é uma string.

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    // Novo ciclo com as informações descritas na interface.
    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }
  // Como argumento da minha função eu estou recebendo o data que nada mais é do que os dados dos meus inputs.

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}>
      {children}
      {/* propriedade especial do react cujo conteúdo é tudo que passarmos dentro do componente neste caso o CyclesContext.Provider */}
    </CyclesContext.Provider>
  );
}
