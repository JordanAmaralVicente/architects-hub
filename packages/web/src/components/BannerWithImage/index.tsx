import { CSSProperties, ReactNode } from "react";

interface BannerProps {
  style?: CSSProperties;
  id?: string;
  className?: string;
  imgSrc: string;
  children?: ReactNode;
}

export const BannerWithImage = (props: BannerProps): JSX.Element => {
  return (
    <div
      id={props.id}
      className={props.className}
      style={{
        background: `url('${props.imgSrc}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
