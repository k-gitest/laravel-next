import useSWR from 'swr'
import { larafetch } from '@/lib/larafetch'
import { useRouter } from 'next/router'
import type { LoginCredentials, RegisterCredentials, User } from '@/types/index'
import useAuthStore from '@/stores/auth';

type UseAuthOptions = {
  middleware?: 'guest' | 'auth';
};

export const useAuth = ({ middleware }: UseAuthOptions = {}) => {
  const router = useRouter()
  const { setUser, clearUser } = useAuthStore();

  const { data: user, error, mutate } = useSWR('/api/user', async () =>
    await larafetch.get('/api/user')
      .then(res => {
        setUser(res.data);
        return res.data
      })
      .catch(error => {
        clearUser();
        if (error.response.status !== 409) throw error
      }),
  )

  const csrf = () => larafetch.get('/sanctum/csrf-cookie')

  const register = async (credentials: RegisterCredentials) => {
    await csrf()

    await larafetch.post('/register', credentials)
      .then((res) => {
        console.log(res);
        mutate();
      }).catch((error) => {
        console.error(error);
      });
  }

  const login = async (credentials: LoginCredentials) => {
    await csrf()

    await larafetch.post('/login', credentials)
      .then((res) => {
        console.log(res);
        () => mutate();
        router.push('/dashboard')
      }).catch((error) => {
        console.error(error);
      });
  }

  const logout = async () => {
    await larafetch.post('/logout')
      .then((res) => {
        console.log(res);
        mutate();
        router.push('/login')
      })
  }

  return {
    register,
    login,
    logout,
  }

}

export const fetchCurrentUser = async () => {
  try {
    return await larafetch('/api/user')
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}