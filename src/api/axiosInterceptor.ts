import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipGlobal401?: boolean; // 이 값이 true면 공통 401 처리를 무시함
}

export const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const originalConfig = error.config as CustomAxiosRequestConfig;
      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          if (originalConfig && originalConfig.skipGlobal401) {
            console.log('공통 401 처리를 건너뛰고 컴포넌트로 에러를 넘깁니다.');
            return Promise.reject(error);
          }
          
          console.error('인증 에러: 로그인이 필요합니다.');
          window.location.href = '/';
        } else if (status === 500) {
          console.error('서버 에러가 발생했습니다.');
        }
      } else if (error.request) {
        console.error('응답을 받지 못했습니다. 네트워크를 확인해주세요.');
      }
      
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};