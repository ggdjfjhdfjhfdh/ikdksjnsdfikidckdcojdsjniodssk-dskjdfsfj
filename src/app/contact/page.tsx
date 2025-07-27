'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, AtSign, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/LanguageContext';
import Footer from '@/components/Footer';
import { useForm, FieldErrors } from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import Image from 'next/image';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function ContactPage() {
  const { t } = useI18n();
  const [result, setResult] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<FormData>({ mode: 'onTouched' });

  // Lee la API key de Web3Forms desde el entorno (.env o .env.local). Ambas funcionan con Next.js si la variable empieza por NEXT_PUBLIC_
  const accessKey = '2c1f7424-fab8-41da-8934-12f7fa156646'

  if (!accessKey) {
    console.warn('Web3Forms API key is missing. Añádala en .env o .env.local como NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY');
  }

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey || '',
    settings: {
      from_name: 'Sesecpro Web',
      subject: 'Nuevo mensaje de contacto',
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setResult(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setResult(msg);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 to-blue-100/60 relative overflow-x-hidden">
      {/* Fondo decorativo moderno */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-100/40 rounded-full blur-2xl z-0 animate-float2" />

      {/* Hero con imagen y glassmorphism */}
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center">
        <Image
          src="/hero-contact.png"
          alt={t('contactTitle')}
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm z-10" aria-hidden="true"></div>
        <div className="relative z-20 w-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-200 drop-shadow-lg tracking-tight">{t('contactTitle')}</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90 drop-shadow-sm font-light">
            {t('contactSubtitle')}
          </p>
        </div>
      </section>

      {/* Contact cards grid - glassmorphism y animaciones */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-20 relative z-10"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form card glassmorphism */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-2xl p-10 transition-all flex flex-col gap-6 animate-fade-in"
              whileHover={{ scale: 1.015 }}
            >
              {/* Floating labels y feedback animado */}


              <div className="flex items-center mb-8">
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mr-6">
                  <MessageCircle className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{t('contactForm')}</h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t('contactFormName')}</label>
                    <input 
                      {...register('name', { required: t('contactValidationNameRequired') })}
                      className={`w-full px-5 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-black ${errors.name ? 'border-red-500' : ''}`}
                      placeholder={t('contactFormNamePlaceholder')}
                    />
                    {errors.name && <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2"
                    >
                      {errors.name.message}
                    </motion.p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t('contactFormEmail')}</label>
                    <input 
                      {...register('email', { 
                        required: t('contactValidationEmailRequired'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('contactValidationEmailInvalid')
                        }
                      })}
                      className={`w-full px-5 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-black ${errors.email ? 'border-red-500' : ''}`}
                      placeholder={t('contactFormEmailPlaceholder')}
                      type="email"
                    />
                    {errors.email && <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2"
                    >
                      {errors.email.message}
                    </motion.p>}
                  </div>
                </motion.div>
                
                <motion.div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t('contactFormSubject')}</label>
                  <input 
                    {...register('subject', { required: t('contactValidationMessageRequired') })}
                    className={`w-full px-5 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-black ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder={t('contactFormSubjectPlaceholder')}
                  />
                  {errors.subject && <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.subject.message}
                  </motion.p>}
                </motion.div>
                
                <motion.div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t('contactFormMessage')}</label>
                  <textarea 
                    {...register('message', { 
                      required: t('contactValidationMessageRequired'),
                      minLength: {
                        value: 10,
                        message: t('contactValidationMessageMinLength')
                      }
                    })}
                    className={`w-full px-5 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-black ${errors.message ? 'border-red-500' : ''}`}
                    rows={5}
                    placeholder={t('contactFormMessagePlaceholder')}
                  ></textarea>
                  {errors.message && <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.message.message}
                  </motion.p>}
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="w-5 h-5 mx-auto text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    t('contactFormSubmit')
                  )}
                </motion.button>
                {isSubmitSuccessful && isSuccess && (
                  <div className="mt-3 text-sm text-center text-green-500">
                    {result || 'Mensaje enviado correctamente'}
                  </div>
                )}
                {isSubmitSuccessful && !isSuccess && (
                  <div className="mt-3 text-sm text-center text-red-500">
                    {result || 'Algo salió mal. Intenta más tarde.'}
                  </div>
                )}
              </form>
            </motion.div>

            {/* Email card con glassmorphism y CTA visual */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.035 }}
              className="bg-white/60 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-2xl p-10 flex flex-col items-center justify-center gap-4 animate-fade-in"
            >
              <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-yellow-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md animate-pop">
                <AtSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight">{t('contactMethodEmail')}</h3>
              <p className="text-gray-600 mb-3 text-center">{t('contactMethodEmailDesc')}</p>
              <a href="mailto:contacto@sesecpro.es" className="inline-block text-xl font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 animate-cta">
                contacto@sesecpro.es
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
