import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EmptyResult } from "../index";

describe("<BannerWithImage />", () => {
  it("should render component", () => {
    render(<EmptyResult text="fake-empty-result-test" />);

    const emptyResult = screen.getByTestId("empty-result-test-id");
    const emptyResultBytext = screen.getByText(/fake-empty-result-test/i);

    expect(emptyResult.childNodes).toHaveLength(2);
    expect(emptyResult).toBeInTheDocument();
    expect(emptyResultBytext).toBeInTheDocument();
  });
});
