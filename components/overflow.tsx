/** A small div utility function
 * that makes the entire screen
 * not intractable and slightly
 * darker
 */

import { PropsWithChildren } from "react";

export function Overflow({ children }: PropsWithChildren) {
  return (
    <div
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={`fixed inset-x-0 top-0 z-50 flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80 md:inset-0 md:h-full`}
    >
      {children}
    </div>
  );
}
