export declare global {
  type MatchNumber = number & {
    /** force typescript to recognize
     * this as a unique type
     * @deprecated
     */
    __nominal_do_not_use_match_number: unique symbol;
  };

  type TeamNumber = number & {
    /** force typescript to recognize
     * this as a unique type
     * @deprecated
     */
    __nominal_do_not_use_team_number: unique symbol;
  };

  type Rank = number & {
    /** force typescript to recognize
     * this as a unique type
     * @deprecated
     */
    __nominal_do_not_use_rank: unique symbol;
  };

  type ExcludeNominalKeys<T> = {
    [K in keyof T as K extends `__nominal${string}`
      ? never
      : K]: T[K] extends object
      ? ExcludeNominalKeys<T[K]> // Recursively apply to nested objects
      : T[K];
  };
}
