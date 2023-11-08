import Image from 'next/image';

interface ImageContainerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageContainer({
  src,
  alt,
  width,
  height,
  className,
}: ImageContainerProps) {
  return (
    <div
      className={`relative overflow-hidden flex justify-center items-center ${className}`}
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
        className='relative hover:scale-125 transition-all duration-200 ease-linear'
      />
    </div>
  );
}
