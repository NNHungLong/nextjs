interface PageTitleProps {
  text: string;
  highlightText?: string;
}
export default function PageTitle({
  text,
  highlightText,
}: PageTitleProps): React.JSX.Element {
  return (
    <div className='mb-4'>
      <div className='highlight-layer'>
        <h3 className='font-bold text-2xl inline-block'>
          {text}{' '}
          {highlightText ? (
            <span className='text-sky-500'>{highlightText}</span>
          ) : (
            ''
          )}
        </h3>
      </div>
    </div>
  );
}
