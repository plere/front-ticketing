import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const { status } = error.response;
        
        if (status === 401) {
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