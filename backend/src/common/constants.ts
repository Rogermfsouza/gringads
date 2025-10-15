export const ALL_COUNTRIES_EXCEPT_BR = [
  'US', 'IN', 'GB', 'CA', 'AR', 'AU', 'AT', 'BE', 'CL', 'CN',
  'CO', 'HR', 'DK', 'DO', 'EG', 'FI', 'FR', 'DE', 'GR', 'HK',
  'ID', 'IE', 'IL', 'IT', 'JP', 'JO', 'KW', 'LB', 'MY', 'MX',
  'NL', 'NZ', 'NG', 'NO', 'PK', 'PA', 'PE', 'PH', 'PL', 'RU',
  'SA', 'RS', 'SG', 'ZA', 'KR', 'ES', 'SE', 'CH', 'TW', 'TH',
  'TR', 'AE', 'VE', 'PT', 'LU', 'BG', 'CZ', 'SI', 'IS', 'SK',
  'LT', 'TT', 'BD', 'LK', 'KE', 'HU', 'MA', 'CY', 'JM', 'EC',
  'RO', 'BO', 'GT', 'CR', 'QA', 'SV', 'HN', 'NI', 'PY', 'UY',
  'PR', 'BA', 'PS', 'TN', 'BH', 'VN', 'GH', 'MU', 'UA', 'MT',
  'BS', 'MV', 'OM', 'MK', 'LV', 'EE', 'IQ', 'DZ', 'AL', 'NP',
  'MO', 'ME', 'SN', 'GE', 'BN', 'UG', 'GP', 'BB', 'AZ', 'TZ',
  'LY', 'MQ', 'CM', 'BW', 'ET', 'KZ', 'NA', 'MG', 'NC', 'MD',
  'FJ', 'BY', 'JE', 'GU', 'YE', 'ZM', 'IM', 'HT', 'KH', 'AW',
  'PF', 'AF', 'BM', 'GY', 'AM', 'MW', 'AG', 'RW', 'GG', 'GM',
  'FO', 'LC', 'KY', 'BJ', 'AD', 'GD', 'VI', 'BZ', 'VC', 'MN',
  'MZ', 'ML', 'AO', 'GF', 'UZ', 'DJ', 'BF', 'MC', 'TG', 'GL',
  'GA', 'GI', 'CD', 'KG', 'PG', 'BT', 'KN', 'SZ', 'LS', 'LA',
  'LI', 'MP', 'SR', 'SC', 'VG', 'TC', 'DM', 'MR', 'AX', 'SM',
  'SL', 'NE', 'CG', 'AI', 'YT', 'CV', 'GN', 'TM', 'BI', 'TJ',
  'VU', 'SB', 'ER', 'WS', 'AS', 'FK', 'GQ', 'TO', 'KM', 'PW',
  'FM', 'CF', 'SO', 'MH', 'VA', 'TD', 'KI', 'ST', 'TV', 'NR',
  'RE', 'LR', 'ZW', 'CI', 'MM', 'AN', 'AQ', 'BQ', 'BV', 'IO',
  'CX', 'CC', 'CK', 'CW', 'TF', 'GW', 'HM', 'XK', 'MS', 'NU',
  'NF', 'PN', 'BL', 'SH', 'MF', 'PM', 'SX', 'GS', 'SS', 'SJ',
  'TL', 'TK', 'UM', 'WF', 'EH',
];

export const TOP_COUNTRIES = [
  'US',
  'GB',
  'CA',
  'AU',
  'DE',
  'FR',
  'ES',
  'MX',
  'IT',
  'NL',
];

export const FACEBOOK_API_VERSION = 'v21.0';

export const DEFAULT_SCRAPING_PARAMS = {
  ad_active_status: 'ACTIVE' as const,
  limit: 100,
  min_days_running: 4,
};

export const QUALITY_THRESHOLDS = {
  gold: 80,
  silver: 60,
  bronze: 0,
};

export const RATE_LIMIT_DEFAULTS = {
  requestsPerHour: 200,
  delayMs: 3000,
};

