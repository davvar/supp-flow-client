import { AxiosError } from 'axios';

export const getAxiosErrCode =(errCodeUserFn: (code: number | null) => any)  => {
  return (err: AxiosError | Error) => {
    let code: number | null = null

    if ((err as AxiosError).isAxiosError) {
      code = (err as AxiosError).response?.status || null
    } else {
      code = (err as any)?.code || null
    }

    return errCodeUserFn(code)
  }
}
