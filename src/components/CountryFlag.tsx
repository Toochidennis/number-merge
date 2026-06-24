interface CountryFlagProps {
  countryCode: string;
  className?: string;
  title?: string;
}

export function CountryFlag({ countryCode, className = '', title }: CountryFlagProps) {
  const normalizedCode = countryCode.toUpperCase();
  return <span className={`country-flag-svg flag:${normalizedCode} ${className}`} role="img" aria-label={title ?? `${normalizedCode} flag`} />;
}
