import { PropsWithChildren } from "react";

interface ScoringSectionProps extends PropsWithChildren {
  sectionName: string;
}
/** A scoring section that holds multiple `scoring-input` components */
export function ScoringSection({ sectionName, children }: ScoringSectionProps) {
  return (
    <>
      <text className="flex h-10 select-none justify-center dark:text-white">
        {sectionName}
      </text>
      <div className="grid grid-flow-col justify-center gap-5 text-center">
        {children}
      </div>
      <div className="mb-5 block" />
    </>
  );
}
