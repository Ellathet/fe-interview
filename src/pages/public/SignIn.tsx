import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { PasswordInput } from '../../components/password-input';
import { routes } from '../../routes/Router';

const signInSchema = z.object({
  username: z.string({
    required_error: 'You need input a username.',
  }),
  password: z.string({
    required_error: 'You need input a password.',
  }),
});

type SignInSchema = z.infer<typeof signInSchema>;

export const SignIn = () => {
  const navigate = useNavigate();
  const { login, token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate(routes.home.path);
    }
  }, [navigate, token]);

  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    disabled: isLoading,
  });

  const handleLogin = useCallback(
    async (data: SignInSchema) => {
      setLoading(true);
      try {
        await login({
          username: data.username,
          password: data.password,
        });
      } catch (error) {
        toast.error('Senha ou e-mail inválido');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [login],
  );

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="w-[15%]">
        <h1 className="font-bold text-2xl ">Welcome back!</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-2"
        >
          <span className="font-medium">Username</span>
          <Input
            {...register('username')}
            placeholder="your_username"
            autoComplete="username"
          />
          {errors.username && (
            <span className="text-red-400 text-sm">
              {errors.username.message}
            </span>
          )}
          <span className="font-medium">Password</span>
          <PasswordInput
            {...register('password')}
            placeholder="Your password"
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="text-red-400 text-sm">
              {errors.password.message}
            </span>
          )}
          <Button
            type="submit"
            variant="secondary"
            className="w-[100%] mt-2 hover:text-primary"
          >
            {isLoading ? (
              <LoaderCircle className="rotate w-4 h-4" />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
