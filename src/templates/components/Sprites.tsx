/**
 * IMPORTANT
 * - When adding an icon, make sure that it has a 24x24 viewBox
 * - Don't add `<svg>` or `<defs>` tags inside the `<symbol>` tag
 * - Always use `currentColor` for the `stroke` and `fill` attributes
 * - Check that each symbol has a unique `id`
 * - Add the symbol id to the `IconName` type inside `$templates/components/Icon.tsx`
 * - Order the symbols alphabetically to make it easier to find icons, avoid conflicts and duplicates
 */

const Sprites = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      class="sr-only"
      id="sprites"
    >
      <defs>
        <symbol id="activity" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 12H18L15 21L9 3L6 12H2"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="airplay" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 17H4C3.47 17 2.96 16.79 2.59 16.41C2.21 16.04 2 15.53 2 15V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H20C20.53 3 21.04 3.21 21.41 3.59C21.79 3.96 22 4.47 22 5V15C22 15.53 21.79 16.04 21.41 16.41C21.04 16.79 20.53 17 20 17H19M12 15L17 21H7L12 15Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="alert-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8V12M12 16H12.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="alert-octagon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8V12M12 16H12.01M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="alert-triangle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8V12M12 16H12.01M10.29 2.86L1.82 17C1.65 17.3 1.55 17.65 1.55 17.99C1.55 18.34 1.64 18.69 1.81 18.99C1.99 19.29 2.24 19.55 2.54 19.72C2.84 19.9 3.18 20 3.53 20H20.47C20.82 20 21.16 19.9 21.46 19.72C21.76 19.55 22.01 19.29 22.19 18.99C22.36 18.69 22.45 18.34 22.45 17.99C22.45 17.65 22.35 17.3 22.18 17L13.71 2.86C13.53 2.57 13.28 2.32 12.98 2.15C12.68 1.99 12.34 1.9 12 1.9C11.66 1.9 11.32 1.99 11.02 2.15C10.72 2.32 10.47 2.57 10.29 2.86Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="align-center" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 10H6M21 6H3M21 14H3M18 18H6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="align-justify" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 10H3M21 6H3M21 14H3M21 18H3"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="align-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 10H3M21 6H3M21 14H3M17 18H3"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="align-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 10H7M21 6H3M21 14H3M21 18H7"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="anchor" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8ZM12 8V22M12 22C9.35 22 6.8 20.95 4.93 19.07C3.05 17.2 2 14.65 2 12H5M12 22C14.65 22 17.2 20.95 19.07 19.07C20.95 17.2 22 14.65 22 12H19"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="aperture" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14.31 8L20.05 17.94M9.69 8H21.17M7.38 12L13.12 2.06M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12L10.88 21.94M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="archive" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 8V21H3V8M10 12H14M1 3H23V8H1V3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="arrow-down-circle"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-down-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 7L7 17M7 17H17M7 17V7"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="arrow-down-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M7 7L17 17M17 17V7M17 17H7"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-down" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 5V19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="arrow-left-circle"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="arrow-right-circle"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 16L16 12M16 12L12 8M16 12H8M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-up-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-up-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 17L7 7M7 7V17M7 7H17"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-up-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="arrow-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 19V5M12 5L5 12M12 5L19 12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="at-sign" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 8V13C16 13.8 16.32 14.56 16.88 15.12C17.44 15.68 18.2 16 19 16C19.8 16 20.56 15.68 21.12 15.12C21.68 14.56 22 13.8 22 13V12C22 9.74 21.24 7.55 19.83 5.78C18.43 4.02 16.47 2.78 14.27 2.26C12.07 1.75 9.77 2 7.73 2.96C5.69 3.92 4.03 5.55 3.03 7.57C2.03 9.6 1.75 11.9 2.22 14.11C2.7 16.31 3.91 18.29 5.65 19.73C7.39 21.16 9.57 21.96 11.83 22C14.08 22.04 16.29 21.31 18.08 19.94M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="award" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88M19 8C19 11.87 15.87 15 12 15C8.13 15 5 11.87 5 8C5 4.13 8.13 1 12 1C15.87 1 19 4.13 19 8Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="bar-chart-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 20V10M12 20V4M6 20V14"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="bar-chart" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 20V10M18 20V4M6 20V16"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="battery-charging"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 18H3C2.47 18 1.96 17.79 1.59 17.41C1.21 17.04 1 16.53 1 16V8C1 7.47 1.21 6.96 1.59 6.59C1.96 6.21 2.47 6 3 6H6.19M15 6H17C17.53 6 18.04 6.21 18.41 6.59C18.79 6.96 19 7.47 19 8V16C19 16.53 18.79 17.04 18.41 17.41C18.04 17.79 17.53 18 17 18H13.81M23 13V11M11 6L7 12H13L9 18"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="battery" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 13V11M3 6H17C18.1 6 19 6.9 19 8V16C19 17.1 18.1 18 17 18H3C1.9 18 1 17.1 1 16V8C1 6.9 1.9 6 3 6Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="bell-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_154)">
            <path
              d="M13.73 21C13.55 21.3 13.3 21.55 13 21.73C12.69 21.9 12.35 22 12 22C11.65 22 11.31 21.9 11 21.73C10.7 21.55 10.45 21.3 10.27 21M18.63 13C18.19 11.37 17.97 9.69 18 8C18 6.91 17.71 5.85 17.15 4.91C16.59 3.98 15.79 3.22 14.83 2.7C13.88 2.19 12.8 1.95 11.71 2C10.63 2.05 9.57 2.4 8.67 3M6.26 6.26C6.09 6.82 6 7.41 6 8C6 15 3 17 3 17H17M1 1L23 23"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_154">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="bell" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13.73 21C13.55 21.3 13.3 21.55 13 21.73C12.69 21.9 12.35 22 12 22C11.65 22 11.31 21.9 11 21.73C10.7 21.55 10.45 21.3 10.27 21M18 8C18 6.41 17.37 4.88 16.24 3.76C15.12 2.63 13.59 2 12 2C10.41 2 8.88 2.63 7.76 3.76C6.63 4.88 6 6.41 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="bluetooth" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6.5 6.5L17.5 17.5L12 23V1L17.5 6.5L6.5 17.5"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="bold" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 12H14C15.06 12 16.08 11.58 16.83 10.83C17.58 10.08 18 9.06 18 8C18 6.94 17.58 5.92 16.83 5.17C16.08 4.42 15.06 4 14 4H6V12ZM6 12H15C16.06 12 17.08 12.42 17.83 13.17C18.58 13.92 19 14.94 19 16C19 17.06 18.58 18.08 17.83 18.83C17.08 19.58 16.06 20 15 20H6V12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="book-open" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 7C12 5.94 11.58 4.92 10.83 4.17C10.08 3.42 9.06 3 8 3H2V18H9C9.8 18 10.56 18.32 11.12 18.88C11.68 19.44 12 20.2 12 21M12 7V21M12 7C12 5.94 12.42 4.92 13.17 4.17C13.92 3.42 14.94 3 16 3H22V18H15C14.2 18 13.44 18.32 12.88 18.88C12.32 19.44 12 20.2 12 21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="book" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 19.5C4 18.84 4.26 18.2 4.73 17.73C5.2 17.26 5.84 17 6.5 17H20M4 19.5C4 20.16 4.26 20.8 4.73 21.27C5.2 21.74 5.84 22 6.5 22H20V2H6.5C5.84 2 5.2 2.26 4.73 2.73C4.26 3.2 4 3.84 4 4.5V19.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="bookmark" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 21L12 16L5 21V5C5 4.47 5.21 3.96 5.59 3.59C5.96 3.21 6.47 3 7 3H17C17.53 3 18.04 3.21 18.41 3.59C18.79 3.96 19 4.47 19 5V21Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="box" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12M21 16V8C21 7.65 20.91 7.3 20.73 7C20.56 6.7 20.3 6.45 20 6.27L13 2.27C12.7 2.09 12.35 2 12 2C11.65 2 11.3 2.09 11 2.27L4 6.27C3.7 6.45 3.44 6.7 3.27 7C3.09 7.3 3 7.65 3 8V16C3 16.35 3.09 16.7 3.27 17C3.44 17.3 3.7 17.55 4 17.73L11 21.73C11.3 21.91 11.65 22 12 22C12.35 22 12.7 21.91 13 21.73L20 17.73C20.3 17.55 20.56 17.3 20.73 17C20.91 16.7 21 16.35 21 16Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="briefcase" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 21V5C16 4.47 15.79 3.96 15.41 3.59C15.04 3.21 14.53 3 14 3H10C9.47 3 8.96 3.21 8.59 3.59C8.21 3.96 8 4.47 8 5V21M4 7H20C21.1 7 22 7.9 22 9V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V9C2 7.9 2.9 7 4 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="calendar" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="camera-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_174)">
            <path
              d="M1 1L23 23M9 3H15L17 6H21C21.53 6 22.04 6.21 22.41 6.59C22.79 6.96 23 7.47 23 8V17.34M15.28 15.28C14.95 15.77 14.51 16.17 14.01 16.47C13.5 16.77 12.93 16.95 12.35 17C11.76 17.06 11.17 16.98 10.62 16.78C10.07 16.58 9.57 16.27 9.15 15.85C8.73 15.43 8.42 14.93 8.22 14.38C8.02 13.83 7.94 13.24 8 12.65C8.05 12.07 8.23 11.5 8.53 10.99C8.83 10.49 9.23 10.05 9.72 9.72M21 21H3C2.47 21 1.96 20.79 1.59 20.41C1.21 20.04 1 19.53 1 19V8C1 7.47 1.21 6.96 1.59 6.59C1.96 6.21 2.47 6 3 6H6L21 21Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_174">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>

        <symbol id="collapsed-logo">
          <rect y="0.392578" width="24" height="24" rx="12" fill="#DC0033"/>
          <g clip-path="url(#clip0_5057_13707)">
            <path d="M10.7924 6.39258H9.3613V13.0991H10.7924V6.39258ZM14.6383 6.39258H13.2073V13.0991H14.6383V6.39258ZM19.1998 13.0072H17.2768L13.2931 16.5405C12.4399 17.0237 11.3183 17.2001 10.4793 16.5901L6.72279 13.0072H4.7998C5.03772 13.3195 5.32214 13.6098 5.60298 13.8818C6.80149 15.0393 8.4651 16.7499 9.72621 17.7311C10.6618 18.4587 12.2502 18.5763 13.3217 18.1335C14.3092 17.7256 17.7616 14.4477 18.7526 13.5143C18.91 13.3673 19.0871 13.1928 19.198 13.0072H19.1998Z" fill="black"/>
            <path d="M19.2 13.0068C19.0891 13.1924 18.9102 13.367 18.7546 13.514C17.7618 14.4474 14.3111 17.7234 13.3237 18.1332C12.2522 18.576 10.6637 18.4602 9.72817 17.7308C8.46705 16.7496 6.80345 15.039 5.60494 13.8814C5.32409 13.6113 5.03788 13.3192 4.80176 13.0068H6.72474L10.4813 16.5897C11.3202 17.1998 12.4418 17.0234 13.2951 16.5401L17.2788 13.0068H19.2018H19.2Z" fill="white"/>
            <path d="M10.7924 6.39258H9.36133V13.0991H10.7924V6.39258Z" fill="white"/>
            <path d="M14.6381 6.39258H13.207V13.0991H14.6381V6.39258Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_5057_13707">
              <rect width="14.4" height="12" fill="white" transform="translate(4.7998 6.39258)"/>
            </clipPath>
          </defs>
        </symbol>

        <symbol id="collapsed-logo-letter">
          <path xmlns="http://www.w3.org/2000/svg" d="M14.3086 8.7601C14.3086 10.3801 13.2286 11.3801 11.8286 11.7001V11.7401C14.0686 11.9201 14.9686 13.2201 14.9686 14.9601C14.9686 17.4801 13.3686 18.9001 10.0286 18.9001H5.32861V5.1001H9.28861C12.6286 5.1001 14.3086 6.2601 14.3086 8.7601ZM9.48861 6.5401H7.04861V11.0401H9.20861C11.3486 11.0401 12.4486 10.2801 12.4486 8.7601C12.4486 7.2401 11.6286 6.5401 9.48861 6.5401ZM9.86861 12.4801H7.04861V17.4601H10.2286C12.3686 17.4601 13.1086 16.5201 13.1086 14.9601C13.1086 13.4001 12.0086 12.4801 9.86861 12.4801Z" fill="white"/>
          <path xmlns="http://www.w3.org/2000/svg" d="M16.731 18.9001V16.9601H18.671V18.9001H16.731Z" fill="#DC0033"/>
        </symbol>

        <symbol id="copy">
          <path
            d="M5.87305 15.5H4.87305C4.34261 15.5 3.83391 15.2893 3.45883 14.9142C3.08376 14.5391 2.87305 14.0304 2.87305 13.5V4.5C2.87305 3.96957 3.08376 3.46086 3.45883 3.08579C3.83391 2.71071 4.34261 2.5 4.87305 2.5H13.873C14.4035 2.5 14.9122 2.71071 15.2873 3.08579C15.6623 3.46086 15.873 3.96957 15.873 4.5V5.5M11.873 9.5H20.873C21.9776 9.5 22.873 10.3954 22.873 11.5V20.5C22.873 21.6046 21.9776 22.5 20.873 22.5H11.873C10.7685 22.5 9.87305 21.6046 9.87305 20.5V11.5C9.87305 10.3954 10.7685 9.5 11.873 9.5Z"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="camera" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 19C23 19.53 22.79 20.04 22.41 20.41C22.04 20.79 21.53 21 21 21H3C2.47 21 1.96 20.79 1.59 20.41C1.21 20.04 1 19.53 1 19V8C1 7.47 1.21 6.96 1.59 6.59C1.96 6.21 2.47 6 3 6H7L9 3H15L17 6H21C21.53 6 22.04 6.21 22.41 6.59C22.79 6.96 23 7.47 23 8V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 17C14.21 17 16 15.21 16 13C16 10.79 14.21 9 12 9C9.79 9 8 10.79 8 13C8 15.21 9.79 17 12 17Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="cast" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M2 16.1C2.96 16.3 3.84 16.77 4.54 17.46C5.23 18.16 5.7 19.04 5.9 20M2 12.05C4.03 12.28 5.92 13.19 7.37 14.63C8.81 16.08 9.72 17.97 9.95 20M2 8V6C2 5.47 2.21 4.96 2.59 4.59C2.96 4.21 3.47 4 4 4H20C20.53 4 21.04 4.21 21.41 4.59C21.79 4.96 22 5.47 22 6V18C22 18.53 21.79 19.04 21.41 19.41C21.04 19.79 20.53 20 20 20H14M2 20H2.01"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="check-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 11.08V12C22 14.16 21.3 16.25 20.01 17.98C18.72 19.71 16.9 20.97 14.84 21.58C12.77 22.2 10.56 22.12 8.53 21.37C6.51 20.63 4.78 19.25 3.61 17.44C2.44 15.63 1.88 13.49 2.02 11.34C2.16 9.18 3 7.14 4.4 5.5C5.8 3.86 7.69 2.72 9.8 2.24C11.9 1.77 14.1 1.98 16.07 2.86M22 4L12 14.01L9 11.01"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="check-square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 11L12 14L22 4M21 12V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H16"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="check" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevron-down" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevron-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevron-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevron-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 15L12 9L6 15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevrons-down" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 13L12 18L17 13M7 6L12 11L17 6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevrons-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M11 17L6 12L11 7M18 17L13 12L18 7"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevrons-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 17L18 12L13 7M6 17L11 12L6 7"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chevrons-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 11L12 6L7 11M17 18L12 13L7 18"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="chrome" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 8H21.17M3.95 6.06L8.54 14M10.88 21.94L15.46 14M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="clipboard" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 4H18C18.53 4 19.04 4.21 19.41 4.59C19.79 4.96 20 5.47 20 6V20C20 20.53 19.79 21.04 19.41 21.41C19.04 21.79 18.53 22 18 22H6C5.47 22 4.96 21.79 4.59 21.41C4.21 21.04 4 20.53 4 20V6C4 5.47 4.21 4.96 4.59 4.59C4.96 4.21 5.47 4 6 4H8M9 2H15C15.55 2 16 2.45 16 3V5C16 5.55 15.55 6 15 6H9C8.45 6 8 5.55 8 5V3C8 2.45 8.45 2 9 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="clock" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 6V12L16 14M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="cloud-drizzle" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_210)">
            <path
              d="M8 19V21M8 13V15M16 19V21M16 13V15M12 21V23M12 15V17M20 16.58C21.05 16.12 21.91 15.31 22.44 14.29C22.96 13.27 23.12 12.1 22.89 10.98C22.65 9.85 22.04 8.85 21.15 8.12C20.26 7.4 19.15 7 18 7H16.74C16.42 5.77 15.82 4.64 14.98 3.69C14.14 2.74 13.08 2.01 11.9 1.55C10.72 1.09 9.44 0.91 8.18 1.04C6.92 1.17 5.71 1.6 4.65 2.29C3.58 2.97 2.7 3.91 2.06 5C1.43 6.1 1.07 7.34 1 8.6C0.94 9.87 1.18 11.13 1.7 12.29C2.22 13.44 3.01 14.46 4 15.25"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_210">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="cloud-lightning" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_212)">
            <path
              d="M19 16.9C20.22 16.65 21.3 15.96 22.03 14.97C22.77 13.97 23.1 12.73 22.98 11.5C22.86 10.26 22.28 9.12 21.36 8.29C20.44 7.46 19.24 7 18 7H16.74C16.41 5.72 15.76 4.54 14.86 3.57C13.96 2.59 12.84 1.86 11.58 1.43C10.33 1 8.99 0.89 7.68 1.11C6.38 1.33 5.14 1.86 4.1 2.68C3.05 3.49 2.22 4.55 1.68 5.76C1.14 6.97 0.92 8.29 1.02 9.61C1.12 10.93 1.55 12.21 2.26 13.32C2.98 14.44 3.96 15.36 5.12 16M13 11L9 17H15L11 23"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_212">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="cloud-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_214)">
            <path
              d="M22.61 16.95C22.93 16.19 23.06 15.36 22.98 14.54C22.91 13.72 22.63 12.92 22.17 12.24C21.72 11.55 21.1 10.98 20.37 10.59C19.64 10.2 18.83 10 18 10H16.74C16.33 8.39 15.43 6.95 14.17 5.88C12.91 4.8 11.34 4.15 9.69 4M5 5C3.44 5.86 2.21 7.22 1.51 8.87C0.81 10.51 0.68 12.34 1.14 14.06C1.6 15.79 2.62 17.31 4.05 18.38C5.47 19.46 7.22 20.03 9 20H18C18.58 20 19.16 19.9 19.7 19.7M1 1L23 23"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_214">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="cloud-rain" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_216)">
            <path
              d="M16 13V21M8 13V21M12 15V23M20 16.58C21.05 16.12 21.91 15.31 22.44 14.29C22.96 13.27 23.12 12.1 22.89 10.98C22.65 9.85 22.04 8.85 21.15 8.12C20.26 7.4 19.15 7 18 7H16.74C16.42 5.77 15.82 4.64 14.98 3.69C14.14 2.74 13.08 2.01 11.9 1.55C10.72 1.09 9.44 0.91 8.18 1.04C6.92 1.17 5.71 1.6 4.65 2.29C3.58 2.97 2.7 3.91 2.06 5C1.43 6.1 1.07 7.34 1 8.6C0.94 9.87 1.18 11.13 1.7 12.29C2.22 13.44 3.01 14.46 4 15.25"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_216">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="cloud-snow" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_218)">
            <path
              d="M20 17.58C21.05 17.12 21.91 16.31 22.44 15.29C22.96 14.27 23.12 13.1 22.89 11.98C22.65 10.85 22.04 9.85 21.15 9.12C20.26 8.4 19.15 8 18 8H16.74C16.42 6.77 15.82 5.64 14.98 4.69C14.14 3.74 13.08 3.01 11.9 2.55C10.72 2.09 9.44 1.91 8.18 2.04C6.92 2.17 5.71 2.6 4.65 3.29C3.58 3.97 2.7 4.91 2.06 6C1.43 7.1 1.07 8.34 1 9.6C0.94 10.87 1.18 12.13 1.7 13.29C2.22 14.44 3.01 15.46 4 16.25M8 16H8.01M8 20H8.01M12 18H12.01M12 22H12.01M16 16H16.01M16 20H16.01"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_218">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="cloud" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_220)">
            <path
              d="M18 10H16.74C16.37 8.55 15.59 7.24 14.51 6.2C13.42 5.17 12.07 4.47 10.61 4.16C9.14 3.86 7.62 3.98 6.22 4.5C4.81 5.02 3.58 5.92 2.67 7.1C1.75 8.29 1.19 9.7 1.04 11.19C0.88 12.68 1.15 14.18 1.81 15.53C2.47 16.87 3.5 18 4.77 18.79C6.04 19.58 7.5 20 9 20H18C19.33 20 20.6 19.47 21.54 18.54C22.47 17.6 23 16.33 23 15C23 13.67 22.47 12.4 21.54 11.46C20.6 10.53 19.33 10 18 10Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_220">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="code" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 18L22 12L16 6M8 6L2 12L8 18"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="codepen" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2L22 8.5M12 2L2 8.5M12 2V8.5M22 8.5V15.5M22 8.5L12 15.5M22 15.5L12 22M22 15.5L12 8.5M12 22L2 15.5M12 22V15.5M2 15.5V8.5M2 15.5L12 8.5M2 8.5L12 15.5"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="codesandbox" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7.5 4.21L12 6.81L16.5 4.21M7.5 19.79V14.6L3 12M21 12L16.5 14.6V19.79M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12M21 16V8C21 7.65 20.91 7.3 20.73 7C20.56 6.7 20.3 6.45 20 6.27L13 2.27C12.7 2.09 12.35 2 12 2C11.65 2 11.3 2.09 11 2.27L4 6.27C3.7 6.45 3.44 6.7 3.27 7C3.09 7.3 3 7.65 3 8V16C3 16.35 3.09 16.7 3.27 17C3.44 17.3 3.7 17.55 4 17.73L11 21.73C11.3 21.91 11.65 22 12 22C12.35 22 12.7 21.91 13 21.73L20 17.73C20.3 17.55 20.56 17.3 20.73 17C20.91 16.7 21 16.35 21 16Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="coffee" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 8H19C20.06 8 21.08 8.42 21.83 9.17C22.58 9.92 23 10.94 23 12C23 13.06 22.58 14.08 21.83 14.83C21.08 15.58 20.06 16 19 16H18M18 8H2V17C2 18.06 2.42 19.08 3.17 19.83C3.92 20.58 4.94 21 6 21H14C15.06 21 16.08 20.58 16.83 19.83C17.58 19.08 18 18.06 18 17V8ZM6 1V4M10 1V4M14 1V4"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="columns" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 3V21M12 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H12V3ZM12 3H5C4.47 3 3.96 3.21 3.59 3.59C3.21 3.96 3 4.47 3 5V19C3 19.53 3.21 20.04 3.59 20.41C3.96 20.79 4.47 21 5 21H12V3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="command" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 3C17.2 3 16.44 3.32 15.88 3.88C15.32 4.44 15 5.2 15 6V18C15 18.8 15.32 19.56 15.88 20.12C16.44 20.68 17.2 21 18 21C18.8 21 19.56 20.68 20.12 20.12C20.68 19.56 21 18.8 21 18C21 17.2 20.68 16.44 20.12 15.88C19.56 15.32 18.8 15 18 15H6C5.2 15 4.44 15.32 3.88 15.88C3.32 16.44 3 17.2 3 18C3 18.8 3.32 19.56 3.88 20.12C4.44 20.68 5.2 21 6 21C6.8 21 7.56 20.68 8.12 20.12C8.68 19.56 9 18.8 9 18V6C9 5.2 8.68 4.44 8.12 3.88C7.56 3.32 6.8 3 6 3C5.2 3 4.44 3.32 3.88 3.88C3.32 4.44 3 5.2 3 6C3 6.8 3.32 7.56 3.88 8.12C4.44 8.68 5.2 9 6 9H18C18.8 9 19.56 8.68 20.12 8.12C20.68 7.56 21 6.8 21 6C21 5.2 20.68 4.44 20.12 3.88C19.56 3.32 18.8 3 18 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="compass" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="copy" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 15H4C3.47 15 2.96 14.79 2.59 14.41C2.21 14.04 2 13.53 2 13V4C2 3.47 2.21 2.96 2.59 2.59C2.96 2.21 3.47 2 4 2H13C13.53 2 14.04 2.21 14.41 2.59C14.79 2.96 15 3.47 15 4V5M11 9H20C21.1 9 22 9.9 22 11V20C22 21.1 21.1 22 20 22H11C9.9 22 9 21.1 9 20V11C9 9.9 9.9 9 11 9Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="corner-down-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 10L4 15M4 15L9 20M4 15H16C17.06 15 18.08 14.58 18.83 13.83C19.58 13.08 20 12.06 20 11V4"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="corner-down-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 10L20 15M20 15L15 20M20 15H8C6.94 15 5.92 14.58 5.17 13.83C4.42 13.08 4 12.06 4 11V4"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="corner-left-down"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M14 15L9 20M9 20L4 15M9 20V8C9 6.94 9.42 5.92 10.17 5.17C10.92 4.42 11.94 4 13 4H20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="corner-left-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14 9L9 4M9 4L4 9M9 4V16C9 17.06 9.42 18.08 10.17 18.83C10.92 19.58 11.94 20 13 20H20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="corner-right-down"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 15L15 20M15 20L20 15M15 20V8C15 6.94 14.58 5.92 13.83 5.17C13.08 4.42 12.06 4 11 4H4"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="corner-right-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10 9L15 4M15 4L20 9M15 4V16C15 17.06 14.58 18.08 13.83 18.83C13.08 19.58 12.06 20 11 20H4"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="corner-up-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 14L4 9M4 9L9 4M4 9H16C17.06 9 18.08 9.42 18.83 10.17C19.58 10.92 20 11.94 20 13V20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="corner-up-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 14L20 9M20 9L15 4M20 9H8C6.94 9 5.92 9.42 5.17 10.17C4.42 10.92 4 11.94 4 13V20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="cpu" width="24" height="25" viewBox="0 0 24 25">
          <g clip-path="url(#clip0_2901_254)">
            <path
              d="M9 1.04V4.17M15 1.04V4.17M9 20.83V23.96M15 20.83V23.96M20 9.38H23M20 14.58H23M1 9.38H4M1 14.58H4M6 4.17H18C19.1 4.17 20 5.1 20 6.25V18.75C20 19.9 19.1 20.83 18 20.83H6C4.9 20.83 4 19.9 4 18.75V6.25C4 5.1 4.9 4.17 6 4.17ZM9 9.38H15V15.63H9V9.38Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_254">
              <rect width="24" height="25" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="credit-card" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M1 10H23M3 4H21C22.1 4 23 4.9 23 6V18C23 19.1 22.1 20 21 20H3C1.9 20 1 19.1 1 18V6C1 4.9 1.9 4 3 4Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="crop" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_258)">
            <path
              d="M6.13 1L6 16C6 16.53 6.21 17.04 6.59 17.41C6.96 17.79 7.47 18 8 18H23M1 6.13L16 6C16.53 6 17.04 6.21 17.41 6.59C17.79 6.96 18 7.47 18 8V23"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_258">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="crosshair" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 12C22 17.52 17.52 22 12 22M22 12C22 6.48 17.52 2 12 2M22 12H18M12 22C6.48 22 2 17.52 2 12M12 22V18M2 12C2 6.48 6.48 2 12 2M2 12H6M12 2V6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="database" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 5C21 6.66 16.97 8 12 8C7.03 8 3 6.66 3 5M21 5C21 3.34 16.97 2 12 2C7.03 2 3 3.34 3 5M21 5V19C21 20.66 17 22 12 22C7 22 3 20.66 3 19V5M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="delete" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 9L12 15M12 9L18 15M21 4H8L1 12L8 20H21C21.53 20 22.04 19.79 22.41 19.41C22.79 19.04 23 18.53 23 18V6C23 5.47 22.79 4.96 22.41 4.59C22.04 4.21 21.53 4 21 4Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="disc" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="divide-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 12H16M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="divide-square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 12H16M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="divide" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 12H19M14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6ZM14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="dollar-sign" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 1V23M17 5H9.5C8.57 5 7.68 5.37 7.03 6.03C6.37 6.68 6 7.57 6 8.5C6 9.43 6.37 10.32 7.03 10.97C7.68 11.63 8.57 12 9.5 12H14.5C15.43 12 16.32 12.37 16.97 13.03C17.63 13.68 18 14.57 18 15.5C18 16.43 17.63 17.32 16.97 17.97C16.32 18.63 15.43 19 14.5 19H6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="download-cloud" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_276)">
            <path
              d="M8 17L12 21M12 21L16 17M12 21V12M20.88 18.09C21.75 17.48 22.4 16.61 22.74 15.6C23.08 14.59 23.09 13.5 22.77 12.49C22.45 11.48 21.81 10.59 20.96 9.96C20.1 9.34 19.06 9 18 9H16.74C16.44 7.83 15.88 6.74 15.09 5.82C14.31 4.89 13.33 4.16 12.22 3.67C11.12 3.18 9.91 2.95 8.7 2.99C7.49 3.04 6.31 3.35 5.24 3.92C4.17 4.49 3.25 5.29 2.53 6.27C1.82 7.24 1.33 8.37 1.12 9.56C0.9 10.75 0.96 11.98 1.29 13.14C1.61 14.31 2.2 15.38 3 16.29"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_276">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="download" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 15V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="dribbble" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8.56 2.75C12.93 8.78 14.58 12.17 16.59 20.47M19.13 5.09C15.41 9.44 10.19 10.75 2.25 10.94M21.75 12.84C18.25 11.91 15.12 12.02 12.81 12.84C10.23 13.76 7.8 15.7 5.37 19.16M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="droplet" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2.69L17.66 8.35C18.78 9.47 19.54 10.89 19.85 12.45C20.16 14 20 15.61 19.4 17.07C18.79 18.53 17.77 19.78 16.45 20.66C15.13 21.54 13.59 22.01 12 22.01C10.42 22.01 8.88 21.54 7.56 20.66C6.24 19.78 5.22 18.53 4.61 17.07C4.01 15.61 3.85 14 4.16 12.45C4.47 10.89 5.23 9.47 6.35 8.35L12 2.69Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="edit-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 3C17.26 2.74 17.57 2.53 17.92 2.39C18.26 2.24 18.63 2.17 19 2.17C19.37 2.17 19.74 2.24 20.08 2.39C20.43 2.53 20.74 2.74 21 3C21.26 3.26 21.47 3.57 21.61 3.92C21.76 4.26 21.83 4.63 21.83 5C21.83 5.37 21.76 5.74 21.61 6.08C21.47 6.43 21.26 6.74 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="edit-3" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 20H21M16.5 3.5C16.9 3.1 17.44 2.88 18 2.88C18.28 2.88 18.55 2.93 18.81 3.04C19.07 3.15 19.3 3.3 19.5 3.5C19.7 3.7 19.85 3.93 19.96 4.19C20.07 4.45 20.12 4.72 20.12 5C20.12 5.28 20.07 5.55 19.96 5.81C19.85 6.07 19.7 6.3 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="edit" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 3H6.64865C4.63356 3 3 4.63355 3 6.64865V17.3514C3 19.3664 4.63355 21 6.64865 21H17.3514C19.3664 21 21 19.3664 21 17.3514V12M14.4321 5.31069C15.2088 7.25232 16.4638 8.70984 18.4054 9.48649M8.91425 16.3279L11.7522 16.0699C12.0356 16.0442 12.3009 15.9199 12.5021 15.7187L19.9307 8.29011C20.8806 7.34019 20.8806 5.80006 19.9307 4.85014L19.0707 3.99014C18.1208 3.04022 16.5807 3.04022 15.6307 3.99014L8.20214 11.4187C8.00095 11.6199 7.87667 11.8853 7.85091 12.1686L7.59291 15.0066C7.52415 15.763 8.15784 16.3967 8.91425 16.3279Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </symbol>
        <symbol id="external-link" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 13V19C18 19.53 17.79 20.04 17.41 20.41C17.04 20.79 16.53 21 16 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V8C3 7.47 3.21 6.96 3.59 6.59C3.96 6.21 4.47 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="eye-slash" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_292)">
            <path
              d="M9.9 4.24C10.59 4.08 11.29 4 12 4C19 4 23 12 23 12C22.39 13.14 21.67 14.2 20.84 15.19M14.12 14.12C13.85 14.41 13.51 14.65 13.15 14.82C12.78 14.98 12.38 15.07 11.98 15.07C11.58 15.08 11.18 15.01 10.8 14.86C10.43 14.71 10.09 14.48 9.8 14.2C9.52 13.91 9.29 13.57 9.14 13.2C8.99 12.82 8.92 12.42 8.93 12.02C8.93 11.62 9.02 11.22 9.18 10.85C9.35 10.49 9.59 10.15 9.88 9.88M1 1L23 23M17.94 17.94C16.23 19.24 14.15 19.96 12 20C5 20 1 12 1 12C2.24 9.68 3.97 7.66 6.06 6.06L17.94 17.94Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_292">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="eye" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="facebook" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.11 6.48 14.29 6.29C14.48 6.11 14.73 6 15 6H18V2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="fast-forward" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 19L22 12L13 5V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 19L11 12L2 5V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="feather" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 8L2 22M17.5 15H9M20.24 12.24C21.37 11.11 22 9.59 22 8C22 6.4 21.37 4.88 20.24 3.75C19.11 2.62 17.59 1.99 15.99 1.99C14.4 1.99 12.88 2.62 11.75 3.75L5 10.5V19H13.5L20.24 12.24Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="figma" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2H8.5C7.57 2 6.68 2.37 6.03 3.03C5.37 3.68 5 4.57 5 5.5C5 6.43 5.37 7.32 6.03 7.97C6.68 8.63 7.57 9 8.5 9M12 2V9M12 2H15.5C15.96 2 16.41 2.09 16.84 2.27C17.26 2.44 17.65 2.7 17.97 3.03C18.3 3.35 18.56 3.74 18.73 4.16C18.91 4.59 19 5.04 19 5.5C19 5.96 18.91 6.41 18.73 6.84C18.56 7.26 18.3 7.65 17.97 7.97C17.65 8.3 17.26 8.56 16.84 8.73C16.41 8.91 15.96 9 15.5 9M12 9H8.5M12 9H15.5M12 9V16M8.5 9C7.57 9 6.68 9.37 6.03 10.03C5.37 10.68 5 11.57 5 12.5C5 13.43 5.37 14.32 6.03 14.97C6.68 15.63 7.57 16 8.5 16M15.5 9C15.04 9 14.59 9.09 14.16 9.27C13.74 9.44 13.35 9.7 13.03 10.03C12.7 10.35 12.44 10.74 12.27 11.16C12.09 11.59 12 12.04 12 12.5C12 12.96 12.09 13.41 12.27 13.84C12.44 14.26 12.7 14.65 13.03 14.97C13.35 15.3 13.74 15.56 14.16 15.73C14.59 15.91 15.04 16 15.5 16C15.96 16 16.41 15.91 16.84 15.73C17.26 15.56 17.65 15.3 17.97 14.97C18.3 14.65 18.56 14.26 18.73 13.84C18.91 13.41 19 12.96 19 12.5C19 12.04 18.91 11.59 18.73 11.16C18.56 10.74 18.3 10.35 17.97 10.03C17.65 9.7 17.26 9.44 16.84 9.27C16.41 9.09 15.96 9 15.5 9ZM8.5 16C7.57 16 6.68 16.37 6.03 17.03C5.37 17.68 5 18.57 5 19.5C5 20.43 5.37 21.32 6.03 21.97C6.68 22.63 7.57 23 8.5 23C9.43 23 10.32 22.63 10.97 21.97C11.63 21.32 12 20.43 12 19.5V16M8.5 16H12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="file-minus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8M14 2L20 8M14 2V8H20M9 15H15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="file-plus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8M14 2L20 8M14 2V8H20M12 18V12M9 15H15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="file-text" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8M14 2L20 8M14 2V8H20M16 13H8M16 17H8M10 9H8"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="file" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V9M13 2L20 9M13 2V9H20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="film" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 2V22M17 2V22M2 12H22M2 7H7M2 17H7M17 17H22M17 7H22M4.18 2H19.82C21.02 2 22 2.98 22 4.18V19.82C22 21.02 21.02 22 19.82 22H4.18C2.98 22 2 21.02 2 19.82V4.18C2 2.98 2.98 2 4.18 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="filter" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="flag" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 15C4 15 5 14 8 14C11 14 13 16 16 16C19 16 20 15 20 15V3C20 3 19 4 16 4C13 4 11 2 8 2C5 2 4 3 4 3V15ZM4 15V22"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="folder-minus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 14H15M22 19C22 19.53 21.79 20.04 21.41 20.41C21.04 20.79 20.53 21 20 21H4C3.47 21 2.96 20.79 2.59 20.41C2.21 20.04 2 19.53 2 19V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H9L11 6H20C20.53 6 21.04 6.21 21.41 6.59C21.79 6.96 22 7.47 22 8V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="folder-plus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 11V17M9 14H15M22 19C22 19.53 21.79 20.04 21.41 20.41C21.04 20.79 20.53 21 20 21H4C3.47 21 2.96 20.79 2.59 20.41C2.21 20.04 2 19.53 2 19V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H9L11 6H20C20.53 6 21.04 6.21 21.41 6.59C21.79 6.96 22 7.47 22 8V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="folder" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 19C22 19.53 21.79 20.04 21.41 20.41C21.04 20.79 20.53 21 20 21H4C3.47 21 2.96 20.79 2.59 20.41C2.21 20.04 2 19.53 2 19V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H9L11 6H20C20.53 6 21.04 6.21 21.41 6.59C21.79 6.96 22 7.47 22 8V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="framer" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 16H12M5 16V9H19V2H5L19 16H12H5ZM5 16L12 23V16H5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="frown" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 16C16 16 14.5 14 12 14C9.5 14 8 16 8 16M9 9H9.01M15 9H15.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="gift" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20 12V22H4V12M12 22V7M12 7H7.5C6.84 7 6.2 6.74 5.73 6.27C5.26 5.8 5 5.16 5 4.5C5 3.84 5.26 3.2 5.73 2.73C6.2 2.26 6.84 2 7.5 2C11 2 12 7 12 7ZM12 7H16.5C17.16 7 17.8 6.74 18.27 6.27C18.74 5.8 19 5.16 19 4.5C19 3.84 18.74 3.2 18.27 2.73C17.8 2.26 17.16 2 16.5 2C13 2 12 7 12 7ZM2 7H22V12H2V7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="git-branch" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 3V15M6 15C4.34 15 3 16.34 3 18C3 19.66 4.34 21 6 21C7.66 21 9 19.66 9 18M6 15C7.66 15 9 16.34 9 18M18 9C19.66 9 21 7.66 21 6C21 4.34 19.66 3 18 3C16.34 3 15 4.34 15 6C15 7.66 16.34 9 18 9ZM18 9C18 11.39 17.05 13.68 15.36 15.36C13.68 17.05 11.39 18 9 18"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="git-commit" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M1.05 12H7M17.01 12H22.96M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="git-merge" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 18C15 19.66 16.34 21 18 21C19.66 21 21 19.66 21 18C21 16.34 19.66 15 18 15C16.34 15 15 16.34 15 18ZM15 18C12.61 18 10.32 17.05 8.64 15.36C6.95 13.68 6 11.39 6 9M6 9C7.66 9 9 7.66 9 6C9 4.34 7.66 3 6 3C4.34 3 3 4.34 3 6C3 7.66 4.34 9 6 9ZM6 9V21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol
          id="git-pull-request"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M18 15C16.34 15 15 16.34 15 18C15 19.66 16.34 21 18 21C19.66 21 21 19.66 21 18C21 16.34 19.66 15 18 15ZM18 15V8C18 7.47 17.79 6.96 17.41 6.59C17.04 6.21 16.53 6 16 6H13M6 9C7.66 9 9 7.66 9 6C9 4.34 7.66 3 6 3C4.34 3 3 4.34 3 6C3 7.66 4.34 9 6 9ZM6 9V21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="github" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_338)">
            <path
              d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.04 17.65 15.97 17.17 15.81 16.72C15.65 16.27 15.39 15.86 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.5 7.12 20.96 5.78 20 4.77C20.46 3.55 20.42 2.2 19.91 1C19.91 1 18.73 0.65 16 2.48C13.71 1.86 11.29 1.86 9 2.48C6.27 0.65 5.09 1 5.09 1C4.58 2.2 4.54 3.55 5 4.77C4.03 5.79 3.49 7.14 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.61 15.89 9.36 16.3 9.2 16.74C9.03 17.18 8.97 17.66 9 18.13V22"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_338">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="gitlab" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_340)">
            <path
              d="M22.65 14.39L12 22.13L1.35 14.39C1.21 14.29 1.1 14.14 1.05 13.97C0.99 13.8 0.99 13.62 1.05 13.45L2.27 9.67L4.71 2.16C4.73 2.1 4.77 2.04 4.82 2C4.9 1.93 5 1.89 5.11 1.89C5.22 1.89 5.32 1.93 5.4 2C5.45 2.05 5.49 2.11 5.51 2.18L7.95 9.67H16.05L18.49 2.16C18.51 2.1 18.55 2.04 18.6 2C18.68 1.93 18.78 1.89 18.89 1.89C19 1.89 19.1 1.93 19.18 2C19.23 2.05 19.27 2.11 19.29 2.18L21.73 9.69L23 13.45C23.05 13.62 23.04 13.81 22.98 13.98C22.92 14.15 22.8 14.29 22.65 14.39V14.39Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_340">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="globe" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 12C22 17.52 17.52 22 12 22M22 12C22 6.48 17.52 2 12 2M22 12H2M12 22C6.48 22 2 17.52 2 12M12 22C14.5 19.26 15.92 15.71 16 12C15.92 8.29 14.5 4.74 12 2M12 22C9.5 19.26 8.08 15.71 8 12C8.08 8.29 9.5 4.74 12 2M2 12C2 6.48 6.48 2 12 2"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="grid" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10 3H3V10H10V3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 3H14V10H21V3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 14H14V21H21V14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 14H3V21H10V14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="hard-drive" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 12H2M22 12V18C22 18.53 21.79 19.04 21.41 19.41C21.04 19.79 20.53 20 20 20H4C3.47 20 2.96 19.79 2.59 19.41C2.21 19.04 2 18.53 2 18V12M22 12L18.55 5.11C18.38 4.78 18.13 4.5 17.81 4.3C17.5 4.1 17.13 4 16.76 4H7.24C6.87 4 6.5 4.1 6.19 4.3C5.87 4.5 5.62 4.78 5.45 5.11L2 12M6 16H6.01M10 16H10.01"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="hash" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 9H20M4 15H20M10 3L8 21M16 3L14 21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="headphones" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 18V12C3 9.61 3.95 7.32 5.64 5.64C7.32 3.95 9.61 3 12 3C14.39 3 16.68 3.95 18.36 5.64C20.05 7.32 21 9.61 21 12V18M21 19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H18C17.47 21 16.96 20.79 16.59 20.41C16.21 20.04 16 19.53 16 19V16C16 15.47 16.21 14.96 16.59 14.59C16.96 14.21 17.47 14 18 14H21V19ZM3 19C3 19.53 3.21 20.04 3.59 20.41C3.96 20.79 4.47 21 5 21H6C6.53 21 7.04 20.79 7.41 20.41C7.79 20.04 8 19.53 8 19V16C8 15.47 7.79 14.96 7.41 14.59C7.04 14.21 6.53 14 6 14H3V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="heart" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20.84 4.61C20.33 4.1 19.72 3.69 19.06 3.42C18.39 3.14 17.67 3 16.95 3C16.23 3 15.51 3.14 14.84 3.42C14.18 3.69 13.57 4.1 13.06 4.61L12 5.67L10.94 4.61C9.91 3.58 8.51 3 7.05 3C5.59 3 4.19 3.58 3.16 4.61C2.13 5.64 1.55 7.04 1.55 8.5C1.55 9.96 2.13 11.36 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.35 11.88 21.76 11.27 22.03 10.61C22.31 9.94 22.45 9.22 22.45 8.5C22.45 7.78 22.31 7.06 22.03 6.39C21.76 5.73 21.35 5.12 20.84 4.61V4.61Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="help-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9.09 9C9.33 8.33 9.79 7.77 10.4 7.41C11.01 7.05 11.73 6.92 12.43 7.04C13.13 7.16 13.76 7.52 14.22 8.06C14.67 8.61 14.92 9.29 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="hexagon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 16V8C21 7.65 20.91 7.3 20.73 7C20.56 6.7 20.3 6.45 20 6.27L13 2.27C12.7 2.09 12.35 2 12 2C11.65 2 11.3 2.09 11 2.27L4 6.27C3.7 6.45 3.44 6.7 3.27 7C3.09 7.3 3 7.65 3 8V16C3 16.35 3.09 16.7 3.27 17C3.44 17.3 3.7 17.55 4 17.73L11 21.73C11.3 21.91 11.65 22 12 22C12.35 22 12.7 21.91 13 21.73L20 17.73C20.3 17.55 20.56 17.3 20.73 17C20.91 16.7 21 16.35 21 16Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="home" viewBox="0 0 16 16">
          <path
            d="M3.69929 3.33055L3.30885 2.8425C3.29084 2.85691 3.27365 2.8723 3.25734 2.8886L3.69929 3.33055ZM3.83553 3.22155L3.45178 2.72816L3.4451 2.73351L3.83553 3.22155ZM12.1648 3.22155L11.7707 3.70664L11.7744 3.7096L12.1648 3.22155ZM12.301 3.33055L12.6915 2.8425V2.8425L12.301 3.33055ZM3.83554 3.22155L4.21929 3.71494L4.22597 3.70959L3.83554 3.22155ZM5.82611 1.79036L6.09787 2.35318L5.82611 1.79036ZM12.1648 3.22154L12.5589 2.73646L12.5552 2.7335L12.1648 3.22154ZM10.1742 1.79036L10.446 1.22753V1.22753L10.1742 1.79036ZM14.6328 7.04356L15.2535 6.97072V6.97072L14.6328 7.04356ZM13.2241 4.1126L12.7794 4.55181V4.55181L13.2241 4.1126ZM1.36757 7.04356L0.74683 6.97072L1.36757 7.04356ZM3.69928 3.33055L4.08972 3.81859C4.10772 3.80419 4.12492 3.7888 4.14122 3.77249L3.69928 3.33055ZM2.77626 4.1126L2.33161 3.67339L2.77626 4.1126ZM14.0418 8.25287V11.2232H15.2918V8.25287H14.0418ZM1.9585 11.2232V8.25287H0.708496V11.2232H1.9585ZM4.08972 3.81859L4.22596 3.70959L3.4451 2.73351L3.30885 2.8425L4.08972 3.81859ZM11.7744 3.7096L11.9106 3.81859L12.6915 2.8425L12.5552 2.73351L11.7744 3.7096ZM6.62516 13.2232V10.5565H5.37516V13.2232H6.62516ZM9.37516 10.5565V13.2232H10.6252V10.5565H9.37516ZM8.00016 9.18147C8.75955 9.18147 9.37516 9.79708 9.37516 10.5565H10.6252C10.6252 9.10672 9.44991 7.93147 8.00016 7.93147V9.18147ZM6.62516 10.5565C6.62516 9.79708 7.24077 9.18147 8.00016 9.18147V7.93147C6.55042 7.93147 5.37516 9.10672 5.37516 10.5565H6.62516ZM11.3335 13.9315C10.9423 13.9315 10.6252 13.6144 10.6252 13.2232H9.37516C9.37516 14.3047 10.2519 15.1815 11.3335 15.1815V13.9315ZM4.66683 15.1815C5.74839 15.1815 6.62516 14.3047 6.62516 13.2232H5.37516C5.37516 13.6144 5.05803 13.9315 4.66683 13.9315V15.1815ZM4.21924 3.7149L4.21925 3.71489L3.45182 2.7282L3.45182 2.72821L4.21924 3.7149ZM4.22597 3.70959C5.23911 2.89908 5.66851 2.5605 6.09787 2.35318L5.55436 1.22753C4.96673 1.51126 4.40807 1.96313 3.4451 2.7335L4.22597 3.70959ZM12.5589 2.73648L12.5589 2.73647L11.7707 3.70661L11.7707 3.70662L12.5589 2.73648ZM12.5552 2.7335C11.5923 1.96313 11.0336 1.51126 10.446 1.22753L9.90246 2.35318C10.3318 2.5605 10.7612 2.89908 11.7744 3.70959L12.5552 2.7335ZM6.09787 2.35318C7.29969 1.7729 8.70064 1.7729 9.90246 2.35318L10.446 1.22753C8.90078 0.481448 7.09955 0.481448 5.55436 1.22753L6.09787 2.35318ZM0.708496 11.2232C0.708496 13.4093 2.4807 15.1815 4.66683 15.1815V13.9315C3.17106 13.9315 1.9585 12.7189 1.9585 11.2232H0.708496ZM14.0418 11.2232C14.0418 12.7189 12.8293 13.9315 11.3335 13.9315V15.1815C13.5196 15.1815 15.2918 13.4093 15.2918 11.2232H14.0418ZM15.2918 8.25287C15.2918 7.6551 15.2928 7.3059 15.2535 6.97072L14.012 7.1164C14.0408 7.36197 14.0418 7.62539 14.0418 8.25287H15.2918ZM11.9106 3.81859C12.4006 4.21057 12.6057 4.37591 12.7794 4.55181L13.6687 3.67339C13.4316 3.43329 13.1583 3.21593 12.6915 2.8425L11.9106 3.81859ZM15.2535 6.97072C15.1074 5.72573 14.5496 4.56521 13.6687 3.67339L12.7794 4.55181C13.4646 5.24545 13.8984 6.14808 14.012 7.1164L15.2535 6.97072ZM1.9585 8.25287C1.9585 7.62539 1.95949 7.36197 1.98831 7.1164L0.74683 6.97072C0.707497 7.3059 0.708496 7.6551 0.708496 8.25287H1.9585ZM3.25734 2.8886L3.25734 2.88861L4.14122 3.77249L4.14123 3.77249L3.25734 2.8886ZM3.30885 2.84251C2.84207 3.21593 2.56877 3.43329 2.33161 3.67339L3.22092 4.55181C3.39467 4.37591 3.59974 4.21057 4.08972 3.81859L3.30885 2.84251ZM1.98831 7.1164C2.10194 6.14808 2.53577 5.24545 3.22092 4.55181L2.33161 3.67339C1.4507 4.56521 0.892927 5.72573 0.74683 6.97072L1.98831 7.1164Z"
            fill="currentColor"
          />
        </symbol>
        <symbol id="image" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21ZM5 21L16 10L21 15M10 8.5C10 9.33 9.33 10 8.5 10C7.67 10 7 9.33 7 8.5C7 7.67 7.67 7 8.5 7C9.33 7 10 7.67 10 8.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="inbox" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 12H16L14 15H10L8 12H2M22 12V18C22 18.53 21.79 19.04 21.41 19.41C21.04 19.79 20.53 20 20 20H4C3.47 20 2.96 19.79 2.59 19.41C2.21 19.04 2 18.53 2 18V12M22 12L18.55 5.11C18.38 4.78 18.13 4.5 17.81 4.3C17.5 4.1 17.13 4 16.76 4H7.24C6.87 4 6.5 4.1 6.19 4.3C5.87 4.5 5.62 4.78 5.45 5.11L2 12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="info" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 16V12M12 8H12.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="instagram" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17.5 6.5H17.51M7 2H17C19.76 2 22 4.24 22 7V17C22 19.76 19.76 22 17 22H7C4.24 22 2 19.76 2 17V7C2 4.24 4.24 2 7 2ZM16 11.37C16.12 12.2 15.98 13.05 15.59 13.8C15.21 14.55 14.59 15.15 13.84 15.53C13.09 15.91 12.24 16.04 11.41 15.91C10.58 15.77 9.81 15.38 9.21 14.79C8.62 14.19 8.23 13.42 8.09 12.59C7.96 11.76 8.09 10.91 8.47 10.16C8.85 9.41 9.45 8.79 10.2 8.41C10.95 8.02 11.8 7.88 12.63 8C13.48 8.13 14.26 8.52 14.87 9.13C15.48 9.74 15.87 10.52 16 11.37Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="italic" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 4H10M14 20H5M15 4L9 20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="key" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15.5 7.5L19 4M21 2L19 4L21 2ZM11.39 11.61C11.91 12.12 12.32 12.73 12.6 13.39C12.88 14.06 13.02 14.78 13.03 15.51C13.03 16.23 12.89 16.95 12.61 17.62C12.34 18.29 11.93 18.9 11.42 19.41C10.9 19.93 10.29 20.33 9.62 20.61C8.95 20.89 8.23 21.03 7.51 21.02C6.78 21.02 6.07 20.88 5.4 20.6C4.73 20.31 4.12 19.9 3.61 19.39C2.61 18.35 2.06 16.96 2.07 15.52C2.08 14.08 2.66 12.7 3.68 11.68C4.7 10.66 6.08 10.08 7.52 10.07C8.96 10.05 10.35 10.61 11.39 11.61L11.39 11.61ZM11.39 11.61L15.5 7.5L11.39 11.61ZM15.5 7.5L18.5 10.5L22 7L19 4L15.5 7.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="menu-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 12H17M3 6H21M3 18H21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="layout" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 9H21M9 21V9M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="life-buoy" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4.93 4.93L9.17 9.17M14.83 14.83L19.07 19.07M19.07 4.93L14.83 9.17L18.36 5.64M4.93 19.07L9.17 14.83M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12ZM16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="link-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 7H18C18.66 7 19.31 7.13 19.91 7.38C20.52 7.63 21.07 8 21.54 8.46C22 8.93 22.37 9.48 22.62 10.09C22.87 10.69 23 11.34 23 12C23 12.66 22.87 13.31 22.62 13.91C22.37 14.52 22 15.07 21.54 15.54C21.07 16 20.52 16.37 19.91 16.62C19.31 16.87 18.66 17 18 17H15M9 17H6C5.34 17 4.69 16.87 4.09 16.62C3.48 16.37 2.93 16 2.46 15.54C1.53 14.6 1 13.33 1 12C1 10.67 1.53 9.4 2.46 8.46C3.4 7.53 4.67 7 6 7H9M8 12H16"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="link" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10 13C10.43 13.57 10.98 14.05 11.61 14.39C12.24 14.74 12.93 14.94 13.65 14.99C14.36 15.04 15.08 14.94 15.75 14.69C16.42 14.44 17.03 14.05 17.54 13.54L20.54 10.54C21.45 9.6 21.95 8.33 21.94 7.02C21.93 5.71 21.41 4.46 20.48 3.53C19.55 2.6 18.3 2.08 16.99 2.07C15.68 2.06 14.41 2.56 13.47 3.47L11.75 5.18M14 11C13.57 10.43 13.02 9.95 12.39 9.61C11.76 9.26 11.07 9.06 10.35 9.01C9.64 8.96 8.92 9.06 8.25 9.31C7.58 9.56 6.97 9.95 6.46 10.46L3.46 13.46C2.55 14.4 2.05 15.67 2.06 16.98C2.07 18.29 2.59 19.54 3.52 20.47C4.45 21.4 5.7 21.92 7.01 21.93C8.32 21.94 9.59 21.44 10.53 20.53L12.24 18.82"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="linkedin" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 8C17.59 8 19.12 8.63 20.24 9.76C21.37 10.88 22 12.41 22 14V21H18V14C18 13.47 17.79 12.96 17.41 12.59C17.04 12.21 16.53 12 16 12C15.47 12 14.96 12.21 14.59 12.59C14.21 12.96 14 13.47 14 14V21H10V14C10 12.41 10.63 10.88 11.76 9.76C12.88 8.63 14.41 8 16 8Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 9H2V21H6V9Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 6C5.1 6 6 5.1 6 4C6 2.9 5.1 2 4 2C2.9 2 2 2.9 2 4C2 5.1 2.9 6 4 6Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="list" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="loader-icon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="lock" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 11V7C7 5.67 7.53 4.4 8.46 3.46C9.4 2.53 10.67 2 12 2C13.33 2 14.6 2.53 15.54 3.46C16.47 4.4 17 5.67 17 7V11M5 11H19C20.1 11 21 11.9 21 13V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V13C3 11.9 3.9 11 5 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="login" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="logout" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="mail" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="map-pin" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="map" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 18L1 22V6L8 2M8 18L16 22M8 18V2M16 22L23 18V2L16 6M16 22V6M16 6L8 2"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="maximize-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="maximize" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 3H5C4.47 3 3.96 3.21 3.59 3.59C3.21 3.96 3 4.47 3 5V8M21 8V5C21 4.47 20.79 3.96 20.41 3.59C20.04 3.21 19.53 3 19 3H16M16 21H19C19.53 21 20.04 20.79 20.41 20.41C20.79 20.04 21 19.53 21 19V16M3 16V19C3 19.53 3.21 20.04 3.59 20.41C3.96 20.79 4.47 21 5 21H8"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="meh" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 15H16M9 9H9.01M15 9H15.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="menu" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="message-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 11.5C21 12.82 20.7 14.12 20.1 15.3C19.39 16.71 18.31 17.9 16.97 18.73C15.63 19.56 14.08 20 12.5 20C11.18 20 9.88 19.7 8.7 19.1L3 21L4.9 15.3C4.3 14.12 4 12.82 4 11.5C4 9.92 4.44 8.37 5.27 7.03C6.1 5.69 7.29 4.61 8.7 3.9C9.88 3.3 11.18 3 12.5 3H13C15.08 3.12 17.05 3.99 18.53 5.47C20.01 6.95 20.89 8.92 21 11V11.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="message-square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 11.75C15.4142 11.75 15.75 11.4142 15.75 11C15.75 10.5858 15.4142 10.25 15 10.25V11.75ZM9 10.25C8.58579 10.25 8.25 10.5858 8.25 11C8.25 11.4142 8.58579 11.75 9 11.75V10.25ZM11.25 14C11.25 14.4142 11.5858 14.75 12 14.75C12.4142 14.75 12.75 14.4142 12.75 14H11.25ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8H12.75ZM3.09202 17.782L3.43251 17.1138H3.43251L3.09202 17.782ZM2.21799 16.908L1.54973 17.2485L2.21799 16.908ZM21.782 16.908L22.4503 17.2485V17.2485L21.782 16.908ZM20.908 17.782L21.2485 18.4503L20.908 17.782ZM20.908 4.21799L21.2485 3.54973L21.2485 3.54973L20.908 4.21799ZM21.782 5.09202L22.4503 4.75153V4.75152L21.782 5.09202ZM3.09202 4.21799L3.43251 4.88624H3.43251L3.09202 4.21799ZM2.21799 5.09202L2.88624 5.43251V5.43251L2.21799 5.09202ZM6.8 20.4L7.25 21H7.25L6.8 20.4ZM9.14667 18.64L9.59667 19.24L9.59667 19.24L9.14667 18.64ZM10.283 18.0372L10.4268 18.7732H10.4269L10.283 18.0372ZM9.79592 18.1995L9.4694 17.5243L9.4694 17.5243L9.79592 18.1995ZM15 10.25L9 10.25V11.75L15 11.75V10.25ZM12.75 14V8H11.25V14H12.75ZM5.2 4.75H18.8V3.25H5.2V4.75ZM21.25 7.2V14.8H22.75V7.2H21.25ZM2.75 14.8V7.2H1.25V14.8H2.75ZM5.2 17.25C4.62757 17.25 4.24336 17.2494 3.94748 17.2252C3.66035 17.2018 3.52307 17.1599 3.43251 17.1138L2.75153 18.4503C3.08879 18.6221 3.44545 18.6892 3.82533 18.7203C4.19646 18.7506 4.65232 18.75 5.2 18.75V17.25ZM1.25 14.8C1.25 15.3477 1.24942 15.8035 1.27974 16.1747C1.31078 16.5546 1.37789 16.9112 1.54973 17.2485L2.88624 16.5675C2.8401 16.4769 2.79822 16.3396 2.77476 16.0525C2.75058 15.7566 2.75 15.3724 2.75 14.8H1.25ZM3.43251 17.1138C3.19731 16.9939 3.00608 16.8027 2.88624 16.5675L1.54973 17.2485C1.81338 17.7659 2.23408 18.1866 2.75153 18.4503L3.43251 17.1138ZM21.25 14.8C21.25 15.3724 21.2494 15.7566 21.2252 16.0525C21.2018 16.3396 21.1599 16.4769 21.1138 16.5675L22.4503 17.2485C22.6221 16.9112 22.6892 16.5546 22.7203 16.1747C22.7506 15.8035 22.75 15.3477 22.75 14.8H21.25ZM18.8 18.75C19.3477 18.75 19.8035 18.7506 20.1747 18.7203C20.5546 18.6892 20.9112 18.6221 21.2485 18.4503L20.5675 17.1138C20.4769 17.1599 20.3396 17.2018 20.0525 17.2252C19.7566 17.2494 19.3724 17.25 18.8 17.25V18.75ZM21.1138 16.5675C20.9939 16.8027 20.8027 16.9939 20.5675 17.1138L21.2485 18.4503C21.7659 18.1866 22.1866 17.7659 22.4503 17.2485L21.1138 16.5675ZM18.8 4.75C19.3724 4.75 19.7566 4.75058 20.0525 4.77476C20.3396 4.79822 20.4769 4.8401 20.5675 4.88624L21.2485 3.54973C20.9112 3.37789 20.5546 3.31078 20.1747 3.27974C19.8035 3.24942 19.3477 3.25 18.8 3.25V4.75ZM22.75 7.2C22.75 6.65232 22.7506 6.19646 22.7203 5.82533C22.6892 5.44545 22.6221 5.08879 22.4503 4.75153L21.1138 5.43251C21.1599 5.52307 21.2018 5.66035 21.2252 5.94748C21.2494 6.24336 21.25 6.62757 21.25 7.2H22.75ZM20.5675 4.88624C20.8027 5.00608 20.9939 5.19731 21.1138 5.43251L22.4503 4.75152C22.1866 4.23408 21.7659 3.81338 21.2485 3.54973L20.5675 4.88624ZM5.2 3.25C4.65232 3.25 4.19646 3.24942 3.82533 3.27974C3.44544 3.31078 3.08879 3.37789 2.75153 3.54973L3.43251 4.88624C3.52307 4.8401 3.66035 4.79822 3.94748 4.77476C4.24336 4.75058 4.62757 4.75 5.2 4.75V3.25ZM2.75 7.2C2.75 6.62757 2.75058 6.24336 2.77476 5.94748C2.79822 5.66035 2.8401 5.52307 2.88624 5.43251L1.54973 4.75153C1.37789 5.08879 1.31078 5.44545 1.27974 5.82533C1.24942 6.19646 1.25 6.65232 1.25 7.2H2.75ZM2.75153 3.54973C2.23408 3.81338 1.81338 4.23408 1.54973 4.75153L2.88624 5.43251C3.00608 5.19731 3.19731 5.00608 3.43251 4.88624L2.75153 3.54973ZM5.25 18.8V20H6.75V18.8H5.25ZM18.8 17.25H11.0667V18.75H18.8V17.25ZM7.25 21L9.59667 19.24L8.69667 18.04L6.35 19.8L7.25 21ZM11.0667 17.25C10.6994 17.25 10.4168 17.2468 10.1391 17.3011L10.4269 18.7732C10.5292 18.7532 10.6424 18.75 11.0667 18.75V17.25ZM9.59667 19.24C9.93608 18.9854 10.0286 18.9201 10.1225 18.8747L9.4694 17.5243C9.21461 17.6475 8.99048 17.8196 8.69667 18.04L9.59667 19.24ZM10.1391 17.3011C9.90718 17.3464 9.6821 17.4214 9.4694 17.5243L10.1225 18.8747C10.2191 18.8279 10.3214 18.7938 10.4268 18.7732L10.1391 17.3011ZM5.25 20C5.25 21.0301 6.42596 21.618 7.25 21L6.35 19.8C6.51481 19.6764 6.75 19.794 6.75 20H5.25ZM5.2 18.75C5.22761 18.75 5.25 18.7724 5.25 18.8H6.75C6.75 17.944 6.05604 17.25 5.2 17.25V18.75Z"
            fill="currentColor"
          />
        </symbol>
        <symbol id="mic-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_412)">
            <path
              d="M1 1L23 23M15 9.34V4C15 3.26 14.72 2.54 14.23 1.99C13.73 1.43 13.04 1.09 12.3 1.01C11.56 0.94 10.82 1.14 10.22 1.58C9.62 2.02 9.21 2.67 9.06 3.4M17 16.95C16.02 17.95 14.77 18.63 13.41 18.91C12.04 19.19 10.62 19.05 9.33 18.52C8.04 17.99 6.94 17.09 6.17 15.92C5.4 14.76 4.99 13.39 5 12V10M19 10V12C19 12.41 18.96 12.82 18.89 13.23M12 19V23M8 23H16M9 9V12C9 12.59 9.18 13.17 9.51 13.67C9.84 14.16 10.3 14.54 10.85 14.77C11.4 15 12 15.06 12.58 14.94C13.17 14.82 13.7 14.54 14.12 14.12L9 9Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_412">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="mic" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 10V12C19 13.86 18.26 15.64 16.95 16.95C15.64 18.26 13.86 19 12 19M12 19C10.14 19 8.36 18.26 7.05 16.95C5.74 15.64 5 13.86 5 12V10M12 19V23M8 23H16M12 1C11.2 1 10.44 1.32 9.88 1.88C9.32 2.44 9 3.2 9 4V12C9 12.8 9.32 13.56 9.88 14.12C10.44 14.68 11.2 15 12 15C12.8 15 13.56 14.68 14.12 14.12C14.68 13.56 15 12.8 15 12V4C15 3.2 14.68 2.44 14.12 1.88C13.56 1.32 12.8 1 12 1Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="minimize-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 14H10M10 14V20M10 14L3 21M20 10H14M14 10V4M14 10L21 3"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="minimize" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 3V6C8 6.53 7.79 7.04 7.41 7.41C7.04 7.79 6.53 8 6 8H3M21 8H18C17.47 8 16.96 7.79 16.59 7.41C16.21 7.04 16 6.53 16 6V3M16 21V18C16 17.47 16.21 16.96 16.59 16.59C16.96 16.21 17.47 16 18 16H21M3 16H6C6.53 16 7.04 16.21 7.41 16.59C7.79 16.96 8 17.47 8 18V21"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="minus-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 12H16M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="minus-square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 12H16M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="minus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 12H19"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="monitor" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 21H16M12 17V21M4 3H20C21.1 3 22 3.9 22 5V15C22 16.1 21.1 17 20 17H4C2.9 17 2 16.1 2 15V5C2 3.9 2.9 3 4 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="mortarboard">
          <g fill="none">
            <path
              d="M22 9L12 5L2 9L12 13L22 9ZM22 9V15"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 10.6V16C6 16.7957 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7957 18 16V10.6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </symbol>

        <symbol id="moon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 12.79C20.84 14.49 20.2 16.11 19.16 17.47C18.11 18.82 16.7 19.85 15.1 20.43C13.49 21.01 11.75 21.12 10.08 20.75C8.41 20.37 6.88 19.53 5.67 18.33C4.47 17.12 3.63 15.59 3.25 13.92C2.88 12.25 2.99 10.51 3.57 8.9C4.15 7.3 5.18 5.89 6.53 4.84C7.89 3.8 9.51 3.16 11.21 3C10.21 4.35 9.73 6.01 9.86 7.68C9.98 9.35 10.7 10.93 11.89 12.11C13.07 13.3 14.65 14.02 16.32 14.14C17.99 14.27 19.65 13.79 21 12.79Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="dots-horizontal" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 13C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11C18.45 11 18 11.45 18 12C18 12.55 18.45 13 19 13Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 13C5.55 13 6 12.55 6 12C6 11.45 5.55 11 5 11C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="dots-vertical" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 6C12.55 6 13 5.55 13 5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5C11 5.55 11.45 6 12 6Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 20C12.55 20 13 19.55 13 19C13 18.45 12.55 18 12 18C11.45 18 11 18.45 11 19C11 19.55 11.45 20 12 20Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="mouse-pointer" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 13L19 19M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="move" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 9L2 12M2 12L5 15M2 12H22M9 5L12 2M12 2L15 5M12 2V22M15 19L12 22M12 22L9 19M19 9L22 12M22 12L19 15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="music" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 18V5L21 3V16M9 18C9 19.66 7.66 21 6 21C4.34 21 3 19.66 3 18C3 16.34 4.34 15 6 15C7.66 15 9 16.34 9 18ZM21 16C21 17.66 19.66 19 18 19C16.34 19 15 17.66 15 16C15 14.34 16.34 13 18 13C19.66 13 21 14.34 21 16Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="navigation-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2L19 21L12 17L5 21L12 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="navigation" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 11L22 2L13 21L11 13L3 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="octagon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="package" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16.5 9.4L7.5 4.21M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12M21 16V8C21 7.65 20.91 7.3 20.73 7C20.56 6.7 20.3 6.45 20 6.27L13 2.27C12.7 2.09 12.35 2 12 2C11.65 2 11.3 2.09 11 2.27L4 6.27C3.7 6.45 3.44 6.7 3.27 7C3.09 7.3 3 7.65 3 8V16C3 16.35 3.09 16.7 3.27 17C3.44 17.3 3.7 17.55 4 17.73L11 21.73C11.3 21.91 11.65 22 12 22C12.35 22 12.7 21.91 13 21.73L20 17.73C20.3 17.55 20.56 17.3 20.73 17C20.91 16.7 21 16.35 21 16Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="paperclip" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21.44 11.05L12.25 20.24C11.12 21.37 9.6 22 8.01 22C6.41 22 4.89 21.37 3.76 20.24C2.63 19.11 2 17.59 2 15.99C2 14.4 2.63 12.88 3.76 11.75L12.95 2.56C13.7 1.81 14.72 1.39 15.78 1.39C16.84 1.39 17.86 1.81 18.61 2.56C19.36 3.31 19.78 4.33 19.78 5.39C19.78 6.45 19.36 7.47 18.61 8.22L9.41 17.41C9.03 17.79 8.53 18 8 18C7.46 18 6.96 17.79 6.58 17.41C6.2 17.03 5.99 16.53 5.99 15.99C5.99 15.46 6.2 14.96 6.58 14.58L15.07 6.1"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="paper-plane">
          <path
            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="pause-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10 15V9M14 15V9M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="pause" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10 4H6V20H10V4Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 4H14V20H18V4Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="pen-tool" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M2 2L16.5 5.5L18 13L13 18L5.5 16.5L2 2ZM2 2L9.59 9.59M12 19L19 12L22 15L15 22L12 19ZM13 11C13 12.1 12.1 13 11 13C9.9 13 9 12.1 9 11C9 9.9 9.9 9 11 9C12.1 9 13 9.9 13 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="percent" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 5L5 19M9 6.5C9 7.88 7.88 9 6.5 9C5.12 9 4 7.88 4 6.5C4 5.12 5.12 4 6.5 4C7.88 4 9 5.12 9 6.5ZM20 17.5C20 18.88 18.88 20 17.5 20C16.12 20 15 18.88 15 17.5C15 16.12 16.12 15 17.5 15C18.88 15 20 16.12 20 17.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="phone-call" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15.05 5C16.03 5.19 16.92 5.67 17.63 6.37C18.33 7.08 18.81 7.97 19 8.95M15.05 1C17.08 1.23 18.97 2.13 20.42 3.58C21.86 5.02 22.77 6.91 23 8.94M22 16.92V19.92C22 20.2 21.94 20.47 21.83 20.73C21.72 20.98 21.56 21.21 21.35 21.4C21.15 21.59 20.9 21.73 20.64 21.82C20.38 21.91 20.1 21.95 19.82 21.92C16.74 21.59 13.79 20.53 11.19 18.85C8.77 17.31 6.73 15.27 5.19 12.85C3.5 10.24 2.45 7.27 2.12 4.18C2.09 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91C9.51 12.41 11.59 14.49 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.77 14.96 21.21 15.2 21.53 15.58C21.84 15.95 22.01 16.43 22 16.92Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="phone-forwarded" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 1L23 5M23 5L19 9M23 5H15M22 16.92V19.92C22 20.2 21.94 20.47 21.83 20.73C21.72 20.98 21.56 21.21 21.35 21.4C21.15 21.59 20.9 21.73 20.64 21.82C20.38 21.91 20.1 21.95 19.82 21.92C16.74 21.59 13.79 20.53 11.19 18.85C8.77 17.31 6.73 15.27 5.19 12.85C3.5 10.24 2.45 7.27 2.12 4.18C2.09 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91C9.51 12.41 11.59 14.49 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.77 14.96 21.21 15.2 21.53 15.58C21.84 15.95 22.01 16.43 22 16.92Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="phone-incoming" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 2V8M16 8H22M16 8L23 1M22 16.92V19.92C22 20.2 21.94 20.47 21.83 20.73C21.72 20.98 21.56 21.21 21.35 21.4C21.15 21.59 20.9 21.73 20.64 21.82C20.38 21.91 20.1 21.95 19.82 21.92C16.74 21.59 13.79 20.53 11.19 18.85C8.77 17.31 6.73 15.27 5.19 12.85C3.5 10.24 2.45 7.27 2.12 4.18C2.09 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91C9.51 12.41 11.59 14.49 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.77 14.96 21.21 15.2 21.53 15.58C21.84 15.95 22.01 16.43 22 16.92Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="phone-missed" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 1L17 7M17 1L23 7M22 16.92V19.92C22 20.2 21.94 20.47 21.83 20.73C21.72 20.98 21.56 21.21 21.35 21.4C21.15 21.59 20.9 21.73 20.64 21.82C20.38 21.91 20.1 21.95 19.82 21.92C16.74 21.59 13.79 20.53 11.19 18.85C8.77 17.31 6.73 15.27 5.19 12.85C3.5 10.24 2.45 7.27 2.12 4.18C2.09 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91C9.51 12.41 11.59 14.49 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.77 14.96 21.21 15.2 21.53 15.58C21.84 15.95 22.01 16.43 22 16.92Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="phone-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_466)">
            <path
              d="M5.19 12.81C3.51 10.21 2.45 7.26 2.12 4.18C2.1 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91M23 1L1 23M10.68 13.31C11.69 14.33 12.84 15.2 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.76 14.96 21.2 15.2 21.52 15.57C21.83 15.93 22 16.4 22 16.89V19.89C22 20.17 21.94 20.44 21.83 20.7C21.72 20.95 21.56 21.18 21.35 21.37C21.15 21.56 20.9 21.7 20.64 21.79C20.38 21.88 20.1 21.92 19.82 21.89C16.74 21.56 13.79 20.5 11.19 18.82C9.99 18.06 8.87 17.16 7.86 16.15L10.68 13.31Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_466">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="phone-outgoing" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 7V1M23 1H17M23 1L16 8M22 16.92V19.92C22 20.2 21.94 20.47 21.83 20.73C21.72 20.98 21.56 21.21 21.35 21.4C21.15 21.59 20.9 21.73 20.64 21.82C20.38 21.91 20.1 21.95 19.82 21.92C16.74 21.59 13.79 20.53 11.19 18.85C8.77 17.31 6.73 15.27 5.19 12.85C3.5 10.24 2.45 7.27 2.12 4.18C2.09 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91C9.51 12.41 11.59 14.49 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.77 14.96 21.21 15.2 21.53 15.58C21.84 15.95 22.01 16.43 22 16.92Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="phone" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 16.92V19.92C22 20.2 21.94 20.47 21.83 20.73C21.72 20.98 21.56 21.21 21.35 21.4C21.15 21.59 20.9 21.73 20.64 21.82C20.38 21.91 20.1 21.95 19.82 21.92C16.74 21.59 13.79 20.53 11.19 18.85C8.77 17.31 6.73 15.27 5.19 12.85C3.5 10.24 2.45 7.27 2.12 4.18C2.09 3.9 2.13 3.62 2.22 3.36C2.31 3.1 2.45 2.86 2.63 2.65C2.82 2.45 3.05 2.28 3.3 2.17C3.56 2.06 3.83 2 4.11 2H7.11C7.6 2 8.07 2.17 8.43 2.48C8.8 2.8 9.04 3.24 9.11 3.72C9.24 4.68 9.47 5.62 9.81 6.53C9.94 6.89 9.97 7.28 9.89 7.65C9.81 8.02 9.63 8.37 9.36 8.64L8.09 9.91C9.51 12.41 11.59 14.49 14.09 15.91L15.36 14.64C15.63 14.37 15.98 14.19 16.35 14.11C16.72 14.03 17.11 14.06 17.47 14.19C18.38 14.53 19.32 14.76 20.28 14.89C20.77 14.96 21.21 15.2 21.53 15.58C21.84 15.95 22.01 16.43 22 16.92Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="pie-chart" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21.21 15.89C20.57 17.39 19.58 18.72 18.31 19.75C17.04 20.78 15.54 21.49 13.94 21.8C12.34 22.12 10.68 22.04 9.12 21.57C7.56 21.1 6.13 20.26 4.97 19.11C3.81 17.96 2.94 16.54 2.46 14.98C1.97 13.43 1.87 11.77 2.17 10.16C2.47 8.56 3.16 7.05 4.17 5.77C5.19 4.49 6.5 3.48 8 2.83M22 12C22 10.69 21.74 9.39 21.24 8.17C20.74 6.96 20 5.86 19.07 4.93C18.14 4 17.04 3.26 15.83 2.76C14.61 2.26 13.31 2 12 2V12H22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="play-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 8L16 12L10 16V8Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="play" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 3L19 12L5 21V3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="plus-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8V16M8 12H16M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="plus-square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 8V16M8 12H16M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="plus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 5V19M5 12H19"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="pocket" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 10L12 14L16 10M4 3H20C20.53 3 21.04 3.21 21.41 3.59C21.79 3.96 22 4.47 22 5V11C22 13.65 20.95 16.2 19.07 18.07C17.2 19.95 14.65 21 12 21C10.69 21 9.39 20.74 8.17 20.24C6.96 19.74 5.86 19 4.93 18.07C3.05 16.2 2 13.65 2 11V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="power" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18.36 6.64C19.62 7.9 20.48 9.5 20.82 11.25C21.17 12.99 20.99 14.8 20.31 16.45C19.63 18.09 18.47 19.5 16.99 20.49C15.52 21.48 13.78 22 12 22C10.22 22 8.48 21.48 7 20.49C5.52 19.5 4.36 18.09 3.68 16.45C3 14.8 2.82 12.99 3.17 11.25C3.51 9.5 4.37 7.9 5.63 6.64M12 2V12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="printer" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 9V2H18V9M6 18H4C3.47 18 2.96 17.79 2.59 17.41C2.21 17.04 2 16.53 2 16V11C2 10.47 2.21 9.96 2.59 9.59C2.96 9.21 3.47 9 4 9H20C20.53 9 21.04 9.21 21.41 9.59C21.79 9.96 22 10.47 22 11V16C22 16.53 21.79 17.04 21.41 17.41C21.04 17.79 20.53 18 20 18H18M6 14H18V22H6V14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="radio" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16.24 7.76C16.8 8.32 17.24 8.98 17.54 9.71C17.84 10.44 18 11.22 18 12C18 12.79 17.84 13.57 17.54 14.3C17.24 15.03 16.8 15.69 16.24 16.25M7.76 16.24C7.2 15.68 6.76 15.02 6.46 14.29C6.16 13.56 6 12.78 6 11.99C6 11.21 6.16 10.43 6.46 9.7C6.76 8.97 7.2 8.31 7.76 7.75M19.07 4.93C20.94 6.81 22 9.35 22 12C22 14.65 20.94 17.19 19.07 19.07M4.93 19.07C3.06 17.19 2 14.65 2 12C2 9.35 3.06 6.81 4.93 4.93M14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="refresh-ccw" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M1 4V10M1 10H7M1 10L5.64 5.64C6.71 4.56 8.04 3.78 9.5 3.36C10.97 2.93 12.51 2.89 13.99 3.22C15.47 3.56 16.85 4.27 17.98 5.28C19.12 6.29 19.98 7.57 20.49 9M23 20V14M23 14H17M23 14L18.36 18.36C17.29 19.44 15.96 20.22 14.5 20.64C13.03 21.07 11.49 21.11 10.01 20.78C8.53 20.44 7.15 19.73 6.02 18.72C4.88 17.71 4.02 16.43 3.51 15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="refresh-cw" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 4V10M23 10H17M23 10L18.36 5.64C17.29 4.56 15.96 3.78 14.5 3.36C13.03 2.93 11.49 2.89 10.01 3.22C8.53 3.56 7.15 4.27 6.02 5.28C4.88 6.29 4.02 7.57 3.51 9M1 20V14M1 14H7M1 14L5.64 18.36C6.71 19.44 8.04 20.22 9.5 20.64C10.97 21.07 12.51 21.11 13.99 20.78C15.47 20.44 16.85 19.73 17.98 18.72C19.12 17.71 19.98 16.43 20.49 15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="repeat" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 1L21 5M21 5L17 9M21 5H7C5.94 5 4.92 5.42 4.17 6.17C3.42 6.92 3 7.94 3 9V11M7 23L3 19M3 19L7 15M3 19H17C18.06 19 19.08 18.58 19.83 17.83C20.58 17.08 21 16.06 21 15V13"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="sort" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3.5 9L7.5 5M7.5 5L11.5 9M7.5 5L7.5 19M20.5 15L16.5 19M16.5 19L12.5 15M16.5 19L16.5 5"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="rewind" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M11 19L2 12L11 5V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 19L13 12L22 5V19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="rotate-ccw" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M1 4V10M1 10H7M1 10L5.64 5.64C7.02 4.26 8.81 3.37 10.74 3.1C12.68 2.83 14.65 3.19 16.35 4.13C18.06 5.08 19.42 6.55 20.21 8.33C21.01 10.11 21.21 12.1 20.77 14.01C20.34 15.91 19.3 17.62 17.81 18.88C16.32 20.14 14.46 20.88 12.52 20.99C10.57 21.11 8.64 20.58 7.01 19.5C5.39 18.42 4.16 16.84 3.51 15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="rotate-cw" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 4V10M23 10H17M23 10L18.37 5.64C16.99 4.26 15.2 3.37 13.27 3.09C11.34 2.82 9.37 3.18 7.66 4.12C5.95 5.06 4.59 6.53 3.79 8.32C2.99 10.1 2.8 12.09 3.23 13.99C3.66 15.89 4.7 17.6 6.18 18.87C7.67 20.13 9.53 20.87 11.48 20.99C13.43 21.1 15.36 20.58 16.98 19.5C18.61 18.42 19.84 16.84 20.49 15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="rss" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 11C6.39 11 8.68 11.95 10.36 13.64C12.05 15.32 13 17.61 13 20M4 4C8.24 4 12.31 5.69 15.31 8.69C18.31 11.69 20 15.76 20 20M6 19C6 19.55 5.55 20 5 20C4.45 20 4 19.55 4 19C4 18.45 4.45 18 5 18C5.55 18 6 18.45 6 19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="save" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 21V13H7V21M7 3V8H15M19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H16L21 8V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="scissors" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12M9 6C9 7.66 7.66 9 6 9C4.34 9 3 7.66 3 6C3 4.34 4.34 3 6 3C7.66 3 9 4.34 9 6ZM9 18C9 19.66 7.66 21 6 21C4.34 21 3 19.66 3 18C3 16.34 4.34 15 6 15C7.66 15 9 16.34 9 18Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="search" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 21L16.65 16.65M19 11C19 15.42 15.42 19 11 19C6.58 19 3 15.42 3 11C3 6.58 6.58 3 11 3C15.42 3 19 6.58 19 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="send" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="server" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 6H6.01M6 18H6.01M4 2H20C21.1 2 22 2.9 22 4V8C22 9.1 21.1 10 20 10H4C2.9 10 2 9.1 2 8V4C2 2.9 2.9 2 4 2ZM4 14H20C21.1 14 22 14.9 22 16V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V16C2 14.9 2.9 14 4 14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="settings" width="24" height="24" viewBox="0 0 24 24">
          <path d="M14.7001 6.29998C14.5169 6.48691 14.4142 6.73823 14.4142 6.99998C14.4142 7.26173 14.5169 7.51305 14.7001 7.69998L16.3001 9.29998C16.487 9.48321 16.7383 9.58584 17.0001 9.58584C17.2619 9.58584 17.5132 9.48321 17.7001 9.29998L19.8346 7.16548C20.3008 6.69923 20.534 6.4661 20.8947 6.43341C21.1544 6.40988 21.5524 6.56561 21.7271 6.75913C21.9699 7.02795 21.9796 7.27429 21.9991 7.76697C22.0163 8.20413 21.9858 8.64413 21.9066 9.07913C21.6879 10.279 21.1088 11.3838 20.2464 12.2463C19.3839 13.1087 18.2792 13.6878 17.0792 13.9064C15.8793 14.1251 13.5183 13.4818 12.0265 14.9736L6.6201 20.38C6.22227 20.7778 5.68271 21.0013 5.1201 21.0013C4.55749 21.0013 4.01792 20.7778 3.6201 20.38C3.22227 19.9822 2.99878 19.4426 2.99878 18.88C2.99878 18.3174 3.22227 17.7778 3.6201 17.38L9.02651 11.9736C10.0903 10.9098 9.87502 8.12075 10.0936 6.92083C10.3123 5.72092 10.8914 4.61614 11.7538 3.7537C12.6163 2.89127 13.721 2.31215 14.921 2.09352C15.3559 2.01427 15.796 1.98375 16.2331 2.00101C16.7258 2.02046 16.9721 2.03018 17.2409 2.27294C17.4345 2.44769 17.5902 2.84569 17.5667 3.10537C17.534 3.4661 17.3008 3.69923 16.8346 4.16548L14.7101 6.28998L14.7001 6.29998Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </symbol>
        <symbol id="share-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.66 19.66 8 18 8C16.34 8 15 6.66 15 5C15 3.34 16.34 2 18 2C19.66 2 21 3.34 21 5ZM9 12C9 13.66 7.66 15 6 15C4.34 15 3 13.66 3 12C3 10.34 4.34 9 6 9C7.66 9 9 10.34 9 12ZM21 19C21 20.66 19.66 22 18 22C16.34 22 15 20.66 15 19C15 17.34 16.34 16 18 16C19.66 16 21 17.34 21 19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="share" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 12V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="shield-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_524)">
            <path
              d="M19.69 14C19.89 13.35 20 12.68 20 12V5L12 2L8.84 3.18M4.73 4.73L4 5V12C4 18 12 22 12 22C14.12 20.88 16.02 19.4 17.62 17.62M1 1L23 23"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_524">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="shield" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="shopping-bag" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 6L6 2H18L21 6M3 6V20C3 20.53 3.21 21.04 3.59 21.41C3.96 21.79 4.47 22 5 22H19C19.53 22 20.04 21.79 20.41 21.41C20.79 21.04 21 20.53 21 20V6M3 6H21M16 10C16 11.06 15.58 12.08 14.83 12.83C14.08 13.58 13.06 14 12 14C10.94 14 9.92 13.58 9.17 12.83C8.42 12.08 8 11.06 8 10"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="shopping-cart" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M1 1H5L7.68 14.39C7.77 14.85 8.02 15.26 8.39 15.56C8.75 15.85 9.21 16.01 9.68 16H19.4C19.87 16.01 20.33 15.85 20.69 15.56C21.06 15.26 21.31 14.85 21.4 14.39L23 6H6M10 21C10 21.55 9.55 22 9 22C8.45 22 8 21.55 8 21C8 20.45 8.45 20 9 20C9.55 20 10 20.45 10 21ZM21 21C21 21.55 20.55 22 20 22C19.45 22 19 21.55 19 21C19 20.45 19.45 20 20 20C20.55 20 21 20.45 21 21Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="shuffle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 3H21M21 3V8M21 3L4 20M21 16V21M21 21H16M21 21L15 15M4 4L9 9"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="sidebar-icon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 3V21M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="skip-back" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 19V5M19 20L9 12L19 4V20Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="skip-forward" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 5V19M5 4L15 12L5 20V4Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="slack" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14.5 10C13.67 10 13 9.33 13 8.5V3.5C13 2.67 13.67 2 14.5 2C15.33 2 16 2.67 16 3.5V8.5C16 9.33 15.33 10 14.5 10Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5 10H19V8.5C19 7.67 19.67 7 20.5 7C21.33 7 22 7.67 22 8.5C22 9.33 21.33 10 20.5 10Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.5 14C10.33 14 11 14.67 11 15.5V20.5C11 21.33 10.33 22 9.5 22C8.67 22 8 21.33 8 20.5V15.5C8 14.67 8.67 14 9.5 14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 14H5V15.5C5 16.33 4.33 17 3.5 17C2.67 17 2 16.33 2 15.5C2 14.67 2.67 14 3.5 14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 14.5C14 13.67 14.67 13 15.5 13H20.5C21.33 13 22 13.67 22 14.5C22 15.33 21.33 16 20.5 16H15.5C14.67 16 14 15.33 14 14.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.5 19H14V20.5C14 21.33 14.67 22 15.5 22C16.33 22 17 21.33 17 20.5C17 19.67 16.33 19 15.5 19Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 9.5C10 8.67 9.33 8 8.5 8H3.5C2.67 8 2 8.67 2 9.5C2 10.33 2.67 11 3.5 11H8.5C9.33 11 10 10.33 10 9.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2C7.67 2 7 2.67 7 3.5C7 4.33 7.67 5 8.5 5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="slash" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4.93 4.93L19.07 19.07M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="sliders" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="smartphone" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 18H12.01M7 2H17C18.1 2 19 2.9 19 4V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V4C5 2.9 5.9 2 7 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="smile" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="speaker" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 6H12.01M6 2H18C19.1 2 20 2.9 20 4V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2ZM16 14C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14C8 11.79 9.79 10 12 10C14.21 10 16 11.79 16 14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        <symbol id="spinner">
          <svg
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3887 10C20.3887 15.5228 15.9115 20 10.3887 20C4.86582 20 0.388672 15.5228 0.388672 10C0.388672 4.47715 4.86582 0 10.3887 0C15.9115 0 20.3887 4.47715 20.3887 10ZM3.42975 10C3.42975 13.8433 6.54537 16.9589 10.3887 16.9589C14.232 16.9589 17.3476 13.8433 17.3476 10C17.3476 6.1567 14.232 3.04108 10.3887 3.04108C6.54537 3.04108 3.42975 6.1567 3.42975 10Z"
              fill="#F5F5F5"
            />
            <path
              d="M14.9 17.1798C15.3467 17.8909 15.1355 18.8415 14.365 19.1755C13.0287 19.7545 11.5761 20.0373 10.1081 19.9961C8.13109 19.9406 6.21491 19.3001 4.60189 18.1556C2.98887 17.011 1.75147 15.4139 1.04615 13.5661C0.52244 12.1941 0.309556 10.7297 0.414827 9.27712C0.475528 8.43955 1.30311 7.9262 2.12183 8.11307C2.94054 8.29995 3.43482 9.11917 3.42987 9.95893C3.42482 10.8166 3.57832 11.6722 3.88729 12.4816C4.37811 13.7675 5.23921 14.8789 6.3617 15.6754C7.48418 16.4718 8.81764 16.9176 10.1934 16.9562C11.0595 16.9805 11.9178 16.8428 12.7257 16.5548C13.5167 16.2728 14.4532 16.4687 14.9 17.1798Z"
              fill="black"
            />
          </svg>
        </symbol>

        <symbol id="spinner-red">
          <svg
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3887 10C20.3887 15.5228 15.9115 20 10.3887 20C4.86582 20 0.388672 15.5228 0.388672 10C0.388672 4.47715 4.86582 0 10.3887 0C15.9115 0 20.3887 4.47715 20.3887 10ZM3.42975 10C3.42975 13.8433 6.54537 16.9589 10.3887 16.9589C14.232 16.9589 17.3476 13.8433 17.3476 10C17.3476 6.1567 14.232 3.04108 10.3887 3.04108C6.54537 3.04108 3.42975 6.1567 3.42975 10Z"
              fill="white"
            />
            <path
              d="M14.9 17.1798C15.3467 17.8909 15.1355 18.8415 14.365 19.1755C13.0287 19.7545 11.5761 20.0373 10.1081 19.9961C8.13109 19.9406 6.21491 19.3001 4.60189 18.1556C2.98887 17.011 1.75147 15.4139 1.04615 13.5661C0.52244 12.1941 0.309556 10.7297 0.414827 9.27712C0.475528 8.43955 1.30311 7.9262 2.12183 8.11307C2.94054 8.29995 3.43482 9.11917 3.42987 9.95893C3.42482 10.8166 3.57832 11.6722 3.88729 12.4816C4.37811 13.7675 5.23921 14.8789 6.3617 15.6754C7.48418 16.4718 8.81764 16.9176 10.1934 16.9562C11.0595 16.9805 11.9178 16.8428 12.7257 16.5548C13.5167 16.2728 14.4532 16.4687 14.9 17.1798Z"
              fill="#EF4444"
            />
          </svg>
        </symbol>

        <symbol id="square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="star" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="stop-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 9H9V15H15V9Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="sun" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_558)">
            <path
              d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_558">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="sunrise" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 18C17 16.67 16.47 15.4 15.54 14.46C14.6 13.53 13.33 13 12 13C10.67 13 9.4 13.53 8.46 14.46C7.53 15.4 7 16.67 7 18M12 2V9M12 2L8 6M12 2L16 6M4.22 10.22L5.64 11.64M1 18H3M21 18H23M18.36 11.64L19.78 10.22M23 22H1"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="sunset" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 18C17 16.67 16.47 15.4 15.54 14.46C14.6 13.53 13.33 13 12 13C10.67 13 9.4 13.53 8.46 14.46C7.53 15.4 7 16.67 7 18M12 9V2M12 9L16 5M12 9L8 5M4.22 10.22L5.64 11.64M1 18H3M21 18H23M18.36 11.64L19.78 10.22M23 22H1"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="tablet" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 18H12.01M6 2H18C19.1 2 20 2.9 20 4V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="tag" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7.5 7.5H7.51M21.09 13.91L13.92 21.08C13.73 21.27 13.51 21.41 13.27 21.51C13.03 21.61 12.77 21.67 12.51 21.67C12.24 21.67 11.98 21.61 11.74 21.51C11.5 21.41 11.28 21.27 11.09 21.08L2.5 12.5V2.5H12.5L21.09 11.09C21.46 11.46 21.67 11.97 21.67 12.5C21.67 13.03 21.46 13.54 21.09 13.91Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="target" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="terminal" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 17L10 11L4 5M12 19H20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="thermometer" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_572)">
            <path
              d="M14 14.76V3.5C14 2.84 13.74 2.2 13.27 1.73C12.8 1.26 12.16 1 11.5 1C10.84 1 10.2 1.26 9.73 1.73C9.26 2.2 9 2.84 9 3.5V14.76C8.2 15.3 7.59 16.08 7.26 16.99C6.94 17.89 6.91 18.88 7.19 19.81C7.47 20.73 8.04 21.54 8.82 22.12C9.59 22.69 10.53 23 11.5 23C12.47 23 13.41 22.69 14.18 22.12C14.96 21.54 15.53 20.73 15.81 19.81C16.09 18.88 16.06 17.89 15.74 16.99C15.41 16.08 14.8 15.3 14 14.76Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_572">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="thumbs-down" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 2H19.67C20.24 1.99 20.79 2.19 21.22 2.56C21.64 2.93 21.92 3.44 22 4V11C21.92 11.56 21.64 12.07 21.22 12.44C20.79 12.81 20.24 13.01 19.67 13H17M10 15V19C10 19.8 10.32 20.56 10.88 21.12C11.44 21.68 12.2 22 13 22L17 13V2H5.72C5.24 1.99 4.77 2.16 4.4 2.48C4.03 2.79 3.79 3.22 3.72 3.7L2.34 12.7C2.3 12.99 2.32 13.28 2.4 13.56C2.48 13.84 2.62 14.09 2.81 14.31C3 14.53 3.23 14.71 3.5 14.82C3.76 14.94 4.05 15 4.34 15H10Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="thumbs-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 22H4C3.47 22 2.96 21.79 2.59 21.41C2.21 21.04 2 20.53 2 20V13C2 12.47 2.21 11.96 2.59 11.59C2.96 11.21 3.47 11 4 11H7M14 9V5C14 4.2 13.68 3.44 13.12 2.88C12.56 2.32 11.8 2 11 2L7 11V22H18.28C18.76 22.01 19.23 21.84 19.6 21.52C19.97 21.21 20.21 20.78 20.28 20.3L21.66 11.3C21.7 11.01 21.68 10.72 21.6 10.44C21.52 10.16 21.38 9.91 21.19 9.69C21 9.47 20.77 9.29 20.5 9.18C20.24 9.06 19.95 9 19.66 9H14Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="toggle-left" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 5H8C4.13 5 1 8.13 1 12C1 15.87 4.13 19 8 19H16C19.87 19 23 15.87 23 12C23 8.13 19.87 5 16 5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 15C9.66 15 11 13.66 11 12C11 10.34 9.66 9 8 9C6.34 9 5 10.34 5 12C5 13.66 6.34 15 8 15Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="toggle-right" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 5H8C4.13 5 1 8.13 1 12C1 15.87 4.13 19 8 19H16C19.87 19 23 15.87 23 12C23 8.13 19.87 5 16 5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 15C17.66 15 19 13.66 19 12C19 10.34 17.66 9 16 9C14.34 9 13 10.34 13 12C13 13.66 14.34 15 16 15Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="tool" viewBox="0 0 15 15">
          <path
            d="M8.7999 4.0898C8.67775 4.21442 8.60933 4.38196 8.60933 4.55646C8.60933 4.73097 8.67775 4.89851 8.7999 5.02313L9.86657 6.0898C9.99119 6.21195 10.1587 6.28037 10.3332 6.28037C10.5077 6.28037 10.6753 6.21195 10.7999 6.0898L11.6777 5.21197C12.0317 4.858 12.2087 4.68102 12.6037 4.66815C12.8644 4.65967 13.3148 4.88808 13.4619 5.10336C13.6849 5.42969 13.664 5.56524 13.6221 5.83634C13.6166 5.87179 13.6107 5.9072 13.6042 5.94256C13.4585 6.7425 13.0724 7.47903 12.4974 8.05398C11.9225 8.62894 11.1859 9.01502 10.386 9.16077C9.58606 9.30652 8.01201 8.87769 7.01751 9.87219L3.41324 13.4765C3.14802 13.7417 2.78831 13.8907 2.41324 13.8907C2.03816 13.8907 1.67845 13.7417 1.41324 13.4765C1.14802 13.2112 0.999023 12.8515 0.999023 12.4765C0.999023 12.1014 1.14802 11.7417 1.41324 11.4765L5.01751 7.87219C5.7267 7.163 5.58318 5.30364 5.72893 4.5037C5.87468 3.70376 6.26076 2.96723 6.83572 2.39228C7.41067 1.81732 8.1472 1.43124 8.94714 1.28549C8.9825 1.27905 9.01791 1.27309 9.05336 1.26761C9.32446 1.22572 9.46001 1.20478 9.78635 1.42782C10.0016 1.57495 10.23 2.02534 10.2215 2.28595C10.2087 2.68102 10.0317 2.858 9.67774 3.21197L8.80657 4.08313L8.7999 4.0898Z"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="trash-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 6H5M5 6H21M5 6V20C5 20.53 5.21 21.04 5.59 21.41C5.96 21.79 6.47 22 7 22H17C17.53 22 18.04 21.79 18.41 21.41C18.79 21.04 19 20.53 19 20V6H5ZM8 6V4C8 3.47 8.21 2.96 8.59 2.59C8.96 2.21 9.47 2 10 2H14C14.53 2 15.04 2.21 15.41 2.59C15.79 2.96 16 3.47 16 4V6M10 11V17M14 11V17"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="trash" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 6H5M5 6H21M5 6V20C5 20.53 5.21 21.04 5.59 21.41C5.96 21.79 6.47 22 7 22H17C17.53 22 18.04 21.79 18.41 21.41C18.79 21.04 19 20.53 19 20V6H5ZM8 6V4C8 3.47 8.21 2.96 8.59 2.59C8.96 2.21 9.47 2 10 2H14C14.53 2 15.04 2.21 15.41 2.59C15.79 2.96 16 3.47 16 4V6"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="trello" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 7H7V16H10V7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17 7H14V12H17V7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="trending-down" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 18L13.5 8.5L8.5 13.5L1 6M23 18H17M23 18V12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="trending-up" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="triangle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10.29 3.86L1.82 18C1.65 18.3 1.55 18.65 1.55 18.99C1.55 19.34 1.64 19.69 1.81 19.99C1.99 20.29 2.24 20.55 2.54 20.72C2.84 20.9 3.18 21 3.53 21H20.47C20.82 21 21.16 20.9 21.46 20.72C21.76 20.55 22.01 20.29 22.19 19.99C22.36 19.69 22.45 19.34 22.45 18.99C22.45 18.65 22.35 18.3 22.18 18L13.71 3.86C13.53 3.57 13.28 3.32 12.98 3.15C12.68 2.99 12.34 2.9 12 2.9C11.66 2.9 11.32 2.99 11.02 3.15C10.72 3.32 10.47 3.57 10.29 3.86V3.86Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="truck" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 16V3H1V16H16ZM16 16H23V11L20 8H16V16ZM8 18.5C8 19.88 6.88 21 5.5 21C4.12 21 3 19.88 3 18.5C3 17.12 4.12 16 5.5 16C6.88 16 8 17.12 8 18.5ZM21 18.5C21 19.88 19.88 21 18.5 21C17.12 21 16 19.88 16 18.5C16 17.12 17.12 16 18.5 16C19.88 16 21 17.12 21 18.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="tv" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 2L12 7L7 2M4 7H20C21.1 7 22 7.9 22 9V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V9C2 7.9 2.9 7 4 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="twitch" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 11V7M21 2H3V18H8V22L12 18H17L21 14V2ZM11 11V7V11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="twitter" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 3C22.04 3.68 20.98 4.19 19.86 4.53C19.26 3.84 18.46 3.35 17.57 3.12C16.68 2.9 15.74 2.96 14.88 3.28C14.02 3.61 13.29 4.19 12.77 4.95C12.26 5.71 11.99 6.61 12 7.53V8.53C10.24 8.58 8.5 8.19 6.93 7.4C5.36 6.61 4.01 5.44 3 4C3 4 -1 13 8 17C5.94 18.4 3.49 19.1 1 19C10 24 21 19 21 7.5C21 7.22 20.97 6.94 20.92 6.67C21.94 5.66 22.66 4.39 23 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="type" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4 7V4H20V7M9 20H15M12 4V20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="umbrella" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 19C18 19.8 17.68 20.56 17.12 21.12C16.56 21.68 15.8 22 15 22C14.2 22 13.44 21.68 12.88 21.12C12.32 20.56 12 19.8 12 19V12M23 12C22.74 9.26 21.47 6.72 19.43 4.87C17.4 3.02 14.75 2 12 2C9.25 2 6.6 3.02 4.57 4.87C2.53 6.72 1.26 9.26 1 12H23Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="underline" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 3V10C6 11.59 6.63 13.12 7.76 14.24C8.88 15.37 10.41 16 12 16C13.59 16 15.12 15.37 16.24 14.24C17.37 13.12 18 11.59 18 10V3M4 21H20"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="unlock" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 11V7C7 5.76 7.46 4.56 8.29 3.64C9.12 2.72 10.26 2.14 11.5 2.02C12.73 1.9 13.97 2.23 14.97 2.97C15.96 3.7 16.65 4.78 16.9 6M5 11H19C20.1 11 21 11.9 21 13V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V13C3 11.9 3.9 11 5 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="upload-cloud" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_612)">
            <path
              d="M16 16L12 12M12 12L8 16M12 12V21M20.39 18.39C21.37 17.86 22.14 17.02 22.58 16C23.02 14.98 23.12 13.84 22.84 12.77C22.57 11.69 21.94 10.74 21.07 10.05C20.19 9.37 19.11 9 18 9H16.74C16.44 7.83 15.87 6.74 15.09 5.82C14.31 4.9 13.32 4.17 12.22 3.68C11.11 3.19 9.91 2.96 8.7 3.01C7.49 3.05 6.31 3.37 5.24 3.94C4.17 4.51 3.25 5.31 2.53 6.28C1.82 7.26 1.34 8.39 1.12 9.58C0.91 10.77 0.96 11.99 1.29 13.15C1.61 14.32 2.2 15.39 3 16.3"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_612">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="upload" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 15V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="user-check" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 21V19C16 17.94 15.58 16.92 14.83 16.17C14.08 15.42 13.06 15 12 15H5C3.94 15 2.92 15.42 2.17 16.17C1.42 16.92 1 17.94 1 19V21M17 11L19 13L23 9M12.5 7C12.5 9.21 10.71 11 8.5 11C6.29 11 4.5 9.21 4.5 7C4.5 4.79 6.29 3 8.5 3C10.71 3 12.5 4.79 12.5 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="user-minus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 21V19C16 17.94 15.58 16.92 14.83 16.17C14.08 15.42 13.06 15 12 15H5C3.94 15 2.92 15.42 2.17 16.17C1.42 16.92 1 17.94 1 19V21M23 11H17M12.5 7C12.5 9.21 10.71 11 8.5 11C6.29 11 4.5 9.21 4.5 7C4.5 4.79 6.29 3 8.5 3C10.71 3 12.5 4.79 12.5 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="user-plus" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 21V19C16 17.94 15.58 16.92 14.83 16.17C14.08 15.42 13.06 15 12 15H5C3.94 15 2.92 15.42 2.17 16.17C1.42 16.92 1 17.94 1 19V21M20 8V14M23 11H17M12.5 7C12.5 9.21 10.71 11 8.5 11C6.29 11 4.5 9.21 4.5 7C4.5 4.79 6.29 3 8.5 3C10.71 3 12.5 4.79 12.5 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="user-x" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16 21V19C16 17.94 15.58 16.92 14.83 16.17C14.08 15.42 13.06 15 12 15H5C3.94 15 2.92 15.42 2.17 16.17C1.42 16.92 1 17.94 1 19V21M18 8L23 13M23 8L18 13M12.5 7C12.5 9.21 10.71 11 8.5 11C6.29 11 4.5 9.21 4.5 7C4.5 4.79 6.29 3 8.5 3C10.71 3 12.5 4.79 12.5 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="user" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20 21V19C20 17.94 19.58 16.92 18.83 16.17C18.08 15.42 17.06 15 16 15H8C6.94 15 5.92 15.42 5.17 16.17C4.42 16.92 4 17.94 4 19V21M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="users" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17 21V19C17 17.94 16.58 16.92 15.83 16.17C15.08 15.42 14.06 15 13 15H5C3.94 15 2.92 15.42 2.17 16.17C1.42 16.92 1 17.94 1 19V21M23 21V19C23 18.11 22.7 17.25 22.16 16.55C21.62 15.85 20.86 15.35 20 15.13M16 3.13C16.86 3.35 17.62 3.85 18.17 4.55C18.71 5.25 19.01 6.12 19.01 7C19.01 7.89 18.71 8.76 18.17 9.46C17.62 10.16 16.86 10.66 16 10.88M13 7C13 9.21 11.21 11 9 11C6.79 11 5 9.21 5 7C5 4.79 6.79 3 9 3C11.21 3 13 4.79 13 7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="video-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_628)">
            <path
              d="M10.66 5H14C14.53 5 15.04 5.21 15.41 5.59C15.79 5.96 16 6.47 16 7V10.34L17 11.34L23 7V17M1 1L23 23M16 16V17C16 17.53 15.79 18.04 15.41 18.41C15.04 18.79 14.53 19 14 19H3C2.47 19 1.96 18.79 1.59 18.41C1.21 18.04 1 17.53 1 17V7C1 6.47 1.21 5.96 1.59 5.59C1.96 5.21 2.47 5 3 5H5L16 16Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_628">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="video" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 7L16 12L23 17V7Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 5H3C1.9 5 1 5.9 1 7V17C1 18.1 1.9 19 3 19H14C15.1 19 16 18.1 16 17V7C16 5.9 15.1 5 14 5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="voicemail" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5.5 16C7.99 16 10 13.99 10 11.5C10 9.01 7.99 7 5.5 7C3.01 7 1 9.01 1 11.5C1 13.99 3.01 16 5.5 16ZM5.5 16H18.5M18.5 16C20.99 16 23 13.99 23 11.5C23 9.01 20.99 7 18.5 7C16.01 7 14 9.01 14 11.5C14 13.99 16.01 16 18.5 16Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="volume-1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15.54 8.46C16.48 9.4 17 10.67 17 11.99C17 13.32 16.48 14.59 15.54 15.53M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="volume-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19.07 4.93C20.94 6.81 22 9.35 22 12C22 14.65 20.94 17.19 19.07 19.07M15.54 8.46C16.48 9.4 17 10.67 17 11.99C17 13.32 16.48 14.59 15.54 15.53M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="volume-x" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 9L17 15M17 9L23 15M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="volume" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="watch" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 9V12L13.5 13.5M16.51 17.35L16.16 21.18C16.11 21.68 15.88 22.14 15.51 22.48C15.14 22.82 14.66 23 14.16 23H9.83C9.33 23 8.85 22.82 8.48 22.48C8.11 22.14 7.88 21.68 7.83 21.18L7.48 17.35M7.49 6.65L7.84 2.82C7.88 2.32 8.11 1.86 8.48 1.52C8.85 1.19 9.33 1 9.83 1H14.18C14.68 1 15.16 1.18 15.53 1.52C15.9 1.86 16.13 2.32 16.18 2.82L16.53 6.65M19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="wifi-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_644)">
            <path
              d="M1 1L23 23M16.72 11.06C17.54 11.46 18.3 11.96 19 12.55M5 12.55C6.48 11.31 8.27 10.49 10.17 10.16M10.71 5.05C12.85 4.88 15.01 5.14 17.05 5.82C19.09 6.5 20.97 7.58 22.58 9M1.42 9C2.81 7.77 4.4 6.8 6.12 6.12M8.53 16.11C9.55 15.39 10.76 15 12.01 15C13.25 15 14.46 15.39 15.48 16.11M12 20H12.01"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_644">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="wifi" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 12.55C6.98 10.9 9.47 10 12.04 10C14.61 10 17.1 10.9 19.08 12.55M1.42 9C4.34 6.42 8.1 5 12 5C15.9 5 19.66 6.42 22.58 9M8.53 16.11C9.55 15.39 10.76 15 12 15C13.25 15 14.46 15.39 15.48 16.11M12 20H12.01"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="wind" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9.59 4.59C9.82 4.36 10.11 4.18 10.42 4.09C10.74 3.99 11.07 3.97 11.4 4.04C11.72 4.1 12.02 4.24 12.28 4.45C12.53 4.66 12.73 4.93 12.86 5.24C12.98 5.54 13.03 5.87 13 6.2C12.97 6.53 12.85 6.84 12.67 7.12C12.48 7.39 12.24 7.61 11.95 7.77C11.65 7.92 11.33 8 11 8H2M12.59 19.41C12.82 19.64 13.11 19.82 13.42 19.91C13.74 20.01 14.07 20.03 14.4 19.96C14.72 19.9 15.02 19.76 15.28 19.55C15.53 19.34 15.73 19.07 15.86 18.76C15.98 18.46 16.03 18.13 16 17.8C15.97 17.47 15.85 17.16 15.67 16.88C15.48 16.61 15.24 16.39 14.95 16.23C14.65 16.08 14.33 16 14 16H2M17.73 7.73C18.02 7.44 18.38 7.23 18.77 7.11C19.17 6.99 19.58 6.97 19.98 7.05C20.39 7.13 20.76 7.31 21.08 7.57C21.4 7.83 21.65 8.16 21.8 8.54C21.96 8.92 22.02 9.33 21.98 9.74C21.94 10.15 21.8 10.54 21.58 10.89C21.35 11.23 21.04 11.51 20.68 11.7C20.32 11.9 19.91 12 19.5 12H2"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="x-circle" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 9L9 15M9 9L15 15M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="x-octagon" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 9L9 15M9 9L15 15M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="x-square" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 9L15 15M15 9L9 15M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="x" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="youtube" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22.54 6.42C22.42 5.95 22.18 5.51 21.84 5.16C21.5 4.81 21.07 4.55 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.93 4.59 2.5 4.85 2.16 5.2C1.82 5.55 1.58 5.99 1.46 6.46C1.15 8.21 0.99 9.98 1 11.75C0.99 13.54 1.14 15.32 1.46 17.08C1.59 17.54 1.84 17.96 2.18 18.29C2.52 18.63 2.94 18.87 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.07 18.87 21.5 18.61 21.84 18.26C22.18 17.91 22.42 17.47 22.54 17C22.85 15.27 23.01 13.51 23 11.75C23.01 9.96 22.86 8.18 22.54 6.42Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="zap-off" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_660)">
            <path
              d="M12.41 6.75L13 2L10.57 4.92M18.57 12.91L21 10H15.66M8 8L3 14H12L11 22L16 16M1 1L23 23"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_660">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="zap" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="zoom-in" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 21L16.65 16.65M11 8V14M8 11H14M19 11C19 15.42 15.42 19 11 19C6.58 19 3 15.42 3 11C3 6.58 6.58 3 11 3C15.42 3 19 6.58 19 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="zoom-out" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 21L16.65 16.65M8 11H14M19 11C19 15.42 15.42 19 11 19C6.58 19 3 15.42 3 11C3 6.58 6.58 3 11 3C15.42 3 19 6.58 19 11Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="slash-divider" width="24" height="24" viewBox="0 0 24 24">
          <line
            x1="7.51631"
            y1="22.1711"
            x2="16.8139"
            y2="2.2323"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="2-layers" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M2 14.5L12 19.5L22 14.5M12 4.5L2 9.5L12 14.5L22 9.5L12 4.5Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="3-layers" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="filters-lines" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M6 12H18M3 6H21M9 18H15"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="coins" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9.42 4.16C12.3 1.28 16.96 1.28 19.84 4.16C22.72 7.03 22.72 11.7 19.84 14.58M16.74 14.63C16.74 18.7 13.44 22 9.37 22C5.3 22 2 18.7 2 14.63C2 10.56 5.3 7.26 9.37 7.26C13.44 7.26 16.74 10.56 16.74 14.63Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="coin-stack" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14.18 4.22C14.18 2.99 11.67 2 8.59 2C5.5 2 3 3 3 4.22M3 4.22C3 5.45 5.5 6.44 8.59 6.44C11.68 6.44 14.18 5.45 14.18 4.22L14.18 12.84M3 4.22V17.56C3 18.78 5.5 19.78 8.59 19.78C10.08 19.78 11.44 19.54 12.44 19.16M3 8.67C3 9.89 5.5 10.89 8.59 10.89C11.68 10.89 14.18 9.89 14.18 8.67M12.51 14.69C11.5 15.09 10.12 15.33 8.59 15.33C5.5 15.33 3 14.34 3 13.11M20.53 13.46C22.49 15.42 22.49 18.58 20.53 20.54C18.56 22.49 15.38 22.49 13.41 20.54C11.45 18.58 11.45 15.42 13.41 13.46C15.38 11.51 18.56 11.51 20.53 13.46Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="rocket" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13.32 10.68L5.44 18.56M6.29 12.84L2.43 11.93C2 11.82 1.86 11.3 2.16 10.99L5.23 7.92C5.44 7.71 5.72 7.59 6.01 7.59L9.48 7.56M13.84 3.6C16.41 5.36 18.64 7.59 20.4 10.16M11.16 17.71L12.07 21.57C12.17 22 12.7 22.14 13.01 21.84L16.08 18.77C16.29 18.56 16.41 18.28 16.41 17.99L16.44 14.52M21.06 8.35L21.96 4.01C22.21 2.83 21.17 1.79 19.99 2.04L15.65 2.94C14.37 3.2 13.2 3.83 12.28 4.76L8.72 8.31C7.37 9.67 6.48 11.43 6.2 13.33L6.19 13.41C6.02 14.62 6.42 15.85 7.29 16.71C8.15 17.58 9.38 17.98 10.59 17.81L10.67 17.79C12.57 17.52 14.33 16.63 15.69 15.28L19.24 11.72C20.17 10.8 20.8 9.63 21.06 8.35Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="filteroff" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14 11.8V22.38L10 20.38V13.84L2 4.38H7.71M12.22 4.38H22L17.14 10.3M5.37 1.62L12.97 10.3L21.5 19.76"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="options" width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="20" r="2" fill="currentColor" />
        </symbol>
        <symbol id="vacation" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_2901_693)">
            <path
              d="M10.93 9.63C9.92 11.18 8.42 15.18 8.55 19.72"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.9 10.24C12.99 11.66 12.27 16.09 12.49 19.72"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.86 9.33C6.72 9.71 5.16 10.83 4.56 11.62C4.34 11.05 4.26 10.44 4.33 9.81C4.4 9.19 4.62 8.57 4.99 7.99C5.35 7.41 5.84 6.88 6.44 6.43C7.04 5.98 7.73 5.62 8.47 5.37C8.57 5.33 8.67 5.3 8.77 5.27C5.65 4.43 1.18 5.21 1.18 5.21C1.58 4.38 2.16 3.64 2.89 3.02C3.62 2.41 4.49 1.93 5.44 1.62C6.39 1.31 7.4 1.17 8.43 1.21C9.45 1.26 10.46 1.48 11.4 1.86C12.15 2.17 12.84 2.58 13.46 3.08C13.64 2.99 13.82 2.92 14 2.85C14.78 2.57 15.61 2.43 16.46 2.43C17.3 2.43 18.13 2.57 18.91 2.85C19.68 3.13 20.39 3.54 20.99 4.06C21.58 4.58 22.05 5.19 22.37 5.87C22.7 6.54 23.28 8.08 23.28 8.81C21.32 7.38 18.51 5.88 16.14 5.95C16.85 6.22 17.51 6.59 18.09 7.04C18.74 7.55 19.28 8.15 19.67 8.81C20.06 9.47 20.3 10.18 20.36 10.9C20.43 11.61 20.33 12.32 20.06 12.98C19.42 12.08 17.56 10.62 16.46 10.13"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.37 22.76C19.9 22.23 19.2 21.74 18.32 21.33C17.45 20.93 16.4 20.6 15.26 20.38C14.11 20.16 12.88 20.04 11.64 20.04C10.4 20.04 9.17 20.16 8.02 20.38C6.88 20.6 5.83 20.93 4.96 21.33C4.08 21.74 3.38 22.23 2.91 22.76"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2901_693">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="books" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3.48 15.61C3.48 15.1 3.68 14.62 4.04 14.26C4.4 13.9 4.88 13.7 5.39 13.7H6.73M3.48 15.61C3.48 16.12 3.68 16.6 4.04 16.96C4.4 17.32 4.88 17.52 5.39 17.52H7.2M3.48 15.61V4.14C3.48 3.63 3.68 3.15 4.04 2.79C4.4 2.43 4.88 2.23 5.39 2.23H15.71V4.88"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.69 19.77C7.69 19.23 7.9 18.72 8.28 18.35C8.65 17.97 9.16 17.76 9.69 17.76H20.52M7.69 19.77C7.69 20.3 7.9 20.81 8.28 21.18C8.65 21.56 9.16 21.77 9.69 21.77H20.52V5.73H9.69C9.16 5.73 8.65 5.94 8.28 6.32C7.9 6.69 7.69 7.2 7.69 7.74V19.77Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="target" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_3081_1385)">
            <path
              d="M12 7C11.01 7 10.04 7.29 9.22 7.84C8.4 8.39 7.76 9.17 7.38 10.09C7 11 6.9 12.01 7.1 12.98C7.29 13.95 7.77 14.84 8.46 15.54C9.16 16.23 10.05 16.71 11.02 16.9C11.99 17.1 13 17 13.91 16.62C14.83 16.24 15.61 15.6 16.16 14.78C16.71 13.96 17 12.99 17 12M13 3.05C11.15 2.85 9.27 3.22 7.64 4.12C6.01 5.03 4.7 6.41 3.89 8.09C3.08 9.78 2.81 11.67 3.12 13.51C3.44 15.35 4.31 17.04 5.63 18.36C6.95 19.68 8.65 20.56 10.49 20.87C12.32 21.18 14.22 20.92 15.9 20.11C17.58 19.3 18.97 17.99 19.87 16.36C20.77 14.73 21.15 12.85 20.94 11M15 9V6L18 3V6H21L18 9H15ZM15 9L12 12M11 12C11 12.27 11.11 12.52 11.29 12.71C11.48 12.89 11.73 13 12 13C12.27 13 12.52 12.89 12.71 12.71C12.89 12.52 13 12.27 13 12C13 11.73 12.89 11.48 12.71 11.29C12.52 11.11 12.27 11 12 11C11.73 11 11.48 11.11 11.29 11.29C11.11 11.48 11 11.73 11 12Z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_3081_1385">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="learn" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_3081_1386)">
            <path
              d="M22 9L12 5L2 9L12 13L22 9ZM22 9V15M6 10.6V16C6 16.8 6.63 17.56 7.76 18.12C8.88 18.68 10.41 19 12 19C13.59 19 15.12 18.68 16.24 18.12C17.37 17.56 18 16.8 18 16V10.6"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_3081_1386">
              <rect width="24" height="24" fill="none" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="gym" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_3685_2313)">
            <path
              d="M20.06 21.28C20.45 21.67 21.09 21.67 21.48 21.28C21.87 20.89 21.87 20.26 21.48 19.87L20.06 21.28ZM4.13 2.52C3.74 2.13 3.11 2.13 2.72 2.52C2.33 2.91 2.33 3.55 2.72 3.94L4.13 2.52ZM8.88 4.58L8.17 3.87L8.88 4.58ZM2.84 10.62L2.13 9.91L2.84 10.62ZM5.56 13.35L4.86 12.64L5.56 13.35ZM13.35 5.56L14.05 6.27L13.35 5.56ZM8.85 10.06L13.94 15.15L15.35 13.74L10.26 8.65L8.85 10.06ZM11.33 3.54L12.64 4.86L14.05 3.44L12.74 2.13L11.33 3.54ZM12.64 4.86L4.86 12.64L6.27 14.05L14.05 6.27L12.64 4.86ZM4.86 12.64L3.54 11.33L2.13 12.74L3.44 14.05L4.86 12.64ZM3.54 11.33L11.33 3.54L9.91 2.13L2.13 9.91L3.54 11.33ZM19.14 11.36L20.46 12.67L21.87 11.26L20.56 9.95L19.14 11.36ZM20.46 12.67L12.67 20.46L14.09 21.87L21.87 14.09L20.46 12.67ZM12.67 20.46L11.36 19.14L9.95 20.56L11.26 21.87L12.67 20.46ZM11.36 19.14L19.14 11.36L17.73 9.95L9.95 17.73L11.36 19.14ZM20.13 15.83L20.88 16.58L22.3 15.17L21.54 14.41L20.13 15.83ZM20.88 16.58L16.58 20.88L18 22.3L22.3 18L20.88 16.58ZM16.58 20.88L15.83 20.13L14.41 21.54L15.17 22.3L16.58 20.88ZM15.83 20.13L20.13 15.83L18.72 14.41L14.41 18.72L15.83 20.13ZM7.42 3.12L8.17 3.87L9.59 2.46L8.83 1.7L7.42 3.12ZM8.17 3.87L3.87 8.17L5.28 9.59L9.59 5.28L8.17 3.87ZM3.87 8.17L3.12 7.42L1.7 8.83L2.46 9.59L3.87 8.17ZM3.12 7.42L7.42 3.12L6 1.7L1.7 6L3.12 7.42ZM18.83 20.05L20.06 21.28L21.48 19.87L20.25 18.63L18.83 20.05ZM5.37 3.75L4.13 2.52L2.72 3.94L3.95 5.17L5.37 3.75ZM3.12 7.42L3.12 7.42L1.7 6C0.92 6.78 0.92 8.05 1.7 8.83L3.12 7.42ZM3.87 8.17L3.87 8.17L2.46 9.59C3.24 10.37 4.5 10.37 5.28 9.59L3.87 8.17ZM8.17 3.87L8.17 3.87L9.59 5.28C10.37 4.5 10.37 3.24 9.59 2.46L8.17 3.87ZM8.83 1.7C8.05 0.92 6.78 0.92 6 1.7L7.42 3.12H7.42L8.83 1.7ZM15.83 20.13L14.41 18.72C13.63 19.5 13.63 20.76 14.41 21.54L15.83 20.13ZM16.58 20.88L16.58 20.88L15.17 22.3C15.95 23.08 17.22 23.08 18 22.3L16.58 20.88ZM20.88 16.58L22.3 18C23.08 17.22 23.08 15.95 22.3 15.17L20.88 16.58ZM21.54 14.41C20.76 13.63 19.5 13.63 18.72 14.41L20.13 15.83L20.13 15.83L21.54 14.41ZM11.36 19.14L11.36 19.14L9.95 17.73C9.17 18.51 9.17 19.78 9.95 20.56L11.36 19.14ZM12.67 20.46L12.67 20.46L11.26 21.87C12.04 22.65 13.31 22.65 14.09 21.87L12.67 20.46ZM20.46 12.67L21.87 14.09C22.65 13.31 22.65 12.04 21.87 11.26L20.46 12.67ZM20.56 9.95C19.78 9.17 18.51 9.17 17.73 9.95L19.14 11.36L19.14 11.36L20.56 9.95ZM3.54 11.33L3.54 11.33L2.13 9.91C1.35 10.69 1.35 11.96 2.13 12.74L3.54 11.33ZM4.86 12.64L4.86 12.64L3.44 14.05C4.22 14.83 5.49 14.83 6.27 14.05L4.86 12.64ZM12.64 4.86L14.05 6.27C14.83 5.49 14.83 4.22 14.05 3.44L12.64 4.86ZM12.74 2.13C11.96 1.35 10.69 1.35 9.91 2.13L11.33 3.54L11.33 3.54L12.74 2.13Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_3685_2313">
              <rect width="24" height="24" fill="currentColor" />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="qr-code" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M2.61 3.85C2.61 3.3 3.06 2.85 3.61 2.85H7.91C8.46 2.85 8.91 3.3 8.91 3.85V8.15C8.91 8.7 8.46 9.15 7.91 9.15H3.61C3.06 9.15 2.61 8.7 2.61 8.15V3.85Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M15.09 3.85C15.09 3.3 15.54 2.85 16.09 2.85H20.39C20.94 2.85 21.39 3.3 21.39 3.85V8.15C21.39 8.7 20.94 9.15 20.39 9.15H16.09C15.54 9.15 15.09 8.7 15.09 8.15V3.85Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M2.61 15.85C2.61 15.3 3.06 14.85 3.61 14.85H7.91C8.46 14.85 8.91 15.3 8.91 15.85V20.15C8.91 20.7 8.46 21.15 7.91 21.15H3.61C3.06 21.15 2.61 20.7 2.61 20.15V15.85Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <rect
            x="13.6011"
            y="18.7571"
            width="3.29736"
            height="3.28357"
            rx="1"
            fill="currentColor"
          />
          <rect
            x="13.6011"
            y="14.0337"
            width="3.29736"
            height="3.28357"
            rx="1"
            fill="currentColor"
          />
          <rect
            x="18.0913"
            y="18.7571"
            width="3.29736"
            height="3.28357"
            rx="1"
            fill="currentColor"
          />
          <rect
            x="18.0913"
            y="14.0337"
            width="3.29736"
            height="3.28357"
            rx="1"
            fill="currentColor"
          />
        </symbol>
        <symbol id="sort-2" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M8.13 9.5L12.13 5.5L16.13 9.5M16.13 15.5L12.13 19.5L8.13 15.5"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="text" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_4091_15583)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.21 17.34L10.77 13.23L14.02 3.97C14.36 3.03 15.24 2.41 16.23 2.41C17.23 2.41 18.11 3.03 18.45 3.97L24.04 19.49C24.37 20.42 23.68 21.4 22.7 21.4C22.09 21.4 21.55 21.01 21.35 20.44L19.95 16.37H12.53L12.21 17.34ZM13.36 13.96H19.11L16.34 5.93C16.32 5.89 16.28 5.86 16.24 5.86C16.2 5.86 16.16 5.89 16.14 5.93L13.36 13.96Z"
              fill="currentColor"
            />
            <path
              d="M2.8 20.49C2.62 21.03 2.11 21.4 1.54 21.4C0.64 21.4 0 20.51 0.3 19.65L3.42 10.61C3.75 9.65 4.65 9.01 5.66 9.01C6.67 9.01 7.57 9.65 7.89 10.61L11.01 19.65C11.31 20.51 10.67 21.4 9.77 21.4C9.19 21.4 8.69 21.03 8.51 20.49L5.72 11.89C5.71 11.86 5.69 11.84 5.66 11.84C5.63 11.84 5.6 11.86 5.59 11.89L2.8 20.49ZM2.33 17.55C2.33 16.99 2.78 16.53 3.35 16.53H7.93C8.5 16.53 8.95 16.99 8.95 17.55C8.95 18.12 8.5 18.57 7.93 18.57H3.35C2.78 18.57 2.33 18.12 2.33 17.55Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_4091_15583">
              <rect
                width="24"
                height="24"
                fill="none"
                transform="translate(0.107422)"
              />
            </clipPath>
          </defs>
        </symbol>
        <symbol id="collapse" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21 22.11L21 2.96M9.08 17.5L4.08 12.5M4.08 12.5L9.08 7.5M4.08 12.5H16.08"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>
        <symbol id="expand" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M4.08 21.61L4.09 2.46M16 17L21 12M21 12L16 7M21 12H9"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </symbol>

        {/**
         * Use clipPathUnits="objectBoundingBox" to make the clip path relative to the bounding box of the element
         * The viewBox of the clip path should be 1x1
         */}

        <clipPath id="leaderboard-badge" clipPathUnits="objectBoundingBox">
          <path d="M0.266683 0.0909303C0.306888 0.0877204 0.345054 0.0719069 0.375748 0.045742C0.410415 0.016216 0.454463 0 0.5 0C0.545537 0 0.589585 0.016216 0.624252 0.045742C0.654946 0.0719069 0.693112 0.0877204 0.733317 0.0909303C0.778719 0.0945589 0.821345 0.114241 0.853552 0.146448C0.885759 0.178655 0.905441 0.221281 0.90907 0.266683C0.912257 0.306872 0.92807 0.34506 0.954258 0.375748C0.983784 0.410415 1 0.454463 1 0.5C1 0.545537 0.983784 0.589585 0.954258 0.624252C0.928093 0.654946 0.91228 0.693112 0.90907 0.733317C0.905441 0.778719 0.885759 0.821345 0.853552 0.853552C0.821345 0.885759 0.778719 0.905441 0.733317 0.90907C0.693112 0.91228 0.654946 0.928093 0.624252 0.954258C0.589585 0.983784 0.545537 1 0.5 1C0.454463 1 0.410415 0.983784 0.375748 0.954258C0.345054 0.928093 0.306888 0.91228 0.266683 0.90907C0.221281 0.905441 0.178655 0.885759 0.146448 0.853552C0.114241 0.821345 0.0945589 0.778719 0.0909303 0.733317C0.0877204 0.693112 0.0719069 0.654946 0.045742 0.624252C0.016216 0.589585 0 0.545537 0 0.5C0 0.454463 0.016216 0.410415 0.045742 0.375748C0.0719069 0.345054 0.0877204 0.306888 0.0909303 0.266683C0.0945589 0.221281 0.114241 0.178655 0.146448 0.146448C0.178655 0.114241 0.221281 0.0945589 0.266683 0.0909303Z" />
        </clipPath>
      </defs>
      <symbol id="projects" width="24" height="24" viewBox="0 0 24 24">
        <g xmlns="http://www.w3.org/2000/svg" id="surface1">
          <path style="fill:none;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;stroke:currentColor;stroke-opacity:1;stroke-miterlimit:4;" d="M 9.333333 3.28125 L 14.666667 3.28125 M 12 0.615234 L 12 5.949707 M 3.466146 5.949707 L 4.533854 5.949707 C 5.28125 5.949707 5.653646 5.949707 5.940104 5.803223 C 6.190104 5.67627 6.393229 5.471191 6.520833 5.219727 C 6.666667 4.936523 6.666667 4.562988 6.666667 3.815918 L 6.666667 2.749023 C 6.666667 2.001953 6.666667 1.628418 6.520833 1.342773 C 6.393229 1.091309 6.190104 0.888672 5.940104 0.761719 C 5.653646 0.615234 5.28125 0.615234 4.533854 0.615234 L 3.466146 0.615234 C 2.721354 0.615234 2.346354 0.615234 2.0625 0.761719 C 1.809896 0.888672 1.606771 1.091309 1.479167 1.342773 C 1.333333 1.628418 1.333333 2.001953 1.333333 2.749023 L 1.333333 3.815918 C 1.333333 4.562988 1.333333 4.936523 1.479167 5.219727 C 1.606771 5.471191 1.809896 5.67627 2.0625 5.803223 C 2.346354 5.949707 2.721354 5.949707 3.466146 5.949707 Z M 3.466146 13.947754 L 4.533854 13.947754 C 5.28125 13.947754 5.653646 13.947754 5.940104 13.803711 C 6.190104 13.674316 6.393229 13.47168 6.520833 13.220215 C 6.666667 12.93457 6.666667 12.561035 6.666667 11.816406 L 6.666667 10.749512 C 6.666667 10.002441 6.666667 9.628906 6.520833 9.343262 C 6.393229 9.091797 6.190104 8.88916 5.940104 8.759766 C 5.653646 8.615723 5.28125 8.615723 4.533854 8.615723 L 3.466146 8.615723 C 2.721354 8.615723 2.346354 8.615723 2.0625 8.759766 C 1.809896 8.88916 1.606771 9.091797 1.479167 9.343262 C 1.333333 9.628906 1.333333 10.002441 1.333333 10.749512 L 1.333333 11.816406 C 1.333333 12.561035 1.333333 12.93457 1.479167 13.220215 C 1.606771 13.47168 1.809896 13.674316 2.0625 13.803711 C 2.346354 13.947754 2.721354 13.947754 3.466146 13.947754 Z M 11.466146 13.947754 L 12.533854 13.947754 C 13.28125 13.947754 13.653646 13.947754 13.9375 13.803711 C 14.190104 13.674316 14.393229 13.47168 14.520833 13.220215 C 14.666667 12.93457 14.666667 12.561035 14.666667 11.816406 L 14.666667 10.749512 C 14.666667 10.002441 14.666667 9.628906 14.520833 9.343262 C 14.393229 9.091797 14.190104 8.88916 13.9375 8.759766 C 13.653646 8.615723 13.28125 8.615723 12.533854 8.615723 L 11.466146 8.615723 C 10.721354 8.615723 10.346354 8.615723 10.0625 8.759766 C 9.809896 8.88916 9.606771 9.091797 9.479167 9.343262 C 9.333333 9.628906 9.333333 10.002441 9.333333 10.749512 L 9.333333 11.816406 C 9.333333 12.561035 9.333333 12.93457 9.479167 13.220215 C 9.606771 13.47168 9.809896 13.674316 10.0625 13.803711 C 10.346354 13.947754 10.721354 13.947754 11.466146 13.947754 Z M 11.466146 13.947754 " transform="matrix(1.5,0,0,1.6,0,0)"/>
        </g>
      </symbol>
      <symbol id="organizations" width="24" height="24" viewBox="0 0 24 24">
        <g xmlns="http://www.w3.org/2000/svg" id="surface1">
          <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:currentColor;stroke-opacity:1;stroke-miterlimit:4;" d="M 11.861816 8.270345 C 12.846842 8.270345 13.646484 7.470703 13.646484 6.485677 C 13.646484 5.503418 12.846842 4.703776 11.861816 4.703776 M 13.818034 13.95638 L 14.468262 13.95638 C 15.290039 13.95638 15.956868 13.289551 15.956868 12.467773 L 15.956868 12.370931 C 15.956868 11.189453 14.999512 10.232096 13.818034 10.232096 M 5.331868 8.270345 C 4.346842 8.270345 3.547201 7.470703 3.547201 6.485677 C 3.547201 5.503418 4.346842 4.703776 5.331868 4.703776 M 3.36735 13.859538 L 2.717122 13.859538 C 1.895345 13.859538 1.225749 13.192708 1.225749 12.370931 L 1.225749 12.274089 C 1.225749 11.092611 2.185872 10.135254 3.36735 10.135254 M 10.774414 5.733073 C 10.774414 6.895182 9.830892 7.835937 8.668783 7.835937 C 7.506673 7.835937 6.565918 6.895182 6.565918 5.733073 C 6.565918 4.570964 7.506673 3.627441 8.668783 3.627441 C 9.830892 3.627441 10.774414 4.570964 10.774414 5.733073 Z M 6.145345 14.150065 L 11.194987 14.150065 C 12.124674 14.150065 12.877279 13.397461 12.877279 12.467773 C 12.877279 11.073242 11.748372 9.941569 10.353841 9.941569 L 6.986491 9.941569 C 5.59196 9.941569 4.460286 11.073242 4.460286 12.467773 C 4.460286 13.397461 5.215658 14.150065 6.145345 14.150065 Z M 6.145345 14.150065 " transform="matrix(1.411765,0,0,1.411765,0,0)"/>
        </g>
      </symbol>
      <symbol id="puzzle" width="24" height="24" viewBox="0 0 24 24">
        <g xmlns="http://www.w3.org/2000/svg" id="surface1">
          <path style="fill:none;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;stroke:currentColor;stroke-opacity:1;stroke-miterlimit:4;" d="M 7.546875 3.054688 C 7.546875 2.122396 8.302083 1.367188 9.234375 1.367188 C 10.166667 1.367188 10.921875 2.122396 10.921875 3.054688 C 10.921875 3.385417 10.921875 3.549479 10.979167 3.679688 C 11.044271 3.830729 11.166667 3.950521 11.317708 4.018229 C 11.447917 4.075521 11.611979 4.075521 11.942708 4.075521 L 13.460938 4.075521 C 14.197917 4.075521 14.794271 4.671875 14.794271 5.408854 L 14.794271 7.039062 C 14.794271 7.265625 14.794271 7.377604 14.768229 7.471354 C 14.703125 7.6875 14.533854 7.856771 14.317708 7.921875 C 14.223958 7.947917 14.111979 7.947917 13.885417 7.947917 C 12.953125 7.947917 12.197917 8.705729 12.197917 9.635417 C 12.197917 10.567708 12.953125 11.322917 13.885417 11.322917 C 14.111979 11.322917 14.223958 11.322917 14.317708 11.351562 C 14.533854 11.414062 14.703125 11.585938 14.768229 11.802083 C 14.794271 11.893229 14.794271 12.007812 14.794271 12.234375 L 14.794271 13.864583 C 14.794271 14.601562 14.197917 15.197917 13.460938 15.197917 L 11.942708 15.197917 C 11.611979 15.197917 11.447917 15.197917 11.317708 15.140625 C 11.166667 15.072917 11.044271 14.953125 10.979167 14.802083 C 10.921875 14.671875 10.921875 14.507812 10.921875 14.177083 C 10.921875 13.244792 10.166667 12.489583 9.234375 12.489583 C 8.302083 12.489583 7.546875 13.244792 7.546875 14.177083 C 7.546875 14.507812 7.546875 14.671875 7.489583 14.802083 C 7.421875 14.953125 7.302083 15.072917 7.148438 15.140625 C 7.020833 15.197917 6.856771 15.197917 6.526042 15.197917 L 5.005208 15.197917 C 4.268229 15.197917 3.671875 14.601562 3.671875 13.864583 L 3.671875 12.216146 C 3.671875 12.005208 3.671875 11.901042 3.648438 11.815104 C 3.585938 11.588542 3.408854 11.408854 3.179688 11.346354 C 3.09375 11.322917 2.989583 11.322917 2.78125 11.322917 C 1.848958 11.322917 1.09375 10.567708 1.09375 9.635417 C 1.09375 8.705729 1.848958 7.947917 2.78125 7.947917 C 2.989583 7.947917 3.09375 7.947917 3.179688 7.924479 C 3.408854 7.864583 3.585938 7.684896 3.648438 7.458333 C 3.671875 7.372396 3.671875 7.265625 3.671875 7.057292 L 3.671875 5.408854 C 3.671875 4.671875 4.268229 4.075521 5.005208 4.075521 L 6.526042 4.075521 C 6.856771 4.075521 7.020833 4.075521 7.148438 4.018229 C 7.302083 3.950521 7.421875 3.830729 7.489583 3.679688 C 7.546875 3.549479 7.546875 3.385417 7.546875 3.054688 Z M 7.546875 3.054688 " transform="matrix(1.5,0,0,1.5,0,0)"/>
        </g>
      </symbol>
      <symbol id={"logo-smile"} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.3586 5H8.58434V13.3639H10.3586V5Z" fill="currentColor"/>
        <path d="M15.4102 5H13.6359V13.3639H15.4102V5Z" fill="currentColor"/>
        <path d="M13.9398 17.529C13.8005 17.6464 13.6812 17.7352 13.5654 17.8064C13.0481 18.1263 12.4495 18.2952 11.8345 18.2952C11.4095 18.2952 10.9971 18.2152 10.6064 18.0588C10.4509 17.9966 10.2953 17.9148 10.1344 17.8099C9.99148 17.7157 9.84317 17.6019 9.68582 17.4633L4.95978 13.268L4.93988 13.2502H2.5L8.73446 18.8481C8.85202 18.9547 8.96959 19.0507 9.08534 19.1325C9.39824 19.3547 9.7039 19.5254 10.0168 19.6516C10.5938 19.8827 11.2051 20 11.8327 20C12.8383 20 13.7969 19.7013 14.609 19.136C14.6813 19.0845 14.7573 19.0258 14.8532 18.9441L21.5 13.2502H18.9914L13.9398 17.529Z" fill="currentColor"/>
      </symbol>
      <symbol id={"info-circle"} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g xmlns="http://www.w3.org/2000/svg" id="Information Circle">
          <path id="Vector" d="M11 10V16M11 6.97054V7.06199M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </g>
      </symbol>
      <symbol id={"font-size-checker"} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7.10199 16.5926C6.70346 17.902 5.64072 18.6421 4.21741 18.6421C2.24375 18.6421 0.858398 17.4086 0.858398 15.6817C0.858398 13.727 2.56637 13.0058 4.67287 12.7781L7.08301 12.5314V12.2467C7.08301 10.9752 6.36187 10.311 5.16629 10.311C4.19141 10.311 3.553 10.7282 3.34173 11.4947C3.27111 11.7509 3.06036 11.9621 2.79461 11.9621H1.72104C1.43681 11.9621 1.20565 11.7238 1.26056 11.445C1.56985 9.87434 2.9918 8.77386 5.20424 8.77386C7.61438 8.77386 9.15156 10.0643 9.15156 12.6263V17.9524C9.15156 18.2285 8.9277 18.4524 8.65156 18.4524H7.65892C7.38278 18.4524 7.15892 18.2285 7.15892 17.9524V16.5926H7.10199ZM3.04081 15.7006C3.04081 16.5926 3.83786 17.105 4.74878 17.105C6.22902 17.105 7.08301 16.0992 7.08301 14.2963V13.9737L5.01447 14.2014C3.76195 14.3343 3.04081 14.7897 3.04081 15.7006Z" fill="currentColor"/>
        <path d="M12.7411 18.109C12.6735 18.3139 12.4821 18.4524 12.2663 18.4524H11.1183C10.7775 18.4524 10.5366 18.119 10.6435 17.7955L14.6399 5.70104C14.7076 5.49623 14.899 5.35791 15.1147 5.35791H18.4716C18.6875 5.35791 18.8791 5.49653 18.9466 5.70166L22.9255 17.7961C23.0319 18.1195 22.791 18.4524 22.4505 18.4524H21.3205C21.1047 18.4524 20.9133 18.3139 20.8457 18.109L19.7444 14.7707H13.8424L12.7411 18.109ZM17.2589 7.2193C17.1081 6.76095 16.4597 6.76095 16.3089 7.2193L14.4117 12.9869H19.1561L17.2589 7.2193Z" fill="currentColor"/>
      </symbol>
      <symbol id={"icon-size-checker"} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.8506 21L17.471 21C19.4861 21 21.1196 19.3664 21.1196 17.3514L21.1196 6.64864C21.1196 4.63355 19.4861 2.99999 17.471 2.99999L6.76828 2.99999C4.75319 2.99999 3.11963 4.63355 3.11963 6.64864L3.11963 9.49585M10.8351 7.71984L16.1608 7.71984M16.1608 7.71984L16.1608 13.0455M16.1608 7.71984L10.7134 13.1676M4.63565 12.8091L9.31619 12.8091C10.2856 12.8091 11.0714 13.5949 11.0714 14.5643L11.0714 19.2448C11.0714 20.2142 10.2856 21 9.31619 21L4.63564 21C3.66627 21 2.88044 20.2142 2.88044 19.2448L2.88044 14.5643C2.88044 13.5949 3.66627 12.8091 4.63565 12.8091Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id={"text-and-translation"} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.3943 16.4958C10.6347 16.7391 11.0411 16.6641 11.1868 16.3546L11.3777 15.9489C11.4676 15.7578 11.4274 15.5313 11.28 15.3802C10.8315 14.9204 10.4007 14.4439 9.98843 13.9514C9.84188 13.7764 9.83719 13.5241 9.97042 13.3387C10.3523 12.8073 10.7119 12.2644 11.0492 11.7099C12.1047 9.97699 12.936 8.11765 13.5236 6.17654C13.5883 5.96286 13.784 5.81468 14.0072 5.81468H15.4181C15.6942 5.81468 15.9181 5.59083 15.9181 5.31468V4.90087C15.9181 4.62473 15.6942 4.40087 15.4181 4.40087H10.0559C9.7798 4.40087 9.55594 4.17701 9.55594 3.90087V2.4267C9.55594 2.15055 9.33208 1.9267 9.05594 1.9267H8.64213C8.36598 1.9267 8.14213 2.15055 8.14213 2.4267V3.90087C8.14213 4.17701 7.91827 4.40087 7.64213 4.40087H1.92651C1.65037 4.40087 1.42651 4.62473 1.42651 4.90087V5.31468C1.42651 5.59083 1.65037 5.81468 1.92651 5.81468H3.69005C3.91332 5.81468 4.10901 5.96287 4.17367 6.17657C4.79986 8.24594 5.70172 10.2211 6.85459 12.0491C7.03411 12.3337 7.43844 12.3519 7.64294 12.0847C7.73987 11.958 7.83694 11.8286 7.93396 11.6966C8.05503 11.5319 8.05984 11.31 7.95216 11.1362C7.04095 9.66561 6.30141 8.09579 5.74778 6.45755C5.64024 6.13933 5.88053 5.81468 6.21642 5.81468H11.4817C11.8175 5.81468 12.0576 6.13975 11.9499 6.45783C10.6006 10.44 8.32762 13.3884 6.56162 15.2306C5.00006 16.8596 3.57724 17.9055 2.89857 18.3661C2.6703 18.521 2.59388 18.83 2.73434 19.0674L2.94559 19.4245C3.08611 19.662 3.3905 19.7396 3.61998 19.5862C4.32942 19.1122 5.84972 18.0095 7.54696 16.2457C7.85995 15.9205 8.16367 15.5884 8.4581 15.2496C8.66332 15.0134 9.03231 15.0132 9.23774 15.2491C9.61001 15.6768 9.99572 16.0926 10.3943 16.4958Z" fill="currentColor"/>
        <path d="M15.7855 10.056C15.5898 10.056 15.4121 10.1701 15.3307 10.3481L10.2942 21.3655C10.1428 21.6966 10.3848 22.0734 10.7489 22.0734H11.2039C11.3996 22.0734 11.5773 21.9592 11.6587 21.7812L13.0074 18.831C13.0887 18.653 13.2664 18.5388 13.4621 18.5388H19.0816C19.2772 18.5388 19.4549 18.653 19.5363 18.831L20.885 21.7812C20.9663 21.9592 21.144 22.0734 21.3397 22.0734H21.7947C22.1588 22.0734 22.4008 21.6966 22.2495 21.3655L17.2129 10.3481C17.1316 10.1701 16.9539 10.056 16.7582 10.056H15.7855ZM13.7872 17.125L16.0899 12.0879C16.1612 11.9321 16.3825 11.9321 16.4537 12.0879L18.7564 17.125H13.7872Z" fill="currentColor"/>
      </symbol>
      <symbol id={"metrics-analyzer"} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16.6461 17.9843C16.6461 18.8723 15.9263 19.5921 15.0383 19.5921H8.96221C8.07422 19.5921 7.35437 18.8723 7.35437 17.9843C7.35437 17.0963 8.07422 16.3765 8.96221 16.3765H15.0383C15.9263 16.3765 16.6461 17.0963 16.6461 17.9843ZM16.6461 17.9843L19.3925 17.9844M4.60803 5.10938L7.35437 5.10937M7.35437 5.10937C7.35437 5.99736 8.07422 6.71714 8.96221 6.71714H15.0383C15.9263 6.71714 16.6461 5.99729 16.6461 5.1093C16.6461 4.22132 15.9263 3.50146 15.0383 3.50146H8.96221C8.07422 3.50146 7.35437 4.22139 7.35437 5.10937ZM19.3925 16.8552L20.5031 17.9658L19.3925 19.0764M16.691 11.5559C18.4897 11.5559 19.9478 10.0978 19.9478 8.29919C19.9478 6.50056 18.4897 5.04248 16.691 5.04248M7.35437 11.7756C5.55574 11.7756 4.09766 13.2337 4.09766 15.0323C4.09766 16.831 5.55574 18.2891 7.35437 18.2891M8.96221 13.1546H15.0383C15.9263 13.1546 16.6461 12.4348 16.6461 11.5468C16.6461 10.6588 15.9263 9.93896 15.0383 9.93896H8.96221C8.07422 9.93896 7.35437 10.6588 7.35437 11.5468C7.35437 12.4348 8.07422 13.1546 8.96221 13.1546Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id={"refresh"} width="22" height="23" viewBox="0 0 22 23" fill="none">
        <path d="M1.75 12C1.75 11.5858 1.41421 11.25 1 11.25C0.585786 11.25 0.25 11.5858 0.25 12H1.75ZM4.99903 4L5.44953 4.59962L4.99903 4ZM3 5.99903L3.55483 6.50367L3.57849 6.47765L3.59962 6.44953L3 5.99903ZM3.01269 1.00335C3.01454 0.589137 2.68025 0.251855 2.26604 0.250007C1.85183 0.248159 1.51455 0.582444 1.5127 0.996654L3.01269 1.00335ZM2.25384 2.98571L1.50384 2.98237L2.25384 2.98571ZM5.93384 6.66571L5.93718 7.41571H5.93718L5.93384 6.66571ZM7.9229 7.40685C8.33711 7.405 8.67139 7.06772 8.66954 6.65351C8.66769 6.2393 8.33041 5.90501 7.9162 5.90686L7.9229 7.40685ZM2.66238 5.90267L2.06926 6.36169L2.06926 6.36169L2.66238 5.90267ZM3.01688 6.25717L2.55786 6.85029L2.55786 6.85029L3.01688 6.25717ZM0.25 12C0.25 17.9371 5.06294 22.75 11 22.75V21.25C5.89137 21.25 1.75 17.1086 1.75 12H0.25ZM11 22.75C16.9371 22.75 21.75 17.9371 21.75 12H20.25C20.25 17.1086 16.1086 21.25 11 21.25V22.75ZM21.75 12C21.75 6.06294 16.9371 1.25 11 1.25V2.75C16.1086 2.75 20.25 6.89137 20.25 12H21.75ZM11 1.25C8.58034 1.25 6.34544 2.05032 4.54852 3.40038L5.44953 4.59962C6.99559 3.43804 8.91636 2.75 11 2.75V1.25ZM4.54852 3.40038C3.73519 4.01145 3.01145 4.73519 2.40038 5.54852L3.59962 6.44953C4.12582 5.74916 4.74916 5.12582 5.44953 4.59962L4.54852 3.40038ZM1.5127 0.996654L1.50384 2.98237L3.00383 2.98906L3.01269 1.00335L1.5127 0.996654ZM5.93718 7.41571L7.9229 7.40685L7.9162 5.90686L5.93049 5.91572L5.93718 7.41571ZM1.50384 2.98237C1.50039 3.75651 1.49638 4.4005 1.55271 4.91635C1.61069 5.44728 1.74029 5.93661 2.06926 6.36169L3.25551 5.44365C3.16534 5.32713 3.08712 5.14976 3.04385 4.75351C2.99893 4.34217 3.00022 3.79848 3.00383 2.98906L1.50384 2.98237ZM5.93049 5.91572C5.12107 5.91933 4.57739 5.92062 4.16604 5.8757C3.76979 5.83243 3.59242 5.75421 3.4759 5.66404L2.55786 6.85029C2.98294 7.17926 3.47227 7.30886 4.0032 7.36684C4.51905 7.42317 5.16304 7.41916 5.93718 7.41571L5.93049 5.91572ZM2.06926 6.36169C2.15834 6.4768 2.25638 6.58449 2.36242 6.68379L3.38774 5.58893C3.33992 5.54415 3.2957 5.49558 3.25551 5.44365L2.06926 6.36169ZM2.36242 6.68379C2.42487 6.74227 2.49008 6.79784 2.55786 6.85029L3.4759 5.66404C3.44532 5.64037 3.4159 5.61531 3.38774 5.58893L2.36242 6.68379ZM2.44517 5.49438L2.32025 5.63172L3.42991 6.64101L3.55483 6.50367L2.44517 5.49438Z" fill="currentColor"/>
      </symbol>
      <symbol id={"display"} width="20" height="20" viewBox="0 0 32 33" >
        <path
          d="M4.97307 24.7092L5.31356 24.041L4.97307 24.7092ZM2.05963 21.7958L2.72789 21.4553L2.05963 21.7958ZM29.9397 21.7958L29.2715 21.4553L29.9397 21.7958ZM27.0263 24.7092L26.6858 24.041L27.0263 24.7092ZM27.0263 4.82916L26.6858 5.49742L27.0263 4.82916ZM29.9397 7.7426L29.2715 8.0831L29.9397 7.7426ZM4.97307 4.82916L5.31356 5.49742L4.97307 4.82916ZM2.05963 7.7426L2.72789 8.0831L2.05963 7.7426ZM10.4844 30.0416C10.0826 30.1421 9.83827 30.5493 9.93873 30.9511C10.0392 31.353 10.4464 31.5973 10.8482 31.4968L10.4844 30.0416ZM12.7659 30.2443L12.584 29.5167L12.7659 30.2443ZM19.2335 30.2443L19.4154 29.5167L19.2335 30.2443ZM21.1511 31.4968C21.5529 31.5973 21.9602 31.353 22.0606 30.9511C22.1611 30.5493 21.9168 30.1421 21.5149 30.0416L21.1511 31.4968ZM16.7497 25.4359C16.7497 25.0217 16.4139 24.6859 15.9997 24.6859C15.5855 24.6859 15.2497 25.0217 15.2497 25.4359H16.7497ZM11.9997 4.85254H19.9997V3.35254H11.9997V4.85254ZM19.9997 24.6859H11.9997V26.1859H19.9997V24.6859ZM11.9997 24.6859C10.1205 24.6859 8.75615 24.6853 7.68209 24.5975C6.61679 24.5105 5.90325 24.3415 5.31356 24.041L4.63258 25.3775C5.46897 25.8037 6.40189 25.9979 7.55995 26.0926C8.70925 26.1865 10.1452 26.1859 11.9997 26.1859V24.6859ZM0.583008 14.7692C0.583008 16.6237 0.582425 18.0596 0.676327 19.2089C0.770944 20.367 0.965214 21.2999 1.39138 22.1363L2.72789 21.4553C2.42742 20.8656 2.25838 20.1521 2.17134 19.0868C2.08359 18.0127 2.08301 16.6484 2.08301 14.7692H0.583008ZM5.31356 24.041C4.20027 23.4737 3.29514 22.5686 2.72789 21.4553L1.39138 22.1363C2.10244 23.5318 3.23704 24.6664 4.63258 25.3775L5.31356 24.041ZM29.9163 14.7692C29.9163 16.6484 29.9158 18.0127 29.828 19.0868C29.741 20.1521 29.5719 20.8656 29.2715 21.4553L30.608 22.1363C31.0341 21.2999 31.2284 20.367 31.323 19.2089C31.4169 18.0596 31.4163 16.6237 31.4163 14.7692H29.9163ZM19.9997 26.1859C21.8541 26.1859 23.2901 26.1865 24.4394 26.0926C25.5975 25.9979 26.5304 25.8037 27.3668 25.3775L26.6858 24.041C26.0961 24.3415 25.3826 24.5105 24.3173 24.5975C23.2432 24.6853 21.8789 24.6859 19.9997 24.6859V26.1859ZM29.2715 21.4553C28.7042 22.5686 27.7991 23.4737 26.6858 24.041L27.3668 25.3775C28.7623 24.6664 29.8969 23.5318 30.608 22.1363L29.2715 21.4553ZM19.9997 4.85254C21.8789 4.85254 23.2432 4.85312 24.3173 4.94088C25.3826 5.02791 26.0961 5.19696 26.6858 5.49742L27.3668 4.16091C26.5304 3.73475 25.5975 3.54048 24.4394 3.44586C23.2901 3.35196 21.8541 3.35254 19.9997 3.35254V4.85254ZM31.4163 14.7692C31.4163 12.9147 31.4169 11.4788 31.323 10.3295C31.2284 9.17142 31.0341 8.2385 30.608 7.40211L29.2715 8.0831C29.5719 8.67278 29.741 9.38633 29.828 10.4516C29.9158 11.5257 29.9163 12.89 29.9163 14.7692H31.4163ZM26.6858 5.49742C27.7991 6.06467 28.7042 6.9698 29.2715 8.0831L30.608 7.40211C29.8969 6.00657 28.7623 4.87197 27.3668 4.16091L26.6858 5.49742ZM11.9997 3.35254C10.1452 3.35254 8.70925 3.35196 7.55995 3.44586C6.40189 3.54048 5.46897 3.73475 4.63258 4.16091L5.31356 5.49742C5.90325 5.19696 6.61679 5.02791 7.68209 4.94088C8.75615 4.85312 10.1205 4.85254 11.9997 4.85254V3.35254ZM2.08301 14.7692C2.08301 12.89 2.08359 11.5257 2.17134 10.4516C2.25838 9.38633 2.42742 8.67278 2.72789 8.0831L1.39138 7.40211C0.965214 8.2385 0.770944 9.17142 0.676327 10.3295C0.582425 11.4788 0.583008 12.9147 0.583008 14.7692H2.08301ZM4.63258 4.16091C3.23704 4.87197 2.10244 6.00657 1.39138 7.40211L2.72789 8.0831C3.29514 6.9698 4.20027 6.06467 5.31356 5.49742L4.63258 4.16091ZM10.8482 31.4968L12.9478 30.9719L12.584 29.5167L10.4844 30.0416L10.8482 31.4968ZM19.0516 30.9719L21.1511 31.4968L21.5149 30.0416L19.4154 29.5167L19.0516 30.9719ZM16.7497 29.4359V25.4359H15.2497V29.4359H16.7497ZM12.9478 30.9719C13.9497 30.7215 14.9747 30.5962 15.9997 30.5962V29.0962C14.8525 29.0962 13.7053 29.2364 12.584 29.5167L12.9478 30.9719ZM15.9997 30.5962C17.0247 30.5962 18.0497 30.7215 19.0516 30.9719L19.4154 29.5167C18.2941 29.2364 17.1469 29.0962 15.9997 29.0962V30.5962ZM15.2497 29.4359V29.8462H16.7497V29.4359H15.2497Z"
          fill="currentColor"
        />
      </symbol>

      <symbol id="pagination-chevron-right" viewBox="0 0 12 13" fill="none">
        <g>
          <path d="M4.01026 11.842C3.8129 11.8419 3.61999 11.7787 3.45591 11.6601C3.29183 11.5416 3.16395 11.3731 3.08843 11.1761C3.01291 10.979 2.99315 10.7622 3.03164 10.5529C3.07013 10.3437 3.16515 10.1515 3.30468 10.0007L6.59106 6.44862L3.30468 2.89654C3.20936 2.79704 3.13333 2.67801 3.08102 2.54641C3.02872 2.41481 3.00119 2.27327 3.00004 2.13004C2.99889 1.98681 3.02414 1.84477 3.07432 1.71221C3.1245 1.57964 3.1986 1.45921 3.29231 1.35793C3.38601 1.25665 3.49744 1.17655 3.62009 1.12232C3.74274 1.06808 3.87415 1.04079 4.00666 1.04203C4.13918 1.04328 4.27013 1.07303 4.39189 1.12957C4.51365 1.1861 4.62377 1.26827 4.71584 1.3713L8.7078 5.686C8.8949 5.88828 9 6.16259 9 6.44862C9 6.73464 8.8949 7.00896 8.7078 7.21124L4.71584 11.5259C4.52872 11.7282 4.27492 11.8419 4.01026 11.842Z" fill="currentColor"/>
        </g>
      </symbol>

      <symbol id="pagination-chevron-left" viewBox="0 0 12 13" fill="none">
        <g>
          <path d="M7.98974 11.842C7.72508 11.8419 7.47128 11.7282 7.28416 11.5259L3.2922 7.21124C3.1051 7.00896 3 6.73464 3 6.44862C3 6.16259 3.1051 5.88828 3.2922 5.686L7.28416 1.3713C7.37623 1.26827 7.48635 1.1861 7.60811 1.12957C7.72987 1.07303 7.86082 1.04328 7.99334 1.04203C8.12585 1.04079 8.25726 1.06808 8.37991 1.12232C8.50256 1.17655 8.61399 1.25665 8.70769 1.35793C8.8014 1.45921 8.8755 1.57964 8.92568 1.71221C8.97586 1.84477 9.00111 1.98681 8.99996 2.13004C8.99881 2.27327 8.97128 2.41481 8.91898 2.54641C8.86667 2.67801 8.79064 2.79704 8.69532 2.89654L5.40894 6.44862L8.69532 10.0007C8.83485 10.1515 8.92987 10.3437 8.96836 10.5529C9.00685 10.7622 8.98709 10.979 8.91157 11.1761C8.83605 11.3731 8.70817 11.5416 8.54409 11.6601C8.38001 11.7787 8.1871 11.8419 7.98974 11.842Z" fill="currentColor"/>
        </g>
      </symbol>

      <symbol id={"subscription"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(1.41)">
        <path d="M5.70013 11.6532H6.99581M5.70013 9.12234H6.99581M6.99581 14.043H3.11914V1.86914H11.7821V2.35315M11.7944 14.305C12.9478 14.2986 13.8808 13.393 13.8808 12.2767C13.8808 11.1565 13.1143 10.5039 11.7821 10.2484C10.5212 9.90855 9.68343 9.34026 9.68343 8.22002C9.68343 7.09978 10.623 6.19164 11.7821 6.19164C12.6842 6.19164 13.4533 6.74168 13.7501 7.51367M11.7944 14.305C11.7903 14.3051 11.7862 14.3051 11.7821 14.3051C10.9736 14.3051 10.1237 13.8632 9.68343 13.2157M11.7944 14.305V15.9077M11.7944 6.10654V4.50374M8.44485 5.11793C8.44485 5.72622 7.95174 6.21933 7.34346 6.21933C6.73518 6.21933 6.24207 5.72622 6.24207 5.11793C6.24207 4.50965 6.73518 4.01654 7.34346 4.01654C7.95174 4.01654 8.44485 4.50965 8.44485 5.11793Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </symbol>
      <symbol id={"move-arrow"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" fill="none">
        <g clip-path="url(#clip0_9378_5086)">
          <path d="M2.75583 12.6837C2.46293 12.9766 2.46293 13.4514 2.75583 13.7443C3.04872 14.0372 3.52359 14.0372 3.81649 13.7443L2.75583 12.6837ZM13.0867 4.47413C13.3796 4.18124 13.3796 3.70637 13.0867 3.41347C12.7938 3.12058 12.3189 3.12058 12.026 3.41347L13.0867 4.47413ZM12.4781 10.3612C12.488 10.7753 12.8316 11.103 13.2457 11.0931C13.6598 11.0833 13.9875 10.7396 13.9777 10.3255L12.4781 10.3612ZM13.0924 4.65773L12.3426 4.6756L13.0924 4.65773ZM11.8424 3.40773L11.8245 4.15752L11.8245 4.15752L11.8424 3.40773ZM6.17467 2.52248C5.76058 2.51261 5.41689 2.84031 5.40702 3.2544C5.39716 3.6685 5.72485 4.01219 6.13895 4.02205L6.17467 2.52248ZM3.81649 13.7443L13.0867 4.47413L12.026 3.41347L2.75583 12.6837L3.81649 13.7443ZM13.9777 10.3255L13.8422 4.63987L12.3426 4.6756L12.4781 10.3612L13.9777 10.3255ZM11.8603 2.65795L6.17467 2.52248L6.13895 4.02205L11.8245 4.15752L11.8603 2.65795ZM13.8422 4.63987C13.8166 3.56536 12.9348 2.68355 11.8603 2.65795L11.8245 4.15752C12.0986 4.16405 12.3361 4.40152 12.3426 4.6756L13.8422 4.63987Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_9378_5086">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
        </defs>
      </symbol>

      <symbol id={"folder-open"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none">
        <path d="M10.4567 15.2358C10.8019 15.2358 11.0817 14.956 11.0817 14.6108C11.0817 14.2656 10.8019 13.9858 10.4567 13.9858V15.2358ZM13.165 6.61096C13.165 6.95614 13.4449 7.23596 13.79 7.23596C14.1352 7.23596 14.415 6.95614 14.415 6.61096H13.165ZM5.34439 9.28489L5.96088 9.38763L5.34439 9.28489ZM15.376 9.09501L14.7595 8.99226L15.376 9.09501ZM14.9024 11.937L15.5189 12.0398V12.0398L14.9024 11.937ZM14.4278 13.7184L13.9074 13.3723L13.9074 13.3723L14.4278 13.7184ZM13.5811 14.4358L13.8369 15.006H13.8369L13.5811 14.4358ZM14.8795 6.78772L15.1905 6.24558L14.8795 6.78772ZM15.466 7.48005L16.0519 7.26243V7.26243L15.466 7.48005ZM5.81891 7.50349L5.29847 7.15741L5.81891 7.50349ZM6.66568 6.78617L6.9215 7.35642L6.66568 6.78617ZM5.07772 10.8849L4.46122 10.7821L5.07772 10.8849ZM4.94278 13.3073L4.35688 13.525L4.94278 13.3073ZM5.82251 14.3458L5.51153 14.888L5.82251 14.3458ZM2.88206 1.49545L2.59831 0.938574L2.88206 1.49545ZM2.00803 2.36948L1.45115 2.08574L2.00803 2.36948ZM7.56276 2.18528L8.08634 1.84398L7.56276 2.18528ZM6.1149 1.29046L6.04377 1.9114L6.1149 1.29046ZM8.01732 3.03631L7.49374 3.37762L8.01732 3.03631ZM9.46518 3.93114L9.5363 3.3102L9.46518 3.93114ZM2.88206 14.3928L2.59831 14.9497L2.88206 14.3928ZM2.00803 13.5188L1.45115 13.8025L2.00803 13.5188ZM12.3078 4.01231L12.146 4.61601L12.3078 4.01231ZM13.7219 5.42637L13.1182 5.58817L13.7219 5.42637ZM4.99004 1.90247H5.63266V0.652466H4.99004V1.90247ZM10.4567 13.9858H4.99004V15.2358H10.4567V13.9858ZM9.94742 4.56913H11.1232V3.31913H9.94742V4.56913ZM2.41504 11.4108V4.47747H1.16504V11.4108H2.41504ZM5.69421 10.9876L5.96088 9.38763L4.72789 9.18214L4.46122 10.7821L5.69421 10.9876ZM8.50085 7.23596H13.2717V5.98596H8.50085V7.23596ZM14.7595 8.99226L14.2859 11.8343L15.5189 12.0398L15.9925 9.19776L14.7595 8.99226ZM11.7459 13.986H8.23418V15.236H11.7459V13.986ZM14.2859 11.8343C14.2052 12.3185 14.1499 12.6476 14.0876 12.9014C14.0272 13.1475 13.9701 13.278 13.9074 13.3723L14.9483 14.0645C15.1226 13.8024 15.2236 13.5172 15.3016 13.1993C15.3777 12.889 15.4412 12.5055 15.5189 12.0398L14.2859 11.8343ZM11.7459 15.236C12.218 15.236 12.6067 15.2364 12.9253 15.2123C13.2517 15.1876 13.5497 15.1349 13.8369 15.006L13.3252 13.8655C13.2219 13.9119 13.0838 13.9467 12.831 13.9658C12.5705 13.9855 12.2368 13.986 11.7459 13.986V15.236ZM13.9074 13.3723C13.7638 13.5884 13.5619 13.7593 13.3252 13.8655L13.8369 15.006C14.2887 14.8033 14.674 14.4769 14.9483 14.0645L13.9074 13.3723ZM13.2717 7.23596C13.7161 7.23596 14.0092 7.23651 14.231 7.25573C14.4471 7.27444 14.5283 7.30678 14.5685 7.32987L15.1905 6.24558C14.9226 6.0919 14.6331 6.03587 14.3389 6.01039C14.0505 5.98541 13.6938 5.98596 13.2717 5.98596V7.23596ZM15.9925 9.19776C16.0619 8.78142 16.1211 8.42967 16.1439 8.1411C16.1671 7.8467 16.1594 7.55197 16.0519 7.26243L14.8801 7.69766C14.8963 7.74116 14.9148 7.82659 14.8977 8.04276C14.8802 8.26476 14.8326 8.55398 14.7595 8.99226L15.9925 9.19776ZM14.5685 7.32987C14.7122 7.41227 14.8224 7.54241 14.8801 7.69766L16.0519 7.26243C15.8925 6.8332 15.5877 6.4734 15.1905 6.24558L14.5685 7.32987ZM5.96088 9.38763C6.04159 8.90338 6.09685 8.57436 6.15913 8.32056C6.21953 8.0744 6.27663 7.94388 6.33934 7.84958L5.29847 7.15741C5.12415 7.41955 5.02316 7.70474 4.94514 8.02267C4.869 8.33297 4.80551 8.71642 4.72789 9.18214L5.96088 9.38763ZM8.50085 5.98596C8.02871 5.98596 7.64003 5.98555 7.32144 6.00964C6.99501 6.03433 6.69709 6.08707 6.40986 6.21592L6.9215 7.35642C7.02482 7.31006 7.16296 7.2752 7.4157 7.25608C7.67628 7.23638 8.00991 7.23596 8.50085 7.23596V5.98596ZM6.33934 7.84958C6.48299 7.63356 6.68481 7.4626 6.9215 7.35642L6.40986 6.21592C5.958 6.41863 5.57271 6.74502 5.29847 7.15741L6.33934 7.84958ZM4.46122 10.7821C4.35622 11.4121 4.27033 11.9241 4.23748 12.3403C4.20418 12.7624 4.21842 13.1522 4.35688 13.525L5.52867 13.0897C5.48159 12.963 5.45648 12.7825 5.48361 12.4387C5.5112 12.089 5.58556 11.6396 5.69421 10.9876L4.46122 10.7821ZM8.23418 13.986C7.57324 13.986 7.11768 13.9854 6.76825 13.9552C6.42466 13.9254 6.25077 13.871 6.13348 13.8037L5.51153 14.888C5.85649 15.0858 6.23862 15.164 6.6604 15.2005C7.07634 15.2365 7.59549 15.236 8.23418 15.236V13.986ZM4.35688 13.525C4.57059 14.1003 4.97914 14.5826 5.51153 14.888L6.13348 13.8037C5.85461 13.6437 5.64061 13.3911 5.52867 13.0897L4.35688 13.525ZM4.99004 0.652466C4.4403 0.652466 3.99041 0.65198 3.62555 0.68179C3.25339 0.712196 2.91502 0.777205 2.59831 0.938574L3.1658 2.05233C3.27692 1.99571 3.43248 1.95173 3.72734 1.92764C4.02949 1.90295 4.41967 1.90247 4.99004 1.90247V0.652466ZM2.41504 4.47747C2.41504 3.9071 2.41553 3.51691 2.44021 3.21476C2.4643 2.91991 2.50829 2.76435 2.56491 2.65323L1.45115 2.08574C1.28978 2.40244 1.22477 2.74082 1.19436 3.11297C1.16455 3.47783 1.16504 3.92773 1.16504 4.47747H2.41504ZM2.59831 0.938574C2.10439 1.19024 1.70281 1.59182 1.45115 2.08574L2.56491 2.65323C2.69673 2.39451 2.90708 2.18416 3.1658 2.05233L2.59831 0.938574ZM8.34906 2.33129C8.24587 2.12493 8.17282 1.97664 8.08634 1.84398L7.03918 2.52659C7.07739 2.58521 7.11429 2.65684 7.23102 2.89031L8.34906 2.33129ZM5.63266 1.90247C5.89368 1.90247 5.97426 1.90344 6.04377 1.9114L6.18602 0.669517C6.02868 0.651496 5.86338 0.652466 5.63266 0.652466V1.90247ZM8.08634 1.84398C7.6594 1.18904 6.96275 0.758484 6.18602 0.669517L6.04377 1.9114C6.45063 1.958 6.81554 2.18353 7.03918 2.52659L8.08634 1.84398ZM7.23102 2.89031C7.3342 3.09667 7.40726 3.24496 7.49374 3.37762L8.5409 2.69501C8.50269 2.63639 8.46579 2.56476 8.34906 2.33129L7.23102 2.89031ZM9.94742 3.31913C9.68639 3.31913 9.60582 3.31816 9.5363 3.3102L9.39406 4.55208C9.55139 4.5701 9.71669 4.56913 9.94742 4.56913V3.31913ZM7.49374 3.37762C7.92068 4.03256 8.61733 4.46311 9.39406 4.55208L9.5363 3.3102C9.12945 3.2636 8.76453 3.03807 8.5409 2.69501L7.49374 3.37762ZM4.99004 13.9858C4.41967 13.9858 4.02949 13.9853 3.72734 13.9606C3.43248 13.9365 3.27692 13.8926 3.1658 13.8359L2.59831 14.9497C2.91502 15.1111 3.25339 15.1761 3.62555 15.2065C3.99041 15.2363 4.4403 15.2358 4.99004 15.2358V13.9858ZM1.16504 11.4108C1.16504 11.9605 1.16455 12.4104 1.19436 12.7753C1.22477 13.1474 1.28978 13.4858 1.45115 13.8025L2.56491 13.235C2.50829 13.1239 2.4643 12.9684 2.44021 12.6735C2.41553 12.3714 2.41504 11.9812 2.41504 11.4108H1.16504ZM3.1658 13.8359C2.90708 13.7041 2.69673 13.4938 2.56491 13.235L1.45115 13.8025C1.70281 14.2964 2.10439 14.698 2.59831 14.9497L3.1658 13.8359ZM11.1232 4.56913C11.7836 4.56913 11.9911 4.5745 12.146 4.61601L12.4696 3.40862C12.1157 3.31376 11.7031 3.31913 11.1232 3.31913V4.56913ZM14.415 6.61096C14.415 6.03108 14.4204 5.6185 14.3256 5.26457L13.1182 5.58817C13.1597 5.74303 13.165 5.95058 13.165 6.61096H14.415ZM12.146 4.61601C12.6204 4.74316 12.991 5.11374 13.1182 5.58817L14.3256 5.26457C14.0828 4.35883 13.3753 3.65137 12.4696 3.40862L12.146 4.61601Z" fill="currentColor"/>
      </symbol>

      <symbol id={"all-chats"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M14.4488 5.41304C14.4488 4.60531 14.4488 4.20145 14.3116 3.89294C14.191 3.62157 13.9984 3.40093 13.7616 3.26266C13.4924 3.10547 13.14 3.10547 12.4351 3.10547H3.87697C3.17211 3.10547 2.81968 3.10547 2.55046 3.26266C2.31365 3.40093 2.12112 3.62157 2.00046 3.89294C1.86328 4.20145 1.86328 4.60531 1.86328 5.41304V10.8935C1.86328 11.7012 1.86328 12.1051 2.00046 12.4136C2.12112 12.685 2.31365 12.9056 2.55046 13.0439C2.81968 13.2011 3.17211 13.2011 3.87697 13.2011C4.155 13.2011 4.38039 13.4594 4.38039 13.778V14.6433C4.38039 14.9404 4.67639 15.11 4.88381 14.9318L6.15103 13.778M20.0284 8.4305H11.0646C10.3263 8.4305 9.95715 8.4305 9.67517 8.59515C9.42713 8.73997 9.22547 8.97107 9.09909 9.2553C8.95542 9.57843 8.95542 10.0014 8.95542 10.8475V16.5877C8.95542 17.4337 8.95542 17.8567 9.09909 18.1799C9.22547 18.4641 9.42713 18.6952 9.67517 18.84C9.95715 19.0046 10.3263 19.0046 11.0646 19.0046H16.1616C16.4225 19.0046 16.5529 19.0046 16.6782 19.0327C16.7893 19.0576 16.8972 19.0988 16.9992 19.1553C17.1141 19.219 17.2184 19.3087 17.4271 19.488L18.9738 20.8174C19.1911 21.0041 19.5011 20.8264 19.5011 20.5152V19.6089C19.5011 19.2752 19.7372 19.0046 20.0284 19.0046C20.7666 19.0046 21.1358 19.0046 21.4178 18.84C21.6658 18.6952 21.8675 18.4641 21.9938 18.1799C22.1375 17.8567 22.1375 17.4337 22.1375 16.5877V10.8475C22.1375 10.0014 22.1375 9.57843 21.9938 9.2553C21.8675 8.97107 21.6658 8.73997 21.4178 8.59515C21.1358 8.4305 20.7666 8.4305 20.0284 8.4305Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
      </symbol>

      <symbol id={"cog"}>
        <path d="M9.74712 3.7272C9.74712 3.20639 10.1693 2.78418 10.6901 2.78418H13.3096C13.8304 2.78418 14.2526 3.20641 14.2526 3.72725C14.2526 4.14461 14.5293 4.50694 14.9171 4.66124C14.9871 4.68908 15.0566 4.71791 15.1256 4.74768C15.5091 4.91318 15.9612 4.85271 16.2565 4.55741C16.6249 4.18904 17.2221 4.18904 17.5905 4.55741L19.4424 6.40926C19.8108 6.77766 19.8108 7.37495 19.4424 7.74335C19.147 8.03867 19.0866 8.49087 19.252 8.87432C19.2818 8.94323 19.3106 9.01264 19.3384 9.08254C19.4927 9.47037 19.855 9.74712 20.2724 9.74712C20.7933 9.74712 21.2156 10.1694 21.2156 10.6903V13.3094C21.2156 13.8304 20.7933 14.2526 20.2724 14.2526C19.855 14.2526 19.4926 14.5294 19.3383 14.9172C19.3105 14.9871 19.2817 15.0565 19.252 15.1253C19.0865 15.5088 19.147 15.961 19.4423 16.2563C19.8107 16.6247 19.8107 17.222 19.4423 17.5903L17.5905 19.4422C17.2221 19.8106 16.6248 19.8106 16.2565 19.4422C15.9611 19.1469 15.509 19.0864 15.1255 19.2519C15.0566 19.2817 14.9872 19.3105 14.9172 19.3383C14.5294 19.4926 14.2526 19.855 14.2526 20.2724C14.2526 20.7933 13.8304 21.2156 13.3094 21.2156H10.6903C10.1694 21.2156 9.74712 20.7933 9.74712 20.2724C9.74712 19.855 9.47037 19.4927 9.08254 19.3384C9.01261 19.3105 8.94318 19.2818 8.87425 19.252C8.49084 19.0865 8.03869 19.147 7.74341 19.4423C7.37505 19.8107 6.77783 19.8107 6.40947 19.4423L4.55746 17.5903C4.18914 17.222 4.18914 16.6248 4.55747 16.2565C4.85273 15.9612 4.91319 15.5091 4.74772 15.1257C4.71793 15.0567 4.6891 14.9872 4.66124 14.9171C4.50694 14.5293 4.14461 14.2526 3.72725 14.2526C3.20641 14.2526 2.78418 13.8304 2.78418 13.3096V10.6901C2.78418 10.1693 3.20639 9.74712 3.7272 9.74712C4.14456 9.74712 4.50687 9.47041 4.66115 9.08262C4.68902 9.01256 4.71787 8.943 4.74767 8.87395C4.91314 8.49056 4.85268 8.03843 4.55741 7.74316C4.18908 7.37482 4.18908 6.77764 4.55741 6.40931L6.40941 4.5573C6.77776 4.18896 7.37497 4.18896 7.74332 4.5573C8.0386 4.85258 8.49074 4.91305 8.87415 4.74759C8.94313 4.71781 9.01263 4.689 9.08262 4.66115C9.47041 4.50687 9.74712 4.14455 9.74712 3.7272Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M11.9453 9.22192C10.3447 9.22192 9.04712 10.5195 9.04712 12.1201C9.04712 13.7207 10.3447 15.0183 11.9453 15.0183C13.5459 15.0183 14.8435 13.7207 14.8435 12.1201C14.8435 10.5195 13.5459 9.22192 11.9453 9.22192Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </symbol>

      <symbol id={"document"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M19.2178 7.93844L19.1005 8.67921H19.1005L19.2178 7.93844ZM15.0616 3.78217L14.3208 3.8995V3.8995L15.0616 3.78217ZM5.06107 21.0451L5.50191 20.4383L5.06107 21.0451ZM3.95491 19.9389L4.56168 19.4981L3.95491 19.9389ZM20.0451 19.9389L19.4383 19.4981L20.0451 19.9389ZM18.9389 21.0451L18.4981 20.4383L18.9389 21.0451ZM18.9389 2.95491L19.3798 2.34815L18.9389 2.95491ZM20.0451 4.06107L20.6518 3.62023L20.0451 4.06107ZM5.06107 2.95491L5.50191 3.56168L5.06107 2.95491ZM3.95491 4.06107L4.56168 4.50191L3.95491 4.06107ZM15 2.02893L15.0257 1.27937L15 2.02893ZM20.9711 8L21.7206 7.97432L20.9711 8ZM8 15.25C7.58579 15.25 7.25 15.5858 7.25 16C7.25 16.4142 7.58579 16.75 8 16.75V15.25ZM11 16.75C11.4142 16.75 11.75 16.4142 11.75 16C11.75 15.5858 11.4142 15.25 11 15.25V16.75ZM8 11.25C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75V11.25ZM16 12.75C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25V12.75ZM8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75V7.25ZM11 8.75C11.4142 8.75 11.75 8.41421 11.75 8C11.75 7.58579 11.4142 7.25 11 7.25V8.75ZM19.3352 7.19768C17.5166 6.90965 16.0904 5.48339 15.8023 3.66485L14.3208 3.8995C14.7105 6.35988 16.6401 8.28952 19.1005 8.67921L19.3352 7.19768ZM20.25 11V13H21.75V11H20.25ZM3.75 13V11H2.25V13H3.75ZM12 21.25C10.1084 21.25 8.74999 21.249 7.69804 21.135C6.66013 21.0225 6.00992 20.8074 5.50191 20.4383L4.62023 21.6518C5.42656 22.2377 6.37094 22.5 7.53648 22.6263C8.68798 22.751 10.1418 22.75 12 22.75V21.25ZM2.25 13C2.25 14.8582 2.24897 16.312 2.37373 17.4635C2.50001 18.6291 2.76232 19.5734 3.34815 20.3798L4.56168 19.4981C4.19259 18.9901 3.97745 18.3399 3.865 17.302C3.75103 16.25 3.75 14.8916 3.75 13H2.25ZM5.50191 20.4383C5.14111 20.1762 4.82382 19.8589 4.56168 19.4981L3.34815 20.3798C3.70281 20.8679 4.13209 21.2972 4.62023 21.6518L5.50191 20.4383ZM20.25 13C20.25 14.8916 20.249 16.25 20.135 17.302C20.0225 18.3399 19.8074 18.9901 19.4383 19.4981L20.6518 20.3798C21.2377 19.5734 21.5 18.6291 21.6263 17.4635C21.751 16.312 21.75 14.8582 21.75 13H20.25ZM12 22.75C13.8582 22.75 15.312 22.751 16.4635 22.6263C17.6291 22.5 18.5734 22.2377 19.3798 21.6518L18.4981 20.4383C17.9901 20.8074 17.3399 21.0225 16.302 21.135C15.25 21.249 13.8916 21.25 12 21.25V22.75ZM19.4383 19.4981C19.1762 19.8589 18.8589 20.1762 18.4981 20.4383L19.3798 21.6518C19.8679 21.2972 20.2972 20.8679 20.6518 20.3798L19.4383 19.4981ZM18.4981 3.56168C18.8589 3.82382 19.1762 4.14111 19.4383 4.50191L20.6518 3.62023C20.2972 3.13209 19.8679 2.70281 19.3798 2.34815L18.4981 3.56168ZM12 1.25C10.1418 1.25 8.68798 1.24897 7.53648 1.37373C6.37094 1.50001 5.42656 1.76232 4.62023 2.34815L5.50191 3.56168C6.00992 3.19259 6.66013 2.97745 7.69804 2.865C8.74999 2.75103 10.1084 2.75 12 2.75V1.25ZM3.75 11C3.75 9.10843 3.75103 7.74999 3.865 6.69804C3.97745 5.66013 4.19259 5.00992 4.56168 4.50191L3.34815 3.62023C2.76232 4.42656 2.50001 5.37094 2.37373 6.53648C2.24897 7.68798 2.25 9.14184 2.25 11H3.75ZM4.62023 2.34815C4.13209 2.70281 3.70281 3.13209 3.34815 3.62023L4.56168 4.50191C4.82382 4.14111 5.14111 3.82382 5.50191 3.56168L4.62023 2.34815ZM12 2.75C13.1731 2.75 14.1456 2.75009 14.9743 2.77849L15.0257 1.27937C14.1658 1.24991 13.1648 1.25 12 1.25V2.75ZM14.9743 2.77849C16.8292 2.84204 17.7925 3.04907 18.4981 3.56168L19.3798 2.34815C18.2761 1.5463 16.8991 1.34355 15.0257 1.27937L14.9743 2.77849ZM14.25 2.02893C14.25 2.91121 14.2484 3.44215 14.3208 3.8995L15.8023 3.66485C15.7529 3.35298 15.75 2.96617 15.75 2.02892L14.25 2.02893ZM21.75 11C21.75 9.83522 21.7501 8.83424 21.7206 7.97432L20.2215 8.02568C20.2499 8.85445 20.25 9.82692 20.25 11H21.75ZM21.7206 7.97432C21.6564 6.10087 21.4537 4.7239 20.6518 3.62023L19.4383 4.50191C19.9509 5.20746 20.158 6.17075 20.2215 8.02568L21.7206 7.97432ZM20.9711 7.25C20.0338 7.24999 19.647 7.24707 19.3352 7.19768L19.1005 8.67921C19.5579 8.75165 20.0888 8.74999 20.9711 8.75L20.9711 7.25ZM8 16.75H11V15.25H8V16.75ZM8 12.75H16V11.25H8V12.75ZM8 8.75H11V7.25H8V8.75Z" fill="white"/>
      </symbol>

      <symbol id={"agent"} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M12.2917 12.6807H16.804M8.47876 9.07086L10.2837 10.8757L8.47876 12.6807M19.2095 5.43207H6.20947C5.65719 5.43207 5.20947 5.87978 5.20947 6.43207V15.4321C5.20947 15.9844 5.65719 16.4321 6.20947 16.4321H10.07C10.3786 16.4321 10.6699 16.5745 10.8594 16.8181L11.9201 18.1819C12.3205 18.6966 13.0985 18.6966 13.4988 18.1819L14.5596 16.8181C14.7491 16.5745 15.0404 16.4321 15.3489 16.4321H19.2095C19.7618 16.4321 20.2095 15.9844 20.2095 15.4321V6.43207C20.2095 5.87978 19.7618 5.43207 19.2095 5.43207Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>

      <symbol id={"copyright"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.4913 14.942C13.8863 15.3872 13.139 15.6501 12.3303 15.6501C10.3144 15.6501 8.68018 14.0159 8.68018 12C8.68018 9.98408 10.3144 8.34985 12.3303 8.34985C13.139 8.34985 13.8863 8.61284 14.4913 9.05797M21.1006 12C21.1006 17.0261 17.0261 21.1006 12 21.1006C6.97389 21.1006 2.89941 17.0261 2.89941 12C2.89941 6.97389 6.97389 2.89941 12 2.89941C17.0261 2.89941 21.1006 6.97389 21.1006 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </symbol>

      <svg id={"ai-knowledge-documents"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20.3239 10.8735L20.2172 11.5472L20.2172 11.5472L20.3239 10.8735ZM16.8764 7.42595L16.2027 7.53264L16.2027 7.53264L16.8764 7.42595ZM8.58108 21.7453L8.98198 21.1935L8.58108 21.7453ZM7.66354 20.8278L8.21533 20.4269L7.66354 20.8278ZM21.0101 20.8278L20.4583 20.4269L21.0101 20.8278ZM20.0926 21.7453L19.6917 21.1935L20.0926 21.7453ZM20.0926 6.73975L20.4935 6.18796L20.4935 6.18796L20.0926 6.73975ZM21.0101 7.65729L21.5619 7.25639L21.5619 7.25639L21.0101 7.65729ZM8.58108 6.73975L8.98198 7.29154L8.58108 6.73975ZM7.66354 7.65729L8.21533 8.05819L7.66354 7.65729ZM16.8253 5.97165L16.8486 5.29L16.8253 5.97165ZM21.7782 10.9246L22.4599 10.9012L21.7782 10.9246ZM11.2119 17.5987C10.8352 17.5987 10.5298 17.9041 10.5298 18.2808C10.5298 18.6575 10.8352 18.9628 11.2119 18.9628V17.5987ZM13.7004 18.9628C14.077 18.9628 14.3824 18.6575 14.3824 18.2808C14.3824 17.9041 14.077 17.5987 13.7004 17.5987V18.9628ZM11.2119 14.2808C10.8352 14.2808 10.5298 14.5862 10.5298 14.9628C10.5298 15.3395 10.8352 15.6449 11.2119 15.6449V14.2808ZM17.8478 15.6449C18.2245 15.6449 18.5298 15.3395 18.5298 14.9628C18.5298 14.5862 18.2245 14.2808 17.8478 14.2808V15.6449ZM11.2119 10.9628C10.8352 10.9628 10.5298 11.2682 10.5298 11.6449C10.5298 12.0216 10.8352 12.3269 11.2119 12.3269V10.9628ZM13.7004 12.3269C14.077 12.3269 14.3824 12.0216 14.3824 11.6449C14.3824 11.2682 14.077 10.9628 13.7004 10.9628V12.3269ZM3.36582 16.718L3.91761 16.3171L3.91761 16.3171L3.36582 16.718ZM15.7949 2.62998L15.394 3.18177L15.394 3.18177L15.7949 2.62998ZM4.28337 2.62998L3.88247 2.07819L3.88247 2.07819L4.28337 2.62998ZM3.36582 3.54753L2.81403 3.14663L2.81403 3.14663L3.36582 3.54753ZM12.5276 1.86189L12.5509 1.18024L12.5509 1.18024L12.5276 1.86189ZM20.3239 10.8735L20.4306 10.1999C18.9478 9.96501 17.7849 8.80206 17.55 7.31925L16.8764 7.42595L16.2027 7.53264C16.53 9.59915 18.1507 11.2199 20.2172 11.5472L20.3239 10.8735ZM21.8022 13.413H21.1202V15.072H21.8022H22.4843V13.413H21.8022ZM6.87145 15.072H7.5535V13.413H6.87145H6.1894V15.072H6.87145ZM14.3368 22.5374V21.8554C12.7665 21.8554 11.6435 21.8544 10.7749 21.7603C9.91904 21.6676 9.39144 21.491 8.98198 21.1935L8.58108 21.7453L8.18018 22.2971C8.86094 22.7917 9.65604 23.0112 10.6279 23.1165C11.5871 23.2204 12.7968 23.2195 14.3368 23.2195V22.5374ZM6.87145 15.072H6.1894C6.1894 16.612 6.18846 17.8218 6.29238 18.7809C6.39767 19.7528 6.61715 20.5479 7.11175 21.2287L7.66354 20.8278L8.21533 20.4269C7.91784 20.0174 7.74126 19.4898 7.64854 18.634C7.55443 17.7654 7.5535 16.6424 7.5535 15.072H6.87145ZM8.58108 21.7453L8.98198 21.1935C8.68779 20.9798 8.42907 20.7211 8.21533 20.4269L7.66354 20.8278L7.11175 21.2287C7.40963 21.6387 7.77018 21.9992 8.18018 22.2971L8.58108 21.7453ZM21.8022 15.072H21.1202C21.1202 16.6424 21.1192 17.7654 21.0251 18.634C20.9324 19.4898 20.7558 20.0174 20.4583 20.4269L21.0101 20.8278L21.5619 21.2287C22.0565 20.5479 22.276 19.7528 22.3813 18.7809C22.4852 17.8218 22.4843 16.612 22.4843 15.072H21.8022ZM14.3368 22.5374V23.2195C15.8768 23.2195 17.0866 23.2204 18.0457 23.1165C19.0176 23.0112 19.8127 22.7917 20.4935 22.2971L20.0926 21.7453L19.6917 21.1935C19.2822 21.491 18.7546 21.6676 17.8988 21.7603C17.0302 21.8544 15.9072 21.8554 14.3368 21.8554V22.5374ZM21.0101 20.8278L20.4583 20.4269C20.2446 20.7211 19.9859 20.9798 19.6917 21.1935L20.0926 21.7453L20.4935 22.2971C20.9035 21.9992 21.264 21.6387 21.5619 21.2287L21.0101 20.8278ZM20.0926 6.73975L19.6917 7.29154C19.9859 7.50528 20.2446 7.764 20.4583 8.05819L21.0101 7.65729L21.5619 7.25639C21.264 6.8464 20.9035 6.48584 20.4935 6.18796L20.0926 6.73975ZM14.3368 5.94766V5.26561C12.7968 5.26561 11.5871 5.26467 10.6279 5.36859C9.65604 5.47389 8.86094 5.69336 8.18018 6.18796L8.58108 6.73975L8.98198 7.29154C9.39144 6.99405 9.91904 6.81748 10.7749 6.72475C11.6435 6.63065 12.7665 6.62971 14.3368 6.62971V5.94766ZM6.87145 13.413H7.5535C7.5535 11.8427 7.55443 10.7197 7.64854 9.85108C7.74126 8.99525 7.91784 8.46766 8.21533 8.05819L7.66354 7.65729L7.11175 7.25639C6.61715 7.93715 6.39767 8.73225 6.29238 9.70415C6.18846 10.6633 6.1894 11.8731 6.1894 13.413H6.87145ZM8.58108 6.73975L8.18018 6.18796C7.77018 6.48584 7.40963 6.8464 7.11175 7.25639L7.66354 7.65729L8.21533 8.05819C8.42907 7.764 8.68779 7.50528 8.98198 7.29154L8.58108 6.73975ZM14.3368 5.94766V6.62971C15.3102 6.62971 16.1157 6.6298 16.8019 6.65331L16.8253 5.97165L16.8486 5.29C16.1341 5.26552 15.3027 5.26561 14.3368 5.26561V5.94766ZM16.8253 5.97165L16.8019 6.65331C18.3398 6.706 19.1223 6.87789 19.6917 7.29154L20.0926 6.73975L20.4935 6.18796C19.5621 5.51127 18.4034 5.34327 16.8486 5.29L16.8253 5.97165ZM16.8253 5.97165L16.1432 5.97166C16.1432 6.7013 16.1417 7.14746 16.2027 7.53264L16.8764 7.42595L17.55 7.31925C17.51 7.06638 17.5074 6.75128 17.5073 5.97165L16.8253 5.97165ZM21.8022 13.413H22.4843C22.4843 12.4472 22.4844 11.6158 22.4599 10.9012L21.7782 10.9246L21.0966 10.9479C21.1201 11.6341 21.1202 12.4397 21.1202 13.413H21.8022ZM21.7782 10.9246L22.4599 10.9012C22.4066 9.34649 22.2386 8.18777 21.5619 7.25639L21.0101 7.65729L20.4583 8.05819C20.872 8.62753 21.0439 9.41004 21.0966 10.9479L21.7782 10.9246ZM21.7782 10.9246L21.7782 10.2425C20.9986 10.2425 20.6835 10.2399 20.4306 10.1999L20.3239 10.8735L20.2172 11.5472C20.6024 11.6082 21.0486 11.6066 21.7782 11.6066L21.7782 10.9246ZM11.2119 18.2808V18.9628H13.7004V18.2808V17.5987H11.2119V18.2808ZM11.2119 14.9628V15.6449H17.8478V14.9628V14.2808H11.2119V14.9628ZM11.2119 11.6449V12.3269H13.7004V11.6449V10.9628H11.2119V11.6449ZM2.57373 10.9623H3.25578V9.30328H2.57373H1.89168V10.9623H2.57373ZM2.57373 10.9623H1.89168C1.89168 12.5022 1.89074 13.712 1.99466 14.6711C2.09996 15.643 2.31943 16.4381 2.81403 17.1189L3.36582 16.718L3.91761 16.3171C3.62012 15.9076 3.44355 15.38 3.35082 14.5242C3.25672 13.6556 3.25578 12.5326 3.25578 10.9623H2.57373ZM4.78008 17.7115V17.0294C4.78733 17.0294 4.75384 17.0299 4.67235 16.9908C4.59449 16.9535 4.50134 16.8936 4.39975 16.8129C4.19345 16.6489 4.0112 16.4459 3.91761 16.3171L3.36582 16.718L2.81403 17.1189C2.97625 17.3422 3.24305 17.636 3.55089 17.8807C3.83131 18.1036 4.2778 18.3935 4.78008 18.3935V17.7115ZM15.7949 2.62998L15.394 3.18177C15.519 3.2726 15.6616 3.40731 15.7674 3.56075C15.874 3.71528 15.9168 3.84924 15.9168 3.95524H16.5989H17.2809C17.2809 3.48799 17.0979 3.08723 16.8904 2.7864C16.6822 2.48447 16.4228 2.24318 16.1958 2.07819L15.7949 2.62998ZM10.0391 1.83789V1.15584C8.49913 1.15584 7.28936 1.1549 6.33022 1.25882C5.35833 1.36412 4.56322 1.58359 3.88247 2.07819L4.28337 2.62998L4.68426 3.18177C5.09373 2.88428 5.62132 2.70771 6.47715 2.61498C7.34575 2.52088 8.46875 2.51994 10.0391 2.51994V1.83789ZM2.57373 9.30328H3.25578C3.25578 7.73291 3.25672 6.60991 3.35082 5.74131C3.44355 4.88548 3.62012 4.35789 3.91761 3.94842L3.36582 3.54753L2.81403 3.14663C2.31943 3.82738 2.09996 4.62249 1.99466 5.59438C1.89074 6.55352 1.89168 7.76329 1.89168 9.30328H2.57373ZM4.28337 2.62998L3.88247 2.07819C3.47247 2.37607 3.11191 2.73663 2.81403 3.14663L3.36582 3.54753L3.91761 3.94842C4.13135 3.65423 4.39007 3.39552 4.68426 3.18177L4.28337 2.62998ZM10.0391 1.83789V2.51994C11.0125 2.51994 11.818 2.52003 12.5042 2.54354L12.5276 1.86189L12.5509 1.18024C11.8364 1.15575 11.005 1.15584 10.0391 1.15584V1.83789ZM12.5276 1.86189L12.5042 2.54354C14.0421 2.59623 14.8246 2.76812 15.394 3.18177L15.7949 2.62998L16.1958 2.07819C15.2644 1.4015 14.1057 1.2335 12.5509 1.18024L12.5276 1.86189Z" fill="currentColor"/>
      </svg>

      <symbol id={"new-chat"} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.2598 25.4141C33.0882 25.4141 33.7598 24.7425 33.7598 23.9141C33.7598 23.0856 33.0882 22.4141 32.2598 22.4141L32.2598 25.4141ZM19.7383 22.4141C18.9099 22.4141 18.2383 23.0856 18.2383 23.9141C18.2383 24.7425 18.9099 25.4141 19.7383 25.4141L19.7383 22.4141ZM24.499 30.1748C24.499 31.0032 25.1706 31.6748 25.999 31.6748C26.8275 31.6748 27.499 31.0032 27.499 30.1748H24.499ZM27.499 17.6533C27.499 16.8249 26.8275 16.1533 25.999 16.1533C25.1706 16.1533 24.499 16.8249 24.499 17.6533H27.499ZM7.40883 38.0675L8.08982 36.731L8.08982 36.731L7.40883 38.0675ZM5.5848 36.2435L4.24829 36.9245L4.24829 36.9245L5.5848 36.2435ZM46.4132 36.2435L47.7498 36.9245L47.7498 36.9245L46.4132 36.2435ZM44.5892 38.0675L45.2702 39.404L45.2702 39.404L44.5892 38.0675ZM44.5892 9.76058L45.2702 8.42407L45.2702 8.42407L44.5892 9.76058ZM46.4132 11.5846L47.7498 10.9036L47.7498 10.9036L46.4132 11.5846ZM7.40883 9.76058L8.08982 11.0971L8.08982 11.0971L7.40883 9.76058ZM5.5848 11.5846L6.92131 12.2656L6.92131 12.2656L5.5848 11.5846ZM15.1471 43.531L16.0471 44.7311L16.0471 44.7311L15.1471 43.531ZM20.0444 39.8581L20.9444 41.0581L20.9444 41.0581L20.0444 39.8581ZM22.4157 38.6L22.7035 40.0721L22.7035 40.0721L22.4157 38.6ZM21.3993 38.9388L20.7463 37.5884L20.7463 37.5884L21.3993 38.9388ZM32.2598 23.9141L32.2598 22.4141L19.7383 22.4141L19.7383 23.9141L19.7383 25.4141L32.2598 25.4141L32.2598 23.9141ZM25.999 30.1748H27.499V17.6533H25.999H24.499V30.1748H25.999ZM11.808 9.30566V10.8057H40.19V9.30566V7.80566H11.808V9.30566ZM46.8682 15.9838H45.3682V31.8443H46.8682H48.3682V15.9838H46.8682ZM5.12988 31.8443H6.62988V15.9838H5.12988H3.62988V31.8443H5.12988ZM11.808 38.5225V37.0225C10.6145 37.0225 9.80954 37.0213 9.18879 36.9706C8.58556 36.9213 8.28953 36.8328 8.08982 36.731L7.40883 38.0675L6.72785 39.404C7.42096 39.7572 8.15574 39.8962 8.9445 39.9606C9.71574 40.0236 10.664 40.0225 11.808 40.0225V38.5225ZM5.12988 31.8443H3.62988C3.62988 32.9884 3.62872 33.9366 3.69173 34.7078C3.75617 35.4966 3.89513 36.2314 4.24829 36.9245L5.5848 36.2435L6.92131 35.5625C6.81955 35.3628 6.73105 35.0668 6.68177 34.4635C6.63105 33.8428 6.62988 33.0379 6.62988 31.8443H5.12988ZM7.40883 38.0675L8.08982 36.731C7.58671 36.4747 7.17766 36.0656 6.92131 35.5625L5.5848 36.2435L4.24829 36.9245C4.79226 37.9921 5.66025 38.8601 6.72785 39.404L7.40883 38.0675ZM46.8682 31.8443H45.3682C45.3682 33.0379 45.367 33.8428 45.3163 34.4635C45.267 35.0668 45.1785 35.3628 45.0767 35.5625L46.4132 36.2435L47.7498 36.9245C48.1029 36.2314 48.2419 35.4966 48.3063 34.7078C48.3693 33.9366 48.3682 32.9884 48.3682 31.8443H46.8682ZM40.19 38.5225V40.0225C41.3341 40.0225 42.2823 40.0236 43.0536 39.9606C43.8423 39.8962 44.5771 39.7572 45.2702 39.404L44.5892 38.0675L43.9082 36.731C43.7085 36.8328 43.4125 36.9213 42.8093 36.9706C42.1885 37.0213 41.3836 37.0225 40.19 37.0225V38.5225ZM46.4132 36.2435L45.0767 35.5625C44.8204 36.0656 44.4113 36.4747 43.9082 36.731L44.5892 38.0675L45.2702 39.404C46.3378 38.8601 47.2058 37.9921 47.7498 36.9245L46.4132 36.2435ZM40.19 9.30566V10.8057C41.3836 10.8057 42.1885 10.8068 42.8093 10.8575C43.4125 10.9068 43.7085 10.9953 43.9082 11.0971L44.5892 9.76058L45.2702 8.42407C44.5771 8.07091 43.8423 7.93195 43.0536 7.86751C42.2823 7.8045 41.3341 7.80566 40.19 7.80566V9.30566ZM46.8682 15.9838H48.3682C48.3682 14.8398 48.3693 13.8915 48.3063 13.1203C48.2419 12.3315 48.1029 11.5967 47.7498 10.9036L46.4132 11.5846L45.0767 12.2656C45.1785 12.4653 45.267 12.7613 45.3163 13.3646C45.367 13.9853 45.3682 14.7903 45.3682 15.9838H46.8682ZM44.5892 9.76058L43.9082 11.0971C44.4113 11.3534 44.8204 11.7625 45.0767 12.2656L46.4132 11.5846L47.7498 10.9036C47.2058 9.83603 46.3378 8.96804 45.2702 8.42407L44.5892 9.76058ZM11.808 9.30566V7.80566C10.664 7.80566 9.71574 7.8045 8.9445 7.86751C8.15574 7.93195 7.42096 8.07091 6.72785 8.42407L7.40883 9.76058L8.08982 11.0971C8.28953 10.9953 8.58556 10.9068 9.18879 10.8575C9.80954 10.8068 10.6145 10.8057 11.808 10.8057V9.30566ZM5.12988 15.9838H6.62988C6.62988 14.7903 6.63105 13.9853 6.68177 13.3646C6.73105 12.7613 6.81955 12.4653 6.92131 12.2656L5.5848 11.5846L4.24829 10.9036C3.89513 11.5967 3.75617 12.3315 3.69173 13.1203C3.62872 13.8915 3.62988 14.8398 3.62988 15.9838H5.12988ZM7.40883 9.76058L6.72785 8.42407C5.66025 8.96804 4.79226 9.83603 4.24829 10.9036L5.5848 11.5846L6.92131 12.2656C7.17766 11.7625 7.58671 11.3534 8.08982 11.0971L7.40883 9.76058ZM13.4775 40.192H11.9775V42.6963H13.4775H14.9775V40.192H13.4775ZM40.19 38.5225V37.0225H24.0512V38.5225V40.0225H40.19V38.5225ZM15.1471 43.531L16.0471 44.7311L20.9444 41.0581L20.0444 39.8581L19.1444 38.6581L14.2471 42.331L15.1471 43.531ZM24.0512 38.5225V37.0225C23.2823 37.0225 22.7 37.016 22.1279 37.1279L22.4157 38.6L22.7035 40.0721C22.9247 40.0289 23.1683 40.0225 24.0512 40.0225V38.5225ZM20.0444 39.8581L20.9444 41.0581C21.6507 40.5283 21.8494 40.3873 22.0524 40.2892L21.3993 38.9388L20.7463 37.5884C20.2215 37.8422 19.7595 38.1967 19.1444 38.6581L20.0444 39.8581ZM22.4157 38.6L22.1279 37.1279C21.6495 37.2214 21.1851 37.3762 20.7463 37.5884L21.3993 38.9388L22.0524 40.2892C22.2592 40.1892 22.478 40.1162 22.7035 40.0721L22.4157 38.6ZM13.4775 42.6963H11.9775C11.9775 44.7922 14.3703 45.9886 16.0471 44.7311L15.1471 43.531L14.2471 42.331C14.548 42.1053 14.9775 42.3201 14.9775 42.6963H13.4775ZM11.808 38.5225V40.0225C11.9016 40.0225 11.9775 40.0984 11.9775 40.192H13.4775H14.9775C14.9775 38.4415 13.5585 37.0225 11.808 37.0225V38.5225Z" fill="currentColor"/>
      </symbol>

      <symbol id={"document-2"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none">
        <path d="M9.83854 2.14746L10.2805 1.70552C10.1633 1.58831 10.0043 1.52246 9.83854 1.52246V2.14746ZM4.50521 2.14746V1.52246V2.14746ZM3.17188 3.48079H2.54688H3.17188ZM3.17188 14.1475H2.54688H3.17188ZM13.8385 6.14746H14.4635C14.4635 5.9817 14.3977 5.82273 14.2805 5.70552L13.8385 6.14746ZM9.83854 6.14746H9.21354C9.21354 6.49264 9.49336 6.77246 9.83854 6.77246V6.14746ZM11.1719 10.1058C11.5171 10.1058 11.7969 9.82597 11.7969 9.48079C11.7969 9.13562 11.5171 8.85579 11.1719 8.85579V10.1058ZM5.83854 8.85579C5.49336 8.85579 5.21354 9.13562 5.21354 9.48079C5.21354 9.82597 5.49336 10.1058 5.83854 10.1058V8.85579ZM11.1719 12.7725C11.5171 12.7725 11.7969 12.4926 11.7969 12.1475C11.7969 11.8023 11.5171 11.5225 11.1719 11.5225V12.7725ZM5.83854 11.5225C5.49336 11.5225 5.21354 11.8023 5.21354 12.1475C5.21354 12.4926 5.49336 12.7725 5.83854 12.7725V11.5225ZM7.17187 7.43913C7.51705 7.43913 7.79688 7.15931 7.79688 6.81413C7.79688 6.46895 7.51705 6.18913 7.17187 6.18913V7.43913ZM5.83854 6.18913C5.49336 6.18913 5.21354 6.46895 5.21354 6.81413C5.21354 7.15931 5.49336 7.43913 5.83854 7.43913V6.18913ZM9.83854 1.52246H4.50521V2.77246H9.83854V1.52246ZM4.50521 1.52246C3.98583 1.52246 3.48772 1.72878 3.12046 2.09604L4.00434 2.97993C4.13718 2.84709 4.31735 2.77246 4.50521 2.77246V1.52246ZM3.12046 2.09604C2.7532 2.4633 2.54688 2.96141 2.54688 3.48079H3.79688C3.79688 3.29293 3.8715 3.11277 4.00434 2.97993L3.12046 2.09604ZM2.54688 3.48079V14.1475H3.79688V3.48079H2.54688ZM2.54688 14.1475C2.54688 14.6668 2.7532 15.165 3.12046 15.5322L4.00434 14.6483C3.8715 14.5155 3.79688 14.3353 3.79688 14.1475H2.54688ZM3.12046 15.5322C3.48772 15.8995 3.98583 16.1058 4.50521 16.1058V14.8558C4.31735 14.8558 4.13718 14.7812 4.00434 14.6483L3.12046 15.5322ZM4.50521 16.1058H12.5052V14.8558H4.50521V16.1058ZM12.5052 16.1058C13.0246 16.1058 13.5227 15.8995 13.89 15.5322L13.0061 14.6483C12.8732 14.7812 12.6931 14.8558 12.5052 14.8558V16.1058ZM13.89 15.5322C14.2572 15.165 14.4635 14.6668 14.4635 14.1475H13.2135C13.2135 14.3353 13.1389 14.5155 13.0061 14.6483L13.89 15.5322ZM14.4635 14.1475V6.14746H13.2135V14.1475H14.4635ZM14.2805 5.70552L10.2805 1.70552L9.3966 2.5894L13.3966 6.5894L14.2805 5.70552ZM9.21354 2.14746V6.14746H10.4635V2.14746H9.21354ZM9.83854 6.77246H13.8385V5.52246H9.83854V6.77246ZM11.1719 8.85579H5.83854V10.1058H11.1719V8.85579ZM11.1719 11.5225H5.83854V12.7725H11.1719V11.5225ZM7.17187 6.18913H5.83854V7.43913H7.17187V6.18913Z" fill="currentColor"/>
      </symbol>

      <symbol id={"download-csv"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
        <path d="M7.24226 12.758H4.68148H2.4681C1.73172 12.758 1.13477 12.161 1.13477 11.4246V4.57552C1.13477 3.83914 1.73172 3.24219 2.4681 3.24219H7.62306H13.8333C14.5697 3.24219 15.1667 3.83914 15.1667 4.57552V6.2957M1.13916 6.2957H7.62306H9.13697M8.8833 14.6667H15.1667M12.1301 5.70723L12.1301 12.5576M9.13697 10.133L11.601 12.4823C11.8932 12.7609 12.367 12.7609 12.6593 12.4823L15.1233 10.133" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>

      <symbol id={"download-pdf"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
        <path d="M8.8837 13.9166C8.46948 13.9166 8.1337 14.2524 8.1337 14.6666C8.1337 15.0808 8.46948 15.4166 8.8837 15.4166V13.9166ZM2.63661 13.2925L3.24337 12.8517L2.63661 13.2925ZM3.37405 14.03L3.81489 13.4232L3.37405 14.03ZM12.626 1.96986L12.1851 2.57662L12.626 1.96986ZM12.7566 3.14814C13.0001 3.48325 13.4691 3.55753 13.8042 3.31406C14.1393 3.0706 14.2136 2.60157 13.9702 2.26646L12.7566 3.14814ZM15.1671 15.4166C15.5813 15.4166 15.9171 15.0808 15.9171 14.6666C15.9171 14.2524 15.5813 13.9166 15.1671 13.9166V15.4166ZM6.23663 15.4044C6.65073 15.4142 6.99438 15.0865 7.00421 14.6724C7.01404 14.2583 6.68631 13.9147 6.27221 13.9048L6.23663 15.4044ZM12.8805 5.70707C12.8805 5.29286 12.5447 4.95707 12.1305 4.95707C11.7163 4.95707 11.3805 5.29286 11.3805 5.70707H12.8805ZM11.3805 12.5574C11.3805 12.9717 11.7163 13.3074 12.1305 13.3074C12.5447 13.3074 12.8805 12.9717 12.8805 12.5574L11.3805 12.5574ZM9.65492 9.58998C9.35513 9.30415 8.88039 9.31546 8.59456 9.61525C8.30872 9.91503 8.32004 10.3898 8.61982 10.6756L9.65492 9.58998ZM11.6014 12.4822L12.119 11.9393L11.6014 12.4822ZM12.6597 12.4822L12.1421 11.9393V11.9393L12.6597 12.4822ZM15.6412 10.6756C15.941 10.3898 15.9523 9.91504 15.6665 9.61525C15.3807 9.31546 14.9059 9.30415 14.6062 9.58998L15.6412 10.6756ZM4.23673 5.33325V6.08325C4.82554 6.08325 5.33661 5.9822 5.75173 5.73957C6.18563 5.48597 6.4452 5.11847 6.58863 4.72377C6.72405 4.35111 6.75502 3.95784 6.76137 3.62284C6.76688 3.33178 6.75 2.89423 6.75 2.66379H6H5.25C5.25 3.05881 5.26783 3.26768 5.26164 3.59441C5.25627 3.87721 5.2291 4.07312 5.17883 4.21146C5.13657 4.32777 5.08287 4.39308 4.99482 4.44455C4.88799 4.50699 4.66841 4.58325 4.23673 4.58325V5.33325ZM2 7.33325H1.25V8.66659H2H2.75V7.33325H2ZM2 8.66659H1.25C1.25 9.89979 1.24897 10.8849 1.33394 11.6692C1.42043 12.4675 1.60317 13.1461 2.02985 13.7334L2.63661 13.2925L3.24337 12.8517C3.03344 12.5627 2.89787 12.1783 2.82521 11.5076C2.75103 10.8229 2.75 9.9332 2.75 8.66659H2ZM2.63661 13.2925L2.02985 13.7334C2.28171 14.08 2.58656 14.3849 2.93321 14.6367L3.37405 14.03L3.81489 13.4232C3.59558 13.2639 3.40271 13.071 3.24337 12.8517L2.63661 13.2925ZM8 1.33325V2.08325C9.26662 2.08325 10.1563 2.08428 10.841 2.15846C11.5117 2.23113 11.8962 2.36669 12.1851 2.57662L12.626 1.96986L13.0668 1.3631C12.4795 0.936423 11.8009 0.753682 11.0026 0.667192C10.2184 0.582223 9.2332 0.583252 8 0.583252V1.33325ZM12.626 1.96986L12.1851 2.57662C12.4044 2.73596 12.5973 2.92883 12.7566 3.14814L13.3634 2.7073L13.9702 2.26646C13.7183 1.91981 13.4134 1.61496 13.0668 1.3631L12.626 1.96986ZM8 1.33325V0.583252C7.22487 0.583252 6.5528 0.583158 5.97432 0.602977L6 1.35254L6.02568 2.1021C6.573 2.08335 7.21657 2.08325 8 2.08325V1.33325ZM6 1.35254L5.25 1.35253C5.25 1.95904 5.25 2.32607 5.25 2.66379H6H6.75C6.75 2.32605 6.75 1.95905 6.75 1.35254L6 1.35254ZM2 7.33325H2.75C2.75 6.54982 2.75009 5.90625 2.76885 5.35893L2.01929 5.33325L1.26973 5.30757C1.24991 5.88605 1.25 6.55812 1.25 7.33325H2ZM2.01929 5.33325L2.01929 6.08325C2.6258 6.08325 3.899 6.08325 4.23673 6.08325V5.33325V4.58325C3.89901 4.58325 2.62579 4.58325 2.01928 4.58325L2.01929 5.33325ZM2.01929 5.33325C2.76892 5.30994 2.76893 5.31018 2.76894 5.31041C2.76894 5.31048 2.76895 5.3107 2.76895 5.31084C2.76896 5.31112 2.76897 5.31137 2.76897 5.31161C2.76899 5.31207 2.769 5.31244 2.769 5.31272C2.76902 5.31329 2.76902 5.31349 2.76902 5.31334C2.76901 5.31304 2.76898 5.31133 2.76895 5.30826C2.76889 5.30213 2.76885 5.29061 2.76908 5.27415C2.76953 5.24119 2.77105 5.18874 2.77561 5.12039C2.78477 4.98309 2.80595 4.78501 2.85394 4.55371C2.95121 4.0849 3.15063 3.5176 3.54692 3.03482L2.96721 2.55897L2.3875 2.08312C1.78734 2.81426 1.5128 3.63411 1.38522 4.24896C1.32079 4.55948 1.29182 4.82736 1.27894 5.02057C1.27247 5.11746 1.27 5.19641 1.26922 5.25352C1.26883 5.2821 1.26885 5.30529 1.26902 5.3226C1.2691 5.33126 1.26922 5.33846 1.26934 5.34414C1.26939 5.34698 1.26945 5.34944 1.26951 5.35151C1.26953 5.35255 1.26956 5.35349 1.26958 5.35433C1.26959 5.35475 1.26961 5.35515 1.26962 5.35552C1.26962 5.3557 1.26963 5.35597 1.26963 5.35606C1.26964 5.35631 1.26965 5.35656 2.01929 5.33325ZM2.96721 2.55897L3.54692 3.03482C3.89202 2.6144 4.45993 2.3652 5.02989 2.2304C5.30371 2.16563 5.55256 2.13332 5.73234 2.11742C5.82165 2.10952 5.89237 2.1058 5.93873 2.10406C5.96187 2.10319 5.97881 2.10281 5.98884 2.10265C5.99384 2.10257 5.99711 2.10255 5.99855 2.10254C5.99926 2.10254 5.99952 2.10254 5.99931 2.10254C5.9992 2.10254 5.99898 2.10254 5.99863 2.10254C5.99846 2.10254 5.99826 2.10254 5.99803 2.10253C5.99791 2.10253 5.99771 2.10253 5.99766 2.10253C5.99745 2.10253 5.99724 2.10253 6 1.35254C6.00276 0.602543 6.00253 0.602542 6.0023 0.602541C6.00221 0.602541 6.00197 0.60254 6.00179 0.60254C6.00143 0.602539 6.00104 0.602538 6.00063 0.602537C5.99979 0.602536 5.99882 0.602536 5.99773 0.602537C5.99556 0.602539 5.99288 0.602547 5.98971 0.602566C5.98338 0.602603 5.97509 0.602683 5.96494 0.602845C5.94465 0.603168 5.91687 0.60382 5.88238 0.605116C5.81349 0.607706 5.71733 0.612887 5.60016 0.623252C5.36699 0.643879 5.04447 0.685564 4.68464 0.77067C3.98732 0.935599 3.03884 1.28962 2.3875 2.08312L2.96721 2.55897ZM8.8837 14.6666V15.4166H15.1671V14.6666V13.9166H8.8837V14.6666ZM6.25442 14.6546L6.27221 13.9048C4.87133 13.8716 4.24913 13.7387 3.81489 13.4232L3.37405 14.03L2.93321 14.6367C3.7854 15.2559 4.85237 15.3716 6.23663 15.4044L6.25442 14.6546ZM12.1305 5.70707H11.3805L11.3805 12.5574L12.1305 12.5574H12.8805L12.8805 5.70707H12.1305ZM9.13737 10.1328L8.61982 10.6756L11.0839 13.025L11.6014 12.4822L12.119 11.9393L9.65492 9.58998L9.13737 10.1328ZM12.6597 12.4822L13.1772 13.025L15.6412 10.6756L15.1237 10.1328L14.6062 9.58998L12.1421 11.9393L12.6597 12.4822ZM11.6014 12.4822L11.0839 13.025C11.6658 13.5798 12.5952 13.5798 13.1772 13.025L12.6597 12.4822L12.1421 11.9393C12.1428 11.9387 12.1431 11.9388 12.1416 11.9393C12.1397 11.9401 12.1358 11.9411 12.1305 11.9411C12.1253 11.9411 12.1214 11.9401 12.1194 11.9393C12.1179 11.9388 12.1183 11.9387 12.119 11.9393L11.6014 12.4822Z" fill="currentColor"/>
      </symbol>

      <symbol id={"reports"} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.3239 10.8735L20.2172 11.5472L20.2172 11.5472L20.3239 10.8735ZM16.8764 7.42595L16.2027 7.53264L16.2027 7.53264L16.8764 7.42595ZM8.58108 21.7453L8.98198 21.1935L8.58108 21.7453ZM7.66354 20.8278L8.21533 20.4269L7.66354 20.8278ZM21.0101 20.8278L20.4583 20.4269L21.0101 20.8278ZM20.0926 21.7453L19.6917 21.1935L20.0926 21.7453ZM20.0926 6.73975L20.4935 6.18796L20.4935 6.18796L20.0926 6.73975ZM21.0101 7.65729L21.5619 7.25639L21.5619 7.25639L21.0101 7.65729ZM8.58108 6.73975L8.98198 7.29154L8.58108 6.73975ZM7.66354 7.65729L8.21533 8.05819L7.66354 7.65729ZM16.8253 5.97165L16.8486 5.29L16.8253 5.97165ZM21.7782 10.9246L22.4599 10.9012L21.7782 10.9246ZM11.2119 17.5987C10.8352 17.5987 10.5298 17.9041 10.5298 18.2808C10.5298 18.6575 10.8352 18.9628 11.2119 18.9628V17.5987ZM13.7004 18.9628C14.077 18.9628 14.3824 18.6575 14.3824 18.2808C14.3824 17.9041 14.077 17.5987 13.7004 17.5987V18.9628ZM11.2119 14.2808C10.8352 14.2808 10.5298 14.5862 10.5298 14.9628C10.5298 15.3395 10.8352 15.6449 11.2119 15.6449V14.2808ZM17.8478 15.6449C18.2245 15.6449 18.5298 15.3395 18.5298 14.9628C18.5298 14.5862 18.2245 14.2808 17.8478 14.2808V15.6449ZM11.2119 10.9628C10.8352 10.9628 10.5298 11.2682 10.5298 11.6449C10.5298 12.0216 10.8352 12.3269 11.2119 12.3269V10.9628ZM13.7004 12.3269C14.077 12.3269 14.3824 12.0216 14.3824 11.6449C14.3824 11.2682 14.077 10.9628 13.7004 10.9628V12.3269ZM3.36582 16.718L3.91761 16.3171L3.91761 16.3171L3.36582 16.718ZM15.7949 2.62998L15.394 3.18177L15.394 3.18177L15.7949 2.62998ZM4.28337 2.62998L3.88247 2.07819L3.88247 2.07819L4.28337 2.62998ZM3.36582 3.54753L2.81403 3.14663L2.81403 3.14663L3.36582 3.54753ZM12.5276 1.86189L12.5509 1.18024L12.5509 1.18024L12.5276 1.86189ZM20.3239 10.8735L20.4306 10.1999C18.9478 9.96501 17.7849 8.80206 17.55 7.31925L16.8764 7.42595L16.2027 7.53264C16.53 9.59915 18.1507 11.2199 20.2172 11.5472L20.3239 10.8735ZM21.8022 13.413H21.1202V15.072H21.8022H22.4843V13.413H21.8022ZM6.87145 15.072H7.5535V13.413H6.87145H6.1894V15.072H6.87145ZM14.3368 22.5374V21.8554C12.7665 21.8554 11.6435 21.8544 10.7749 21.7603C9.91904 21.6676 9.39144 21.491 8.98198 21.1935L8.58108 21.7453L8.18018 22.2971C8.86094 22.7917 9.65604 23.0112 10.6279 23.1165C11.5871 23.2204 12.7968 23.2195 14.3368 23.2195V22.5374ZM6.87145 15.072H6.1894C6.1894 16.612 6.18846 17.8218 6.29238 18.7809C6.39767 19.7528 6.61715 20.5479 7.11175 21.2287L7.66354 20.8278L8.21533 20.4269C7.91784 20.0174 7.74126 19.4898 7.64854 18.634C7.55443 17.7654 7.5535 16.6424 7.5535 15.072H6.87145ZM8.58108 21.7453L8.98198 21.1935C8.68779 20.9798 8.42907 20.7211 8.21533 20.4269L7.66354 20.8278L7.11175 21.2287C7.40963 21.6387 7.77018 21.9992 8.18018 22.2971L8.58108 21.7453ZM21.8022 15.072H21.1202C21.1202 16.6424 21.1192 17.7654 21.0251 18.634C20.9324 19.4898 20.7558 20.0174 20.4583 20.4269L21.0101 20.8278L21.5619 21.2287C22.0565 20.5479 22.276 19.7528 22.3813 18.7809C22.4852 17.8218 22.4843 16.612 22.4843 15.072H21.8022ZM14.3368 22.5374V23.2195C15.8768 23.2195 17.0866 23.2204 18.0457 23.1165C19.0176 23.0112 19.8127 22.7917 20.4935 22.2971L20.0926 21.7453L19.6917 21.1935C19.2822 21.491 18.7546 21.6676 17.8988 21.7603C17.0302 21.8544 15.9072 21.8554 14.3368 21.8554V22.5374ZM21.0101 20.8278L20.4583 20.4269C20.2446 20.7211 19.9859 20.9798 19.6917 21.1935L20.0926 21.7453L20.4935 22.2971C20.9035 21.9992 21.264 21.6387 21.5619 21.2287L21.0101 20.8278ZM20.0926 6.73975L19.6917 7.29154C19.9859 7.50528 20.2446 7.764 20.4583 8.05819L21.0101 7.65729L21.5619 7.25639C21.264 6.8464 20.9035 6.48584 20.4935 6.18796L20.0926 6.73975ZM14.3368 5.94766V5.26561C12.7968 5.26561 11.5871 5.26467 10.6279 5.36859C9.65604 5.47389 8.86094 5.69336 8.18018 6.18796L8.58108 6.73975L8.98198 7.29154C9.39144 6.99405 9.91904 6.81748 10.7749 6.72475C11.6435 6.63065 12.7665 6.62971 14.3368 6.62971V5.94766ZM6.87145 13.413H7.5535C7.5535 11.8427 7.55443 10.7197 7.64854 9.85108C7.74126 8.99525 7.91784 8.46766 8.21533 8.05819L7.66354 7.65729L7.11175 7.25639C6.61715 7.93715 6.39767 8.73225 6.29238 9.70415C6.18846 10.6633 6.1894 11.8731 6.1894 13.413H6.87145ZM8.58108 6.73975L8.18018 6.18796C7.77018 6.48584 7.40963 6.8464 7.11175 7.25639L7.66354 7.65729L8.21533 8.05819C8.42907 7.764 8.68779 7.50528 8.98198 7.29154L8.58108 6.73975ZM14.3368 5.94766V6.62971C15.3102 6.62971 16.1157 6.6298 16.8019 6.65331L16.8253 5.97165L16.8486 5.29C16.1341 5.26552 15.3027 5.26561 14.3368 5.26561V5.94766ZM16.8253 5.97165L16.8019 6.65331C18.3398 6.706 19.1223 6.87789 19.6917 7.29154L20.0926 6.73975L20.4935 6.18796C19.5621 5.51127 18.4034 5.34327 16.8486 5.29L16.8253 5.97165ZM16.8253 5.97165L16.1432 5.97166C16.1432 6.7013 16.1417 7.14746 16.2027 7.53264L16.8764 7.42595L17.55 7.31925C17.51 7.06638 17.5074 6.75128 17.5073 5.97165L16.8253 5.97165ZM21.8022 13.413H22.4843C22.4843 12.4472 22.4844 11.6158 22.4599 10.9012L21.7782 10.9246L21.0966 10.9479C21.1201 11.6341 21.1202 12.4397 21.1202 13.413H21.8022ZM21.7782 10.9246L22.4599 10.9012C22.4066 9.34649 22.2386 8.18777 21.5619 7.25639L21.0101 7.65729L20.4583 8.05819C20.872 8.62753 21.0439 9.41004 21.0966 10.9479L21.7782 10.9246ZM21.7782 10.9246L21.7782 10.2425C20.9986 10.2425 20.6835 10.2399 20.4306 10.1999L20.3239 10.8735L20.2172 11.5472C20.6024 11.6082 21.0486 11.6066 21.7782 11.6066L21.7782 10.9246ZM11.2119 18.2808V18.9628H13.7004V18.2808V17.5987H11.2119V18.2808ZM11.2119 14.9628V15.6449H17.8478V14.9628V14.2808H11.2119V14.9628ZM11.2119 11.6449V12.3269H13.7004V11.6449V10.9628H11.2119V11.6449ZM2.57373 10.9623H3.25578V9.30328H2.57373H1.89168V10.9623H2.57373ZM2.57373 10.9623H1.89168C1.89168 12.5022 1.89074 13.712 1.99466 14.6711C2.09996 15.643 2.31943 16.4381 2.81403 17.1189L3.36582 16.718L3.91761 16.3171C3.62012 15.9076 3.44355 15.38 3.35082 14.5242C3.25672 13.6556 3.25578 12.5326 3.25578 10.9623H2.57373ZM4.78008 17.7115V17.0294C4.78733 17.0294 4.75384 17.0299 4.67235 16.9908C4.59449 16.9535 4.50134 16.8936 4.39975 16.8129C4.19345 16.6489 4.0112 16.4459 3.91761 16.3171L3.36582 16.718L2.81403 17.1189C2.97625 17.3422 3.24305 17.636 3.55089 17.8807C3.83131 18.1036 4.2778 18.3935 4.78008 18.3935V17.7115ZM15.7949 2.62998L15.394 3.18177C15.519 3.2726 15.6616 3.40731 15.7674 3.56075C15.874 3.71528 15.9168 3.84924 15.9168 3.95524H16.5989H17.2809C17.2809 3.48799 17.0979 3.08723 16.8904 2.7864C16.6822 2.48447 16.4228 2.24318 16.1958 2.07819L15.7949 2.62998ZM10.0391 1.83789V1.15584C8.49913 1.15584 7.28936 1.1549 6.33022 1.25882C5.35833 1.36412 4.56322 1.58359 3.88247 2.07819L4.28337 2.62998L4.68426 3.18177C5.09373 2.88428 5.62132 2.70771 6.47715 2.61498C7.34575 2.52088 8.46875 2.51994 10.0391 2.51994V1.83789ZM2.57373 9.30328H3.25578C3.25578 7.73291 3.25672 6.60991 3.35082 5.74131C3.44355 4.88548 3.62012 4.35789 3.91761 3.94842L3.36582 3.54753L2.81403 3.14663C2.31943 3.82738 2.09996 4.62249 1.99466 5.59438C1.89074 6.55352 1.89168 7.76329 1.89168 9.30328H2.57373ZM4.28337 2.62998L3.88247 2.07819C3.47247 2.37607 3.11191 2.73663 2.81403 3.14663L3.36582 3.54753L3.91761 3.94842C4.13135 3.65423 4.39007 3.39552 4.68426 3.18177L4.28337 2.62998ZM10.0391 1.83789V2.51994C11.0125 2.51994 11.818 2.52003 12.5042 2.54354L12.5276 1.86189L12.5509 1.18024C11.8364 1.15575 11.005 1.15584 10.0391 1.15584V1.83789ZM12.5276 1.86189L12.5042 2.54354C14.0421 2.59623 14.8246 2.76812 15.394 3.18177L15.7949 2.62998L16.1958 2.07819C15.2644 1.4015 14.1057 1.2335 12.5509 1.18024L12.5276 1.86189Z" fill="currentColor"/>
      </symbol>

      <symbol id={"attachments"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9.49283 8.38379V16.4772C9.50327 17.069 9.7731 17.6334 10.2441 18.0486C10.7151 18.4638 11.3495 18.6965 12.0104 18.6965C12.6713 18.6965 13.3056 18.4638 13.7766 18.0486C14.2476 17.6334 14.5175 17.069 14.5279 16.4772L14.5361 5.86885C14.5429 5.36301 14.4376 4.86098 14.2262 4.39187C14.0148 3.92276 13.7015 3.4959 13.3046 3.13602C12.9076 2.77615 12.4348 2.49043 11.9136 2.29542C11.3924 2.10041 10.8332 2 10.2683 2C9.70351 2 9.14428 2.10041 8.62309 2.29542C8.1019 2.49043 7.62912 2.77615 7.23214 3.13602C6.83517 3.4959 6.5219 3.92276 6.3105 4.39187C6.0991 4.86098 5.99378 5.36301 6.00063 5.86885V16.5486C5.98912 17.2608 6.1358 17.9678 6.43213 18.6288C6.72846 19.2897 7.16854 19.8913 7.72677 20.3985C8.28501 20.9058 8.95026 21.3086 9.68386 21.5835C10.4175 21.8584 11.2048 22 12 22C12.7952 22 13.5825 21.8584 14.3161 21.5835C15.0497 21.3086 15.715 20.9058 16.2732 20.3985C16.8315 19.8913 17.2715 19.2897 17.5679 18.6288C17.8642 17.9678 18.0109 17.2608 17.9994 16.5486V6.56876" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
      </symbol>
    </svg>
  )
}

export default Sprites
