import Image from 'next/image';

interface ImageContainerProps {
  src: string;
  alt: string;
  imgWidth?: number;
  imgHeight?: number;
  containerClassName?: string;
  imageClassName?: string;
  sizes?: string;
}

export default function ImageContainer({
  src,
  alt,
  imgWidth,
  imgHeight,
  containerClassName,
  imageClassName,
  ...props
}: ImageContainerProps) {
  return (
    <div
      className={`relative overflow-hidden flex justify-center items-center ${containerClassName}`}
    >
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
      ></div>
      <Image
        src={src}
        alt={alt}
        width={imgWidth || 300}
        height={imgHeight || 300}
        className={`relative max-w-full h-auto ${imageClassName}`}
        {...props}
      />
    </div>
  );
}
