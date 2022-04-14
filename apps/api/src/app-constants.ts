export enum HttpCode {
  Success = 200,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

export enum InstanceNames {
  SSRF = 'app_ssrf',
  StoredXSS = 'app_stored_xss',
  CSRF = 'app_stored_xss',
  OWASP = 'app_juice_shop'
}

export const INIT_INSTANCE_DELAY: Record<InstanceNames, number> = {
  [InstanceNames.SSRF]: 5000,
  [InstanceNames.StoredXSS]: 5000,
  [InstanceNames.CSRF]: 5000,
  [InstanceNames.OWASP]: 8000,
}
