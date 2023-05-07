import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//import { Link } from 'components';
//import { Layout } from 'components/account';
import { userService, alertService } from '../../../services';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );

  return (
    <div className={containerClassName}>
      <div className='flex flex-column align-items-center justify-content-center'>
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme === 'light' ? 'dark' : 'white'
          }.svg`}
          alt='Sakai logo'
          className='mb-5 w-6rem flex-shrink-0'
        />
        <div
          style={{
            borderRadius: '56px',
            fontFamily: 'Prompt',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
          }}
        >
          <div
            className='w-full surface-card py-8 px-5 sm:px-8'
            style={{ borderRadius: '53px' }}
          >
            <div className='text-center mb-5'>
              <img
                src='/demo/images/login/avatar.png'
                alt='Image'
                height='50'
                className='mb-3'
              />
              <div className='text-900 text-3xl font-medium mb-3'>
                ระบบบริหารจัดการข้อมูลเว็บไซต์ฯ!
              </div>
              <span className='text-600 font-medium'>
                สำนักส่งเสริมวิชาการและงานทะเบียน
              </span>
            </div>

            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                  <label>Username</label>
                  <input
                    name='username'
                    type='text'
                    {...register('username')}
                    className={`form-control ${
                      errors.username ? 'is-invalid' : ''
                    }`}
                  />
                  <div className='invalid-feedback'>
                    {errors.username?.message}
                  </div>
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    name='password'
                    type='password'
                    {...register('password')}
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                  />
                  <div className='invalid-feedback'>
                    {errors.password?.message}
                  </div>
                </div>
                <button
                  disabled={formState.isSubmitting}
                  className='btn btn-primary'
                >
                  {formState.isSubmitting && (
                    <span className='spinner-border spinner-border-sm mr-1'></span>
                  )}
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      <title>
        สำนักส่งเสริมวิชาการและงานทะเบียน |
        ระบบจัดการข้อมูลเว็บสำนักส่งเสริมวิชาการและงานทะเบียน
      </title>
      <meta charSet='UTF-8' />
      <meta
        name='description'
        content='สำนักส่งเสริมวิชาการและงานทะเบียน, ระบบจัดการข้อมูล, เว็บสำนักส่งเสริมวิชาการและงานทะเบียน.'
      />
      <meta name='robots' content='index, follow' />
      <meta name='viewport' content='initial-scale=1, width=device-width' />
      <meta property='og:type' content='website'></meta>
      <meta
        property='og:title'
        content='สำนักส่งเสริมวิชาการและงานทะเบียน | เว็บสำนักส่งเสริมวิชาการและงานทะเบียน'
      ></meta>
      <meta property='og:url' content='https://academic.pcru.ac.th'></meta>
      <meta
        property='og:description'
        content='เว็บสำนักส่งเสริมวิชาการและงานทะเบียน, สำนักส่งเสริมวิชาการและงานทะเบียน.'
      />
      <meta
        property='og:image'
        content='https://academic.pcru.ac.th/main/static/media/str_academic.fad24ac9.png'
      ></meta>
      <meta property='og:ttl' content='604800'></meta>
      <link
        href='https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&display=swap'
        rel='stylesheet'
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      ></link>
      <link rel='icon' href={`/favicon.ico`} type='image/x-icon'></link>

      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
export default LoginPage;
