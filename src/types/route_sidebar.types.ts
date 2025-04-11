import { ReactNode } from "react";

export type TRoutes = {
  path?: string;
  element: ReactNode;
  children?: TRoutes[];
};
export type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
} | undefined;

export type TItems = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TItems[];
};
