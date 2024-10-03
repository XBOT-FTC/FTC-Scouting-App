import { Footer } from "flowbite-react";

export function Foot() {
  return (
    <Footer container className="rounded-none">
      <Footer.Copyright href="#" by="XBot" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="https://github.com/XBOT-FTC/FTC-Scouting-App">
          Github
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
