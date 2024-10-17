import { PropsWithChildren } from "react";

interface ScoringSectionProps extends PropsWithChildren {
  sectionName: string;
}
/** A scoring section that holds multiple `scoring-input` components */
export function ScoringSection({ children, sectionName }: ScoringSectionProps) {
  return (
    <div className="dark:text-gray-100">
      <text className="flex h-10 justify-center">{sectionName}</text>
      <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
        {children}
      </div>
    </div>
  );
}
