import { createContext } from "react";
import type { DetailedResult } from "./DetailedResultsContext.types";

export const InitialResultsContext = createContext<DetailedResult[]>([]);
