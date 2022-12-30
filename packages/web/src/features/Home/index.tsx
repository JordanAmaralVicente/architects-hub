import CliffHouse from "../../assets/cliff_house.webp";
import { BannerWithImage } from "../../components/BannerWithImage";
import { MainMessage } from "./components/main-message";

export function HomePage(): JSX.Element {
  return (
    <BannerWithImage imgSrc={CliffHouse} style={{ height: "675px" }}>
      <MainMessage />
    </BannerWithImage>
  );
}
