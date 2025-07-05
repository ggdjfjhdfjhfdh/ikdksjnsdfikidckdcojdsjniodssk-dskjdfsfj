export const securityQuizTranslations = {
  ES: {
    pageTitle: 'Test de Conocimientos de Ciberseguridad',
    pageDescription: 'Evalúa tu conocimiento en ciberseguridad con este cuestionario interactivo',
    startQuiz: 'Comenzar Test',
    categories: {
      fundamentals: 'Fundamentos',
      passwords: 'Contraseñas',
      phishing: 'Phishing',
      privacy: 'Privacidad',
      devices: 'Dispositivos',
      networks: 'Redes',
      backups: 'Copias de seguridad'
    },
    quizResults: {
      score: {
        ES: 'Puntuación',
        EN: 'Score'
      },
      correctAnswers: {
        ES: 'respuestas correctas',
        EN: 'correct answers'
      },
      tryAgain: {
        ES: 'Intentar de nuevo',
        EN: 'Try again'
      },
      explanation: {
        ES: 'Explicación',
        EN: 'Explanation'
      },
      excellent: {
        ES: '¡Excelente! 🎉',
        EN: 'Excellent! 🎉'
      },
      goodJob: {
        ES: '¡Buen trabajo! 👍',
        EN: 'Good job! 👍'
      },
      keepPracticing: {
        ES: '¡Sigue practicando! 💪',
        EN: 'Keep practicing! 💪'
      },
      emailSubject: {
        ES: 'Resultado Test Ciberseguridad',
        EN: 'Cybersecurity Quiz Results'
      },
      yourAnswer: {
        ES: 'Tu respuesta',
        EN: 'Your answer'
      },
      correct: {
        ES: 'Correcta',
        EN: 'Correct'
      },
      incorrect: {
        ES: 'Incorrecta',
        EN: 'Incorrect'
      }
    },
    questions: {
      fundamentals: [
        {
          q: {
            ES: '¿Qué principio dicta otorgar solo los permisos absolutamente necesarios para realizar una tarea?',
            EN: 'What principle dictates granting only the absolutely necessary permissions to perform a task?'
          },
          options: {
            ES: ['Separación de funciones', 'Principio de menor privilegio', 'Defensa en profundidad'],
            EN: ['Separation of duties', 'Principle of least privilege', 'Defense in depth']
          },
          answer: 1,
          explanation: {
            ES: 'Limitar los privilegios reduce la superficie de ataque y contiene el daño si una cuenta es comprometida.',
            EN: 'Limiting privileges reduces the attack surface and contains damage if an account is compromised.'
          }
        },
        {
          q: {
            ES: '¿Cuál es la diferencia entre una vulnerabilidad y una amenaza?',
            EN: 'What is the difference between a vulnerability and a threat?'
          },
          options: {
            ES: [
              'Ninguna, son sinónimos',
              'Una vulnerabilidad es una debilidad; una amenaza es el agente o evento que puede explotarla',
              'Amenaza = fallo interno; vulnerabilidad = ataque externo'
            ],
            EN: [
              'None, they are synonyms',
              'A vulnerability is a weakness; a threat is the agent or event that may exploit it',
              'Threat = internal failure; vulnerability = external attack'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'La amenaza aprovecha la vulnerabilidad para impactar la confidencialidad, integridad o disponibilidad.',
            EN: 'The threat leverages the vulnerability to impact confidentiality, integrity or availability.'
          }
        },
        {
          q: {
            ES: '¿Qué es la autenticación multifactor (MFA)?',
            EN: 'What is multi-factor authentication (MFA)?'
          },
          options: {
            ES: [
              'Usar múltiples contraseñas',
              'Verificación en dos pasos con diferentes tipos de credenciales',
              'Tener varias cuentas de usuario'
            ],
            EN: [
              'Using multiple passwords',
              'Two-step verification with different credential types',
              'Having multiple user accounts'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'MFA requiere dos o más factores de autenticación (algo que sabes, algo que tienes, algo que eres) para mayor seguridad.',
            EN: 'MFA requires two or more authentication factors (something you know, have, or are) for enhanced security.'
          }
        }
      ],
      passwords: [
        {
          q: {
            ES: '¿Qué algoritmo de hash se recomienda actualmente para almacenar contraseñas?',
            EN: 'What hashing algorithm is currently recommended for password storage?'
          },
          options: {
            ES: ['MD5', 'SHA-256', 'Argon2id'],
            EN: ['MD5', 'SHA-256', 'Argon2id']
          },
          answer: 2,
          explanation: {
            ES: 'Argon2id —con parámetros exigentes (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— o, en su defecto, PBKDF2 con iteraciones altas, mitiga ataques de fuerza bruta acelerados por GPU/ASIC.',
            EN: 'Argon2id —with demanding parameters (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— or alternatively PBKDF2 with high iterations, mitigates GPU/ASIC accelerated brute force attacks.'
          }
        }
      ],
      phishing: [
        {
          q: {
            ES: '¿Qué es el phishing?',
            EN: 'What is phishing?'
          },
          options: {
            ES: [
              'Un tipo de malware',
              'Un ataque de fuerza bruta',
              'Un engaño para obtener información confidencial'
            ],
            EN: [
              'A malware infection method',
              'A credential theft technique',
              'A network intrusion strategy'
            ]
          },
          answer: 2,
          explanation: {
            ES: 'El phishing es un tipo de ataque social en el que se intenta obtener información confidencial, como contraseñas o números de tarjeta de crédito, mediante el envío de correos electrónicos o mensajes fraudulentos.',
            EN: 'Phishing is specifically designed to trick users into revealing sensitive credentials like passwords, typically through deceptive emails or websites.'
          }
        }
      ],
      privacy: [
        {
          q: {
            ES: '¿Qué es la privacidad en el ámbito digital?',
            EN: 'What best defines digital privacy?'
          },
          options: {
            ES: [
              'La protección de la información personal',
              'La seguridad de la información',
              'La libertad de expresión'
            ],
            EN: [
              'Protection of personal information',
              'Security of confidential data',
              'Control over personal data usage'
            ]
          },
          answer: 0,
          explanation: {
            ES: 'La privacidad en el ámbito digital se refiere a la protección de la información personal y la capacidad de controlar quién tiene acceso a ella.',
            EN: 'Digital privacy specifically concerns protecting individuals\' personal information from unauthorized access or misuse.'
          }
        }
      ],
      devices: [
        {
          q: {
            ES: '¿Qué es un dispositivo seguro?',
            EN: 'What is the most critical factor for device security?'
          },
          options: {
            ES: [
              'Un dispositivo con un sistema operativo actualizado',
              'Un dispositivo con un antivirus instalado',
              'Un dispositivo con un firewall activado'
            ],
            EN: [
              'An updated operating system',
              'Installed antivirus software',
              'An enabled firewall'
            ]
          },
          answer: 0,
          explanation: {
            ES: 'Un dispositivo seguro es aquel que tiene un sistema operativo actualizado, un antivirus instalado y un firewall activado, entre otras medidas de seguridad.',
            EN: 'OS updates patch vulnerabilities that could otherwise be exploited. While antivirus and firewalls are important, they cannot protect against unpatched system vulnerabilities.'
          }
        }
      ],
      networks: [
        {
          q: {
            ES: '¿Qué es una red segura?',
            EN: 'What is the most essential characteristic of a secure network?'
          },
          options: {
            ES: [
              'Una red con un router configurado',
              'Una red con un firewall activado',
              'Una red con una conexión segura (HTTPS)'
            ],
            EN: [
              'A network with a configured router',
              'A network with an enabled firewall',
              'A network using HTTPS connections'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'Una red segura es aquella que tiene un firewall activado, una conexión segura (HTTPS) y un router configurado, entre otras medidas de seguridad.',
            EN: 'While all options contribute to security, a firewall is the most fundamental network security control as it monitors and filters all incoming/outgoing traffic.'
          }
        }
      ],
      backups: [
        {
          q: {
            ES: '¿Qué es un respaldo de datos?',
            EN: 'What is a data backup?'
          },
          options: {
            ES: [
              'Una copia de seguridad de los datos',
              'Una copia de los datos en un dispositivo externo',
              'Una copia de los datos en la nube'
            ],
            EN: [
              'A security copy of the data',
              'A copy of the data on an external device',
              'A copy of the data in the cloud'
            ]
          },
          answer: 0,
          explanation: {
            ES: 'Un respaldo de datos es una copia de seguridad de los datos que se almacena en un dispositivo externo o en la nube, para poder recuperarlos en caso de pérdida o daño.',
            EN: 'A data backup is a security copy of the data that is stored on an external device or in the cloud, so that it can be recovered in case of loss or damage.'
          }
        },
        {
          q: {
            ES: '¿Qué es la regla 3-2-1 para copias de seguridad?',
            EN: 'What is the 3-2-1 backup rule?'
          },
          options: {
            ES: [
              '3 copias, 2 formatos, 1 ubicación',
              '3 copias, 2 ubicaciones, 1 fuera del sitio',
              '3 días, 2 horas, 1 minuto'
            ],
            EN: [
              '3 copies, 2 formats, 1 location',
              '3 copies, 2 locations, 1 off-site',
              '3 days, 2 hours, 1 minute'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'La regla 3-2-1 recomienda: 3 copias de los datos, en 2 tipos diferentes de medios de almacenamiento, con al menos 1 copia almacenada fuera del sitio.',
            EN: 'The 3-2-1 rule recommends: 3 copies of data, on 2 different storage media types, with at least 1 copy stored off-site.'
          }
        }
      ]
    },
    buttons: {
      back: {
        ES: 'Atrás',
        EN: 'Back'
      },
      next: {
        ES: 'Siguiente',
        EN: 'Next'
      },
      restart: {
        ES: 'Reiniciar',
        EN: 'Restart'
      },
      viewResults: {
        ES: 'Ver resultados',
        EN: 'View results'
      },
      backToTools: {
        ES: 'Volver',
        EN: 'Back'
      },
      share: {
        ES: 'Compartir',
        EN: 'Share'
      }
    },
    results: {
      yourScore: {
        ES: 'Tu puntuación',
        EN: 'Your score'
      },
      outOf: {
        ES: 'de',
        EN: 'out of'
      },
      questionsCorrect: {
        ES: 'preguntas correctas',
        EN: 'questions correct'
      },
      reviewQuestions: {
        ES: 'Revisión de preguntas',
        EN: 'Question review'
      },
      yourAnswer: {
        ES: 'Tu respuesta',
        EN: 'Your answer'
      },
      correctAnswer: {
        ES: 'Respuesta correcta',
        EN: 'Correct answer'
      },
      explanation: {
        ES: 'Explicación',
        EN: 'Explanation'
      },
      excellent: {
        ES: '¡Excelente!',
        EN: 'Excellent!'
      },
      good: {
        ES: '¡Buen trabajo!',
        EN: 'Good job!'
      },
      average: {
        ES: 'Promedio',
        EN: 'Average'
      },
      needsImprovement: {
        ES: 'Necesita mejorar',
        EN: 'Needs improvement'
      },
      shareSuccess: {
        ES: 'Enlace copiado al portapapeles',
        EN: 'Link copied to clipboard'
      }
    },
    progress: {
      question: {
        ES: 'Pregunta',
        EN: 'Question'
      },
      of: {
        ES: 'de',
        EN: 'of'
      },
      completed: {
        ES: 'completado',
        EN: 'completed'
      }
    },
    footer: {
      tagline: {
        ES: 'Protección digital con tecnología de vanguardia.',
        EN: 'Digital protection with cutting-edge technology.'
      },
      slogan: {
        ES: 'Tu seguridad, nuestra prioridad.',
        EN: 'Your security, our priority.'
      },
      links: {
        purpose: {
          ES: 'Propósito',
          EN: 'Purpose'
        },
        solutions: {
          ES: 'Soluciones',
          EN: 'Solutions'
        },
        resources: {
          ES: 'Recursos',
          EN: 'Resources'
        },
        contact: {
          ES: 'Contacto',
          EN: 'Contact'
        }
      },
      legal: {
        terms: {
          ES: 'Aviso Legal',
          EN: 'Terms of Service'
        },
        privacy: {
          ES: 'Política de Privacidad',
          EN: 'Privacy Policy'
        },
        cookies: {
          ES: 'Política de Cookies',
          EN: 'Cookie Policy'
        }
      },
      rights: {
        ES: 'Todos los derechos reservados.',
        EN: 'All rights reserved.'
      }
    }
  },
  EN: {
    pageTitle: 'Security Knowledge Quiz',
    pageDescription: 'Test your cybersecurity knowledge with this interactive quiz',
    startQuiz: 'Start Quiz',
    categories: {
      fundamentals: 'Fundamentals',
      passwords: 'Passwords',
      phishing: 'Phishing',
      privacy: 'Privacy',
      devices: 'Devices',
      networks: 'Networks',
      backups: 'Backups'
    },
    quizResults: {
      score: {
        ES: 'Puntuación',
        EN: 'Score'
      },
      correctAnswers: {
        ES: 'respuestas correctas',
        EN: 'correct answers'
      },
      tryAgain: {
        ES: 'Intentar de nuevo',
        EN: 'Try again'
      },
      explanation: {
        ES: 'Explicación',
        EN: 'Explanation'
      },
      excellent: {
        ES: '¡Excelente! 🎉',
        EN: 'Excellent! 🎉'
      },
      goodJob: {
        ES: '¡Buen trabajo! 👍',
        EN: 'Good job! 👍'
      },
      keepPracticing: {
        ES: '¡Sigue practicando! 💪',
        EN: 'Keep practicing! 💪'
      },
      emailSubject: {
        ES: 'Resultado Test Ciberseguridad',
        EN: 'Cybersecurity Quiz Results'
      },
      yourAnswer: {
        ES: 'Tu respuesta',
        EN: 'Your answer'
      },
      correct: {
        ES: 'Correcta',
        EN: 'Correct'
      },
      incorrect: {
        ES: 'Incorrecta',
        EN: 'Incorrect'
      }
    },
    questions: {
      fundamentals: [
        {
          q: {
            ES: '¿Qué principio dicta otorgar solo los permisos absolutamente necesarios para realizar una tarea?',
            EN: 'What principle dictates granting only the absolutely necessary permissions to perform a task?'
          },
          options: {
            ES: ['Separación de funciones', 'Principio de menor privilegio', 'Defensa en profundidad'],
            EN: ['Separation of duties', 'Principle of least privilege', 'Defense in depth']
          },
          answer: 1,
          explanation: {
            ES: 'Limitar los privilegios reduce la superficie de ataque y contiene el daño si una cuenta es comprometida.',
            EN: 'Limiting privileges reduces the attack surface and contains damage if an account is compromised.'
          }
        },
        {
          q: {
            ES: '¿Cuál es la diferencia entre una vulnerabilidad y una amenaza?',
            EN: 'What is the difference between a vulnerability and a threat?'
          },
          options: {
            ES: [
              'Ninguna, son sinónimos',
              'Una vulnerabilidad es una debilidad; una amenaza es el agente o evento que puede explotarla',
              'Amenaza = fallo interno; vulnerabilidad = ataque externo'
            ],
            EN: [
              'None, they are synonyms',
              'A vulnerability is a weakness; a threat is the agent or event that may exploit it',
              'Threat = internal failure; vulnerability = external attack'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'La amenaza aprovecha la vulnerabilidad para impactar la confidencialidad, integridad o disponibilidad.',
            EN: 'The threat leverages the vulnerability to impact confidentiality, integrity or availability.'
          }
        },
        {
          q: {
            ES: '¿Qué es la autenticación multifactor (MFA)?',
            EN: 'What is multi-factor authentication (MFA)?'
          },
          options: {
            ES: [
              'Usar múltiples contraseñas',
              'Verificación en dos pasos con diferentes tipos de credenciales',
              'Tener varias cuentas de usuario'
            ],
            EN: [
              'Using multiple passwords',
              'Two-step verification with different credential types',
              'Having multiple user accounts'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'MFA requiere dos o más factores de autenticación (algo que sabes, algo que tienes, algo que eres) para mayor seguridad.',
            EN: 'MFA requires two or more authentication factors (something you know, have, or are) for enhanced security.'
          }
        }
      ],
      passwords: [
        {
          q: {
            ES: '¿Qué algoritmo de hash se recomienda actualmente para almacenar contraseñas?',
            EN: 'What hashing algorithm is currently recommended for password storage?'
          },
          options: {
            ES: ['MD5', 'SHA-256', 'Argon2id'],
            EN: ['MD5', 'SHA-256', 'Argon2id']
          },
          answer: 2,
          explanation: {
            ES: 'Argon2id —con parámetros exigentes (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— o, en su defecto, PBKDF2 con iteraciones altas, mitiga ataques de fuerza bruta acelerados por GPU/ASIC.',
            EN: 'Argon2id —with demanding parameters (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— or alternatively PBKDF2 with high iterations, mitigates GPU/ASIC accelerated brute force attacks.'
          }
        }
      ],
      phishing: [
        {
          q: {
            ES: '¿Qué es el phishing?',
            EN: 'What is phishing?'
          },
          options: {
            ES: [
              'Un tipo de malware',
              'Un ataque de fuerza bruta',
              'Un engaño para obtener información confidencial'
            ],
            EN: [
              'A malware infection method',
              'A credential theft technique',
              'A network intrusion strategy'
            ]
          },
          answer: 2,
          explanation: {
            ES: 'El phishing es un tipo de ataque social en el que se intenta obtener información confidencial, como contraseñas o números de tarjeta de crédito, mediante el envío de correos electrónicos o mensajes fraudulentos.',
            EN: 'Phishing is specifically designed to trick users into revealing sensitive credentials like passwords, typically through deceptive emails or websites.'
          }
        }
      ],
      privacy: [
        {
          q: {
            ES: '¿Qué es la privacidad en el ámbito digital?',
            EN: 'What best defines digital privacy?'
          },
          options: {
            ES: [
              'La protección de la información personal',
              'La seguridad de la información',
              'La libertad de expresión'
            ],
            EN: [
              'Protection of personal information',
              'Security of confidential data',
              'Control over personal data usage'
            ]
          },
          answer: 0,
          explanation: {
            ES: 'La privacidad en el ámbito digital se refiere a la protección de la información personal y la capacidad de controlar quién tiene acceso a ella.',
            EN: 'Digital privacy specifically concerns protecting individuals\' personal information from unauthorized access or misuse.'
          }
        }
      ],
      devices: [
        {
          q: {
            ES: '¿Qué es un dispositivo seguro?',
            EN: 'What is the most critical factor for device security?'
          },
          options: {
            ES: [
              'Un dispositivo con un sistema operativo actualizado',
              'Un dispositivo con un antivirus instalado',
              'Un dispositivo con un firewall activado'
            ],
            EN: [
              'An updated operating system',
              'Installed antivirus software',
              'An enabled firewall'
            ]
          },
          answer: 0,
          explanation: {
            ES: 'Un dispositivo seguro es aquel que tiene un sistema operativo actualizado, un antivirus instalado y un firewall activado, entre otras medidas de seguridad.',
            EN: 'OS updates patch vulnerabilities that could otherwise be exploited. While antivirus and firewalls are important, they cannot protect against unpatched system vulnerabilities.'
          }
        }
      ],
      networks: [
        {
          q: {
            ES: '¿Qué es una red segura?',
            EN: 'What is the most essential characteristic of a secure network?'
          },
          options: {
            ES: [
              'Una red con un router configurado',
              'Una red con un firewall activado',
              'Una red con una conexión segura (HTTPS)'
            ],
            EN: [
              'A network with a configured router',
              'A network with an enabled firewall',
              'A network using HTTPS connections'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'Una red segura es aquella que tiene un firewall activado, una conexión segura (HTTPS) y un router configurado, entre otras medidas de seguridad.',
            EN: 'While all options contribute to security, a firewall is the most fundamental network security control as it monitors and filters all incoming/outgoing traffic.'
          }
        }
      ],
      backups: [
        {
          q: {
            ES: '¿Qué es un respaldo de datos?',
            EN: 'What is a data backup?'
          },
          options: {
            ES: [
              'Una copia de seguridad de los datos',
              'Una copia de los datos en un dispositivo externo',
              'Una copia de los datos en la nube'
            ],
            EN: [
              'A security copy of the data',
              'A copy of the data on an external device',
              'A copy of the data in the cloud'
            ]
          },
          answer: 0,
          explanation: {
            ES: 'Un respaldo de datos es una copia de seguridad de los datos que se almacena en un dispositivo externo o en la nube, para poder recuperarlos en caso de pérdida o daño.',
            EN: 'A data backup is a security copy of the data that is stored on an external device or in the cloud, so that it can be recovered in case of loss or damage.'
          }
        },
        {
          q: {
            ES: '¿Qué es la regla 3-2-1 para copias de seguridad?',
            EN: 'What is the 3-2-1 backup rule?'
          },
          options: {
            ES: [
              '3 copias, 2 formatos, 1 ubicación',
              '3 copias, 2 ubicaciones, 1 fuera del sitio',
              '3 días, 2 horas, 1 minuto'
            ],
            EN: [
              '3 copies, 2 formats, 1 location',
              '3 copies, 2 locations, 1 off-site',
              '3 days, 2 hours, 1 minute'
            ]
          },
          answer: 1,
          explanation: {
            ES: 'La regla 3-2-1 recomienda: 3 copias de los datos, en 2 tipos diferentes de medios de almacenamiento, con al menos 1 copia almacenada fuera del sitio.',
            EN: 'The 3-2-1 rule recommends: 3 copies of data, on 2 different storage media types, with at least 1 copy stored off-site.'
          }
        }
      ]
    },
    buttons: {
      back: {
        ES: 'Atrás',
        EN: 'Back'
      },
      next: {
        ES: 'Siguiente',
        EN: 'Next'
      },
      restart: {
        ES: 'Reiniciar',
        EN: 'Restart'
      },
      viewResults: {
        ES: 'Ver resultados',
        EN: 'View results'
      },
      backToTools: {
        ES: 'Volver',
        EN: 'Back'
      },
      share: {
        ES: 'Compartir',
        EN: 'Share'
      }
    },
    results: {
      yourScore: {
        ES: 'Tu puntuación',
        EN: 'Your score'
      },
      outOf: {
        ES: 'de',
        EN: 'out of'
      },
      questionsCorrect: {
        ES: 'preguntas correctas',
        EN: 'questions correct'
      },
      reviewQuestions: {
        ES: 'Revisión de preguntas',
        EN: 'Question review'
      },
      yourAnswer: {
        ES: 'Tu respuesta',
        EN: 'Your answer'
      },
      correctAnswer: {
        ES: 'Respuesta correcta',
        EN: 'Correct answer'
      },
      explanation: {
        ES: 'Explicación',
        EN: 'Explanation'
      },
      excellent: {
        ES: '¡Excelente!',
        EN: 'Excellent!'
      },
      good: {
        ES: '¡Buen trabajo!',
        EN: 'Good job!'
      },
      average: {
        ES: 'Promedio',
        EN: 'Average'
      },
      needsImprovement: {
        ES: 'Necesita mejorar',
        EN: 'Needs improvement'
      },
      shareSuccess: {
        ES: 'Enlace copiado al portapapeles',
        EN: 'Link copied to clipboard'
      }
    },
    progress: {
      question: {
        ES: 'Pregunta',
        EN: 'Question'
      },
      of: {
        ES: 'de',
        EN: 'of'
      },
      completed: {
        ES: 'completado',
        EN: 'completed'
      }
    },
    footer: {
      tagline: {
        ES: 'Protección digital con tecnología de vanguardia.',
        EN: 'Digital protection with cutting-edge technology.'
      },
      slogan: {
        ES: 'Tu seguridad, nuestra prioridad.',
        EN: 'Your security, our priority.'
      },
      links: {
        purpose: {
          ES: 'Propósito',
          EN: 'Purpose'
        },
        solutions: {
          ES: 'Soluciones',
          EN: 'Solutions'
        },
        resources: {
          ES: 'Recursos',
          EN: 'Resources'
        },
        contact: {
          ES: 'Contacto',
          EN: 'Contact'
        }
      },
      legal: {
        terms: {
          ES: 'Aviso Legal',
          EN: 'Terms of Service'
        },
        privacy: {
          ES: 'Política de Privacidad',
          EN: 'Privacy Policy'
        },
        cookies: {
          ES: 'Política de Cookies',
          EN: 'Cookie Policy'
        }
      },
      rights: {
        ES: 'Todos los derechos reservados.',
        EN: 'All rights reserved.'
      }
    }
  }
};

export type SecurityQuizTranslationKey = keyof typeof securityQuizTranslations.ES;
