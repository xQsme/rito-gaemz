import { RouteComponentProps } from "@reach/router";
import * as React from "react";

type Props<T extends Partial<Record<string, string>>> = RouteComponentProps<T> & {
  component: (props: RouteComponentProps<T>) => React.ReactNode;
};

function Route<Params = {}>({ component, ...props }: Props<Params>) {
  return <>{component(props as RouteComponentProps<Params>)}</>;
}

export default Route;