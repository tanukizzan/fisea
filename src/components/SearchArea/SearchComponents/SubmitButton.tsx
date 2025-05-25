'use client';

import { useDefaultSearch } from './useDefaultSearch';

interface SearchInputProps {
  wordInput: string;
}

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 88 88"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2, transform: 'rotate(-45deg)' }}
    aria-hidden="true"
  >
    <g transform="matrix(0.197138,0,0,0.197138,0.000364,-0.000636)">
      <clipPath id="_clip1">
        <rect x="0" y="0" width="444" height="444" />
      </clipPath>
      <g clipPath="url(#_clip1)">
        <g id="Artboard2" transform="matrix(1,0,0,1,-2493.49,-319.048)">
          <rect
            x="2060.92"
            y="0"
            width="1281.61"
            height="1080"
            style={{ fill: 'none', stroke: 'black', strokeWidth: '1px' }}
          />
          <g transform="matrix(6.29727,3.06036e-32,0,6.29727,2405.75,266.142)">
            <g id="arrow_right_alt_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg">
              <path
                d="M13.933,37.209L61.436,37.209L40.224,14.213L57.253,14.213L84.44,43.686L57.271,73.141L40.224,73.16L61.436,50.164L13.933,50.164L13.933,37.209Z"
                style={{ fill: '#ffffff' }}
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default function SubmitButton({ wordInput }: SearchInputProps) {
  const { performSearch } = useDefaultSearch();

  const handleClick = () => {
    performSearch(wordInput);
  };

  return (
    <button
      type="button"
      className="h-full min-h-[2.7em] w-auto flex justify-center items-center bg-(--submit-button) border-none rounded-r-md px-3 transition-opacity duration-200 cursor-pointer flex-shrink-0 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--submit-button)"
      onClick={handleClick}
      aria-label="検索実行"
    >
      <SearchIcon />
    </button>
  );
}