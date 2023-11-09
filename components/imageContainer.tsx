import Image from 'next/image';

interface ImageContainerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  containerClassName?: string;
  imageClassName?: string;
}

export default function ImageContainer({
  src,
  alt,
  width,
  height,
  containerClassName,
  imageClassName,
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
        width={width || 300}
        height={height || 300}
        className={`relative ${imageClassName}`}
      />
    </div>
  );
}
