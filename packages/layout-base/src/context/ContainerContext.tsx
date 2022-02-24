import React, { useContext } from 'react';
import type { Container } from 'inversify';

const ContainerContext = React.createContext<Container>(null!);
/* eslint-disable */

export function useContainer() {
  return useContext(ContainerContext);
}

/**
 * 筛选值 context
 */
export function ContainerProvider({
  container,
  children,
}: {
  container: Container;
  children: React.ReactChild;
}) {
  // @ts-ignore
  // const [auth, setAuth] = useState<Container>(null);

  // useEffect(() => {
  //   setAuth(container);

  // }, [container])

  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
}
