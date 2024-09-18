import React, { useState } from 'react'
import cl from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'

//* COMPONENTS
import LogoComponent from '../../shared/modules/LogoComponent/LogoComponent'
import FormLogin from '../../widgets/FormLogin/FormLogin'
import FormRegistration from '../../widgets/FormRegistration/FormRegistration'
import FormDataInfo from '../../widgets/FormDataInfo/FormDataInfo'
import FormSurvey from '../../widgets/FormSurvey/FormSurvey'
import data from '../../data/data'

import ellipse1 from '../../shared/assets/Ellipse49.svg'
import ellipse2 from '../../shared/assets/Ellipse50.svg'

function LoginPage() {

    const navigate = useNavigate();
    const [step, setStep] = useState('login');
    const interests = data.getInterests();

    // Функция для перехода на форму регистрации
    const handleLoginSuccess = () => {
      setStep('registration');
    };

    // Функция для перехода на форму заполнения данных
    const handleRegistrationSuccess = () => {
      setStep('dataInfo');
    };
    
    // Функция для обработки успешного заполнения данных (если необходимо)
    const handleDataInfoSuccess = () => {
      setStep('survey');
    };

    const handleFinishSuccess = () => {
      navigate('/');
      console.log('Data info form submitted successfully');
    };

  return (
    <div className={cl.loginPage}>
        
        <div className={`${cl.loginPage__spots} ${cl.spot1}`}><img src={ellipse1} alt="ellipse1" /></div>
        <div className={`${cl.loginPage__spots} ${cl.spot2}`}><img src={ellipse2} alt="ellipse2" /></div>

        <LogoComponent/>
        {
          step === 'login'
          ? <FormLogin onLoginSuccess={handleLoginSuccess} />
          : step === 'registration'
          ? <FormRegistration title="Регистрация" onRegistrationSuccess={handleRegistrationSuccess} />
          : step === 'dataInfo'
          ? <FormDataInfo onDataInfoSuccess={handleDataInfoSuccess} />
          : step === 'survey'
          ? <FormSurvey onSurveySuccess={handleFinishSuccess} interests={interests}/>
          : null
        }
        
    </div>
  )
}

export default LoginPage