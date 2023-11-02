interface PageTitleProps {
  text: string;
  highlightText?: string;
}
export default function PageTitle({
  text,
  highlightText,
}: PageTitleProps): React.JSX.Element {
  return (
    <div className='mb-6'>
      <div className='highlight-layer'>
        <h2 className='font-bold text-3xl inline-block'>
          {text}{' '}
          {highlightText ? (
            <span className='text-sky-500'>{highlightText}</span>
          ) : (
            ''
          )}
        </h2>
      </div>
    </div>
  );
}
