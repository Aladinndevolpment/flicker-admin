import NImage, { ImageProps } from "next/image";

interface ImagePropsI extends ImageProps {
  alt: string;
}

export default function Image(props: ImagePropsI) {
  const image =
    typeof props.src == "string" ? JSON.parse(props.src) : props.src;
  return <NImage {...props} src={image} alt={props.alt} />;
}
