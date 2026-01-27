export type FetchState =
  /**
   * Fetch hasn't started.
   */
  | "idle"
  /**
   * There was error while fetching.
   */
  | "error"
  /**
   * Fetch is ongoing.
   */
  | "loading"
  /**
   * Fetch was successful-
   */
  | "success";
