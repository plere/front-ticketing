import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getToken } from "./LoginApi";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  customHeaders?: {
    name: string,
    value: () => string
  }[];
  handlers?: {
    status: number,
    handler: (error: AxiosError) => Promise<never>
  }[];
  _retry?: boolean;
};

export const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      config.customHeaders?.forEach(({name, value}) => {
        config.headers.set(name, value());
      });
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalConfig = error.config as CustomAxiosRequestConfig;
      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          try{
            if(!originalConfig._retry) {
              originalConfig._retry = true;
              await getToken();

              return axiosInstance(originalConfig);
            } else {
              throw new Error("조건 불일치");
            }
          } catch(err) {
            const findHandler = originalConfig?.handlers?.find(handler => handler.status === 401);

            if(findHandler) {
              return findHandler?.handler(error);
            }
            
            console.error('인증 에러: 로그인이 필요합니다.');
            window.location.href = '/';
          }          
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