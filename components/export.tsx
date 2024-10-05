import { Button } from "flowbite-react";
import { PropsWithChildren } from "react";

export interface ExportProps extends PropsWithChildren {
  contents: string;
}
export function Export({ contents, children }: ExportProps) {
  function HandleDownload() {
    const link = document.createElement("a");
    const blob = new Blob([contents]);
    link.href = URL.createObjectURL(blob);
    link.download = "export.scouting";
    link.click();
    URL.revokeObjectURL(link.href);
  }
  return (
    <Button
      onClick={() => {
        HandleDownload();
      }}
    >
      {children}
    </Button>
  );
}
