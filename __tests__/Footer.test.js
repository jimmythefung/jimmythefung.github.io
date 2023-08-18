import { render, screen } from "@testing-library/react";
import Footer from "../src/components/UI/Footer";

describe("Footer", () => {
    test("renders footer", () => {
        render(<Footer />);
        const el = screen.getByText("Support");
        expect(el).toBeInTheDocument();
    });

    test("does not renders arbitrary text", () => {
        render(<Footer />);
        const el = screen.queryByText("arbitrary");
        expect(el).toBeNull();
    });
});
