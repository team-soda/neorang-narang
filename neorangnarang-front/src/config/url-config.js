let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  // 백엔드 서버 포트 (톰캣)
  backendHost = "http://localhost:8081";
}

const OAUTH2_REDIRECT_URL = "http://localhost:3000/auth/oauth2/redirect";
export const API_BASE_URL = `${backendHost}`;
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/google?redirect_uri=${OAUTH2_REDIRECT_URL}`;
export const KAKAO_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${OAUTH2_REDIRECT_URL}`;
export const NAVER_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/naver?redirect_uri=${OAUTH2_REDIRECT_URL}`;
