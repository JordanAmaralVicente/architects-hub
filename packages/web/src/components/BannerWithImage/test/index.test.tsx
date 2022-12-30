import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BannerWithImage } from "../index";

describe("<BannerWithImage />", () => {
  it("should render component", () => {
    render(
      <BannerWithImage
        imgSrc="./none.jpg"
        id="fake-id"
        className="fake-classname"
      />
    );

    const banner = screen.getByTestId("baner-with-image-test-id");

    expect(banner).toBeInTheDocument();
    expect(banner.id).toBe("fake-id");
    expect(banner.className).toBe("fake-classname");
  });
});
