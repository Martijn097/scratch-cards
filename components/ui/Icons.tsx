const HomeIcon = ({ className = "", ...props }) => (
  <svg 
    className={`fill-current ${className}`} 
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 5.59631L42 17.5963V42H6V17.5963L24 5.59631ZM10 19.737V38H16.6667V23.7778H31.3333V38H38V19.737L24 10.4037L10 19.737ZM27.3333 38V27.7778H20.6667V38H27.3333Z"
    />
  </svg>
);

const UserIcon = ({ className = "", ...props }) => (
  <svg 
    className={`fill-current ${className}`} 
    width="48" 
    height="48" 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M28.2044 11.705C25.7809 9.42475 22.1196 9.43168 19.7036 11.7258C17.4155 13.8985 17.4214 17.7508 19.7889 20.2886C21.932 22.5859 25.7199 22.5827 28.2265 20.2025C30.5601 17.9867 30.6295 14.1742 28.2044 11.705ZM16.9493 8.82515C20.9163 5.05829 27.0137 5.05828 30.9808 8.82515C30.9954 8.83906 31.0098 8.85319 31.0241 8.86754C34.9677 12.8462 35.0307 19.2576 30.9808 23.1032C27.097 26.791 20.7354 27.1671 16.864 23.0172C13.217 19.1077 12.847 12.7204 16.9493 8.82515ZM18.8633 32C15.3256 32 12 35.2202 12 40C12 41.1046 11.1046 42 10 42C8.89543 42 8 41.1046 8 40C8 33.4162 12.732 28 18.8633 28H29.1367C35.5247 28 40 33.7058 40 40C40 41.1046 39.1046 42 38 42C36.8954 42 36 41.1046 36 40C36 35.3851 32.8206 32 29.1367 32H18.8633Z" 
    />
  </svg>
);

const GiftIcon = ({ className = "", ...props }) => (
  <svg 
    className={`fill-current ${className}`} 
    width="48" 
    height="48" 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path 
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.572 12.4004L16.5858 9.41424L19.4142 6.58582L24.5941 11.7657L29.7741 6.58582L32.6025 9.41424L29.6163 12.4004H40.8V26.0004H39.2V42H9.60001V26.0004H8V12.4004H19.572ZM22.4 16.4004H12V22H22.4V16.4004ZM13.6 26.0004V38H22.4L22.4 26.0004H13.6ZM26.4 26.0004V38H35.2V26.0004H26.4ZM36.8 22H26.4V16.4004H36.8V22Z"
    />
  </svg>
);

const LogoutIcon = ({ className = "", ...props }) => (
  <svg 
    className={`fill-current ${className}`} 
    width="48" 
    height="48" 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.9999 42L5.99994 42L5.99994 6L27.9999 6L27.9999 10L9.99994 10L9.99994 38L27.9999 38L27.9999 42ZM33.3882 33.4397L30.6117 30.5603L35.0445 26.2858L16 26.2861L15.9999 22.2861L35.0447 22.2858L30.6117 18.0111L33.3882 15.1317L42.8812 24.2857L33.3882 33.4397Z"
    />
  </svg>
);

export { HomeIcon, UserIcon, GiftIcon, LogoutIcon };