import { render, screen } from "@testing-library/react";
import Connect4 from "../src/components/Game/Connect4/Connect4";

describe("Connect4 Game", () => {
    test("renders Connect4", () => {
        render(<Connect4 />);
        const el = screen.queryByText("Home");
        expect(el).toBeInTheDocument();
    });
});
