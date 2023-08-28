import PageWrapper from '@/features/app/components/PageWrapper';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/app/components/ui/card';
import LoginForm from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <PageWrapper titleText='Login'>
      <div className='grid h-full w-full place-items-center px-4 py-4'>
        <Card className='w-full sm:w-[25rem]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium'>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
