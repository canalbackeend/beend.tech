
export type Language = 'pt' | 'en';

export const translations = {
  pt: {
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      skills: 'Tecnologias',
      contact: 'Contato',
    },
    hero: {
      discipline: 'Disciplina',
      role: 'Arquitetura Full-Stack &\nExperiências Digitais de Marca',
      location: 'Localização',
      city: 'Brasília, DF',
    },
    heroPhrases: ["BEM-VINDO À", "BEEND.TECH BY", "MÁRCIO CRISTIANO"],
    about: {
      title: 'O Estúdio',
      heading: 'Precisão.\nClareza.\nArquitetura.',
      description: 'Com sede em Brasília, BEEND.TECH atua na interseção de estética de alto nível e excelência técnica. Construímos fundações digitais que priorizam o desempenho e o impacto visual.',
      stats: {
        projects: 'Criações',
        experience: 'Anos ativos',
      },
    },
    projects: {
      label: 'Portfólio',
      title: 'ALGUNS TRABALHOS',
      description: 'Construindo bases digitais através de tipografia precisa e clareza visual.',
      links: {
        code: 'Código',
        demo: 'Live Demo',
      },
      items: [
        {
          id: 'ecommerce',
          title: 'Plataforma E-Commerce',
          category: 'Full Stack',
          description: 'Solução moderna de e-commerce construída com React, Node.js e integração Stripe.',
          briefing: 'O desafio era criar uma experiência de compra fluida com foco em alta performance e conversão. Desenvolvemos uma arquitetura que suporta milhares de acessos simultâneos com checkout simplificado.',
          stack: ['React', 'Node.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
          images: [
            'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80'
          ]
        },
        {
          id: 'ai-chat',
          title: 'Assistente AI Chat',
          category: 'AI / LLM',
          description: 'Interface de chatbot inteligente usando Gemini API para processamento de linguagem natural.',
          briefing: 'Implementação de uma interface conversacional avançada. O projeto foca em latência mínima e respostas contextuais precisas, utilizando os modelos mais recentes de LLM.',
          stack: ['Gemini API', 'TypeScript', 'Next.js', 'Framer Motion'],
          images: [
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1673188509341-f40445ec6f10?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1620712943543-bcc463867000?auto=format&fit=crop&q=80'
          ]
        },
        {
          id: 'health-dashboard',
          title: 'Dashboard de Saúde',
          category: 'Visualização de Dados',
          description: 'Painel de bem-estar pessoal com visualização de dados em tempo real e rastreamento de progresso.',
          briefing: 'Dashboard analítico para monitoramento de bio-dados. Foco em UX intuitiva para visualização de métricas complexas de forma clara e acionável.',
          stack: ['D3.js', 'React', 'Firebase', 'SVG Animation'],
          images: [
            'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1504868584819-f8e90526354e?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'
          ]
        }
      ]
    },
    skills: {
      label: 'Ethos do Estúdio',
      title: 'Tecnologias\nDominadas.',
      description: 'Construindo fundações digitais por meio de código preciso, estrutura intencional e clareza intransigente.',
      categories: ['Frontend', 'Backend', 'Banco de Dados', 'Plataformas']
    },
    contact: {
      label: 'Entre em contato',
      title: "Vamos construir\nalgo\njuntos.",
      details: {
        email: 'E-mail',
        social: 'Social',
      },
      form: {
        name: 'Seu Nome',
        email: 'E-mail',
        phone: 'Telefone',
        message: 'Mensagem',
        placeholderName: 'Digite aqui o seu nome',
        placeholderEmail: 'seu@email.com',
        placeholderPhone: '+55 (00) 00000-0000',
        placeholderMessage: 'Deixe-nos uma mensagem aqui...',
        submit: 'Enviar Mensagem',
      }
    },
    footer: {
      builtBy: 'Desenvolvido por BEEND.TECH ©',
    }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      discipline: 'Discipline',
      role: 'Full-Stack Architecture &\nDigital Brand Experiences',
      location: 'Location',
      city: 'Brasília, DF',
    },
    heroPhrases: ["WELCOME TO", "BEEND.TECH BY", "MÁRCIO CRISTIANO"],
    about: {
      title: 'The Studio',
      heading: 'Precision.\nClarity.\nArchitecture.',
      description: 'Based in Brasília, BEEND.TECH operates at the intersection of high-end aesthetics and technical excellence. We build digital foundations that prioritize performance and visual impact.',
      stats: {
        projects: 'Creations',
        experience: 'Years active',
      },
    },
    projects: {
      label: 'Portfolio',
      title: 'Selected Work',
      description: 'Building digital foundations through precise typography and visual clarity.',
      links: {
        code: 'Code',
        demo: 'Live Demo',
      },
      items: [
        {
          id: 'ecommerce',
          title: 'E-Commerce Platform',
          category: 'Full Stack',
          description: 'A modern e-commerce solution built with React, Node.js, and Stripe integration.',
          briefing: 'The challenge was to create a seamless shopping experience with a focus on high performance and conversion. We developed an architecture that supports thousands of concurrent users with simplified checkout.',
          stack: ['React', 'Node.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
          images: [
            'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80'
          ]
        },
        {
          id: 'ai-chat',
          title: 'AI Chat Assistant',
          category: 'AI / LLM',
          description: 'Intelligent chatbot interface using Gemini API for natural language processing.',
          briefing: 'Implementation of an advanced conversational interface. The project focuses on minimal latency and precise contextual responses, utilizing the latest LLM models.',
          stack: ['Gemini API', 'TypeScript', 'Next.js', 'Framer Motion'],
          images: [
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1673188509341-f40445ec6f10?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1620712943543-bcc463867000?auto=format&fit=crop&q=80'
          ]
        },
        {
          id: 'health-tracker',
          title: 'Health Tracker',
          category: 'Data Viz',
          description: 'Personal wellness dashboard with real-time data visualization and progress tracking.',
          briefing: 'Analytical dashboard for bio-data monitoring. Focus on intuitive UX for visualizing complex metrics in a clear and actionable way.',
          stack: ['D3.js', 'React', 'Firebase', 'SVG Animation'],
          images: [
            'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1504868584819-f8e90526354e?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'
          ]
        }
      ]
    },
    skills: {
      label: 'Studio Ethos',
      title: 'Mastered\nTechnologies.',
      description: 'Building digital foundations through precise code, intentional structure, and uncompromising clarity.',
      categories: ['Frontend', 'Backend', 'Database', 'Platforms']
    },
    contact: {
      label: 'Get in Touch',
      title: "Let's build\nsomething\ntogether.",
      details: {
        email: 'Email',
        social: 'Social',
      },
      form: {
        name: 'Your Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Message',
        placeholderName: 'Type your name here',
        placeholderEmail: 'your@email.com',
        placeholderPhone: '+1 (000) 000-0000',
        placeholderMessage: 'Leave us a message here...',
        submit: 'Send Message',
      }
    },
    footer: {
      builtBy: 'Built by BEEND.TECH ©',
    }
  }
};
