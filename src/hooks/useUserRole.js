import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
import axios from 'axios';
import useAuth from './useAuth';

const useUserRole = () => {
  const { user } = useAuth();

  const { data: role = 'donor', isLoading, isError, error } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://blood-donation-serverset.vercel.app/users/role/${user.email}`);
      if (!res.data || !res.data.role) {
        throw new Error("Role not found");
      }
      return res.data.role;
    },
  });

  return [role, isLoading, isError, error];
};

export default useUserRole;


