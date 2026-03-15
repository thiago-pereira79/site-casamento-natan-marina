/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MapPin,
  Gift,
  Camera,
  CheckCircle2,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Clock,
  ExternalLink,
  Trash2,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import casal from "./assets/casal.jpeg";
import casal1 from "./assets/casal1.jpeg";
import casal2 from "./assets/casal2.jpeg";
import casal3 from "./assets/casal3.jpeg";
import casal4 from "./assets/casal4.jpeg";
import casal5 from "./assets/casal5.jpeg";
import casal6 from "./assets/casal6.jpeg";
import casal7 from "./assets/casal7.jpeg";
import casal8 from "./assets/casal8.jpeg";
import casal9 from "./assets/casal9.jpeg";
import casal10 from "./assets/casal10.jpeg";
import casal11 from "./assets/casal11.jpeg";
import casal12 from "./assets/casal12.jpeg";

// --- Types ---
interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

// --- Components ---
const Monogram = ({ className = "" }: { className?: string }) => (
  <div className={`font-serif text-2xl md:text-3xl tracking-tighter ${className}`}>
    N <span className="text-dusty-blue">&</span> M
  </div>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block mb-2"
    >
      <Heart className="w-5 h-5 text-dusty-blue mx-auto mb-4" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="heading-serif text-4xl md:text-5xl text-stone-800 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-stone-500 italic max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [lastRsvpAttending, setLastRsvpAttending] = useState<boolean>(true);
  const [msgStatus, setMsgStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminStatus, setAdminStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [adminError, setAdminError] = useState('');

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date('2026-06-27T12:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Recuperar modo admin da sessão
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('wedding_admin_password');
    if (savedPassword) {
      setAdminPassword(savedPassword);
      setIsAdmin(true);
    }
  }, []);

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  // carregar + atualizar automaticamente
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatMessageDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdminStatus('loading');
    setAdminError('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPasswordInput }),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.error || 'Não foi possível entrar no modo admin.');
      }

      setIsAdmin(true);
      setAdminPassword(adminPasswordInput);
      sessionStorage.setItem('wedding_admin_password', adminPasswordInput);
      setAdminPasswordInput('');
      setAdminPanelOpen(false);
      setAdminStatus('idle');
    } catch (err: any) {
      setAdminStatus('error');
      setAdminError(err.message || 'Senha incorreta.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
    setAdminPasswordInput('');
    setAdminError('');
    sessionStorage.removeItem('wedding_admin_password');
  };

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRsvpStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const guests = formData.get('guests') as string;
    const attending = formData.get('attending') === 'sim';
    setLastRsvpAttending(attending);

    const data = {
      name,
      phone,
      email,
      guests: parseInt(guests),
      attending,
    };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.error || 'Não foi possível enviar o RSVP.');
      }

      const whatsappNumber = "5516988329622";
      let message = "";

      if (attending) {
        message = `Olá! Estou confirmando minha presença no almoço em comemoração ao casamento civil de Natan & Marina.\n\nNome: ${name}\nTelefone: ${phone}\nAcompanhantes: ${guests}\nResposta: Confirmo presença`;
      } else {
        message = `Olá! Infelizmente não poderei comparecer ao almoço em comemoração ao casamento civil de Natan & Marina.\n\nNome: ${name}\nTelefone: ${phone}`;
      }

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');
      setRsvpStatus('success');
    } catch (err) {
      console.error(err);
      setRsvpStatus('idle');
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsgStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.error || 'Não foi possível enviar a mensagem.');
      }

      setMsgStatus('success');
      fetchMessages();
      (e.target as HTMLFormElement).reset();

      setTimeout(() => setMsgStatus('idle'), 3000);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Não foi possível enviar a mensagem.');
      setMsgStatus('idle');
    }
  };

  const handleDeleteMessage = async () => {
    if (messageToDelete === null) return;

    const previousMessages = [...messages];
    setMessages(messages.filter((m) => m.id !== messageToDelete));

    try {
      const response = await fetch('/api/delete-message', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: messageToDelete,
          password: adminPassword
        }),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.error || 'Não foi possível excluir a mensagem.');
      }

      setMessageToDelete(null);
      fetchMessages();
    } catch (err: any) {
      console.error('Error deleting message:', err);
      setMessages(previousMessages);
      alert(err.message || 'Não foi possível excluir a mensagem. Tente novamente.');
      setMessageToDelete(null);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'O Casal', id: 'casal' },
    { name: 'Contagem', id: 'contagem' },
    { name: 'Local', id: 'local' },
    { name: 'Presentes', id: 'presentes' },
    { name: 'Galeria', id: 'galeria' },
    { name: 'RSVP', id: 'rsvp' },
    { name: 'Mensagens', id: 'mensagens' },
  ];

  const galleryImages = [
    casal1,
    casal2,
    casal3,
    casal4,
    casal5,
    casal6,
    casal7,
    casal8,
    casal9,
    casal10,
    casal11,
    casal12
  ];

  return (
    <div className="min-h-screen selection:bg-dusty-blue/30">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-soft-cream/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="hover:opacity-70 transition-opacity">
            <Monogram />
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm uppercase tracking-widest text-stone-600 hover:text-dusty-blue transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            className="lg:hidden p-2 text-stone-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-soft-cream border-b border-stone-200 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg heading-serif text-stone-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/wedding-hero/1920/1080?blur=2"
            alt="Wedding Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-soft-cream/50 via-transparent to-soft-cream"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="heading-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-stone-800 mb-6 md:mb-8 leading-[1.1] break-words">
              Natan <span className="italic text-dusty-blue">&</span> Marina
            </h1>
            <p className="heading-serif text-xl md:text-3xl text-stone-600 mb-8 md:mb-12 tracking-[0.15em] md:tracking-[0.2em]">
              27 DE JUNHO DE 2026
            </p>
            <div className="w-16 md:w-24 h-px bg-dusty-blue mx-auto mb-8 md:mb-12"></div>
            <p className="text-base md:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto italic px-4">
              “Sejam bem-vindos ao nosso site! Estamos muito felizes por partilhar este momento tão especial.
              Aqui encontrarão todos os detalhes sobre o nosso grande dia. Obrigado por fazerem parte da nossa
              história e por celebrarem o amor conosco!”
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-dusty-blue"></div>
      </section>

      {/* --- O Casal --- */}
      <section id="casal" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="O Casal"
            subtitle="Nossa história, nosso amor, nosso começo."
          />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={casal}
                alt="Natan e Marina"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center h-full"
            >
              <div className="max-w-lg mx-auto md:mx-0">
                <h3 className="heading-serif text-3xl text-stone-800 mb-8 text-center md:text-left">Uma Jornada de Amor</h3>
                <div className="space-y-6 text-stone-600 leading-relaxed text-lg text-justify">
                  <p>
                    Tudo começou de forma inesperada, mas logo percebemos que nossos caminhos eram destinados a se cruzar.
                    Entre risos, conversas profundas e momentos inesquecíveis, construímos uma base sólida de amizade e cumplicidade.
                  </p>
                  <p>
                    Cada dia ao lado um do outro é uma nova descoberta. Aprendemos que o amor está nos pequenos detalhes,
                    no apoio mútuo e no desejo constante de ver o outro feliz. Agora, estamos prontos para dar o passo mais
                    importante de nossas vidas e começar este novo capítulo como marido e mulher.
                  </p>
                </div>
                <div className="pt-8 flex justify-center md:justify-start">
                  <Heart className="w-8 h-8 text-blush fill-blush" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Countdown --- */}
      <section id="contagem" className="section-padding bg-dusty-blue/10">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeading title="Contagem Regressiva" subtitle="O tempo voa quando estamos ansiosos para celebrar!" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            {[
              { label: 'Dias', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-dusty-blue/20"
              >
                <div className="heading-serif text-4xl md:text-6xl text-dusty-blue mb-1 md:mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-sm uppercase tracking-widest text-stone-500 font-semibold">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Local --- */}
      <section id="local" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Local da Celebração" subtitle="Onde celebraremos juntos este momento especial." />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 -mt-8"
          >
            <p className="text-stone-500 italic text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              “Este encontro será um almoço especial em comemoração ao casamento civil de Natan & Marina.
              Será um momento íntimo e muito especial para celebrarmos juntos essa nova etapa de nossas vidas.”
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-soft-cream p-8 rounded-2xl border border-stone-100">
                <div className="flex items-start space-x-4 mb-6">
                  <MapPin className="w-6 h-6 text-dusty-blue mt-1 shrink-0" />
                  <div>
                    <h4 className="heading-serif text-2xl text-stone-800 mb-2">Endereço</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Av. Cavalheiro Paschoal Innecchi, 1701<br />
                      Independência, Ribeirão Preto - SP<br />
                      CEP: 14076-360
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 mb-8">
                  <Clock className="w-6 h-6 text-dusty-blue mt-1 shrink-0" />
                  <div>
                    <h4 className="heading-serif text-2xl text-stone-800 mb-2">Horário</h4>
                    <p className="text-stone-600">Sábado, 27 de Junho de 2026 às 12:00</p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/place/Condom%C3%ADnio+Rosa+dos+Ventos/@-21.1536273,-47.783569,18z/data=!4m6!3m5!1s0x94b9bf981344645b:0xab78745e12025c6d!8m2!3d-21.1539379!4d-47.7826007!16s%2Fg%2F11c1xflwgp?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-dusty-blue text-white px-8 py-4 rounded-full hover:bg-deep-dusty transition-colors shadow-lg shadow-dusty-blue/20"
                >
                  <span>Ver no Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-rosy-nude/10 p-8 rounded-2xl border border-rosy-nude/30">
                <h4 className="heading-serif text-2xl text-stone-800 mb-4 flex items-center gap-2">
                  Dress Code
                </h4>
                <p className="text-stone-700 italic leading-relaxed">
                  “Para este dia especial, pedimos gentilmente que os convidados evitem utilizar trajes brancos.”
                </p>
              </div>
            </div>

            <div className="h-[500px] rounded-2xl overflow-hidden shadow-inner border border-stone-200 bg-soft-cream flex items-center justify-center">
              <iframe
                src="https://maps.google.com/maps?q=Av.%20Cavalheiro%20Paschoal%20Innecchi,%201701%20-%20Independ%C3%AAncia,%20Ribeir%C3%A3o%20Preto%20-%20SP,%2014076-360&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Local do Casamento"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- Lista de Presentes --- */}
      <section id="presentes" className="section-padding bg-light-beige/50">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading title="Lista de Presentes" subtitle="Sua presença é o nosso maior presente, mas se desejar nos presentear, aqui estão algumas opções." />

          <div className="grid gap-6">
            {[
              { name: 'Camicado', url: 'https://www.camicado.com.br/lista/convidado/marinaenatan' },
              { name: 'Havan', url: 'https://lista.havan.com.br/Convidado/ItensListaPresente/908285' },
              { name: 'Quero de Casamento', url: 'https://www.querodecasamento.com.br/lista-de-casamento/marina-natan' },
            ].map((store) => (
              <motion.a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-floral-blue/20 rounded-full flex items-center justify-center group-hover:bg-dusty-blue group-hover:text-white transition-colors">
                    <Gift className="w-6 h-6" />
                  </div>
                  <span className="heading-serif text-2xl text-stone-800">{store.name}</span>
                </div>
                <ChevronRight className="text-stone-300 group-hover:text-dusty-blue transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- Galeria --- */}
      <section id="galeria" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Galeria de Fotos" subtitle="Alguns momentos especiais da nossa jornada." />

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Wedding moment ${idx + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RSVP --- */}
      <section id="rsvp" className="section-padding bg-rosy-nude/10">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Confirmação de Presença" subtitle="Por favor, confirme sua presença até dia 15/06/2026." />

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-rosy-nude/20">
            {rsvpStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                {lastRsvpAttending ? (
                  <>
                    <CheckCircle2 className="w-20 h-20 text-sage-green mx-auto mb-6" />
                    <h3 className="heading-serif text-3xl text-stone-800 mb-4">Obrigado por confirmar!</h3>
                    <p className="text-stone-600 leading-relaxed italic">
                      “Não se esqueçam de confirmar a presença até o dia 15/06/2026.
                      A sua participação é o que dará sentido a toda essa celebração. Nos vemos em breve!”
                    </p>
                    <button
                      onClick={() => setRsvpStatus('idle')}
                      className="mt-8 text-dusty-blue underline font-medium"
                    >
                      Enviar outra confirmação
                    </button>
                  </>
                ) : (
                  <>
                    <Heart className="w-20 h-20 text-blush mx-auto mb-6 fill-blush/20" />
                    <h3 className="heading-serif text-3xl text-stone-800 mb-4">Recebemos sua resposta</h3>
                    <p className="text-stone-600 leading-relaxed italic">
                      “Sentiremos sua falta neste dia tão especial, mas agradecemos muito por nos avisar.
                      Com carinho, Natan & Marina.”
                    </p>
                    <button
                      onClick={() => {
                        setRsvpStatus('idle');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-8 text-dusty-blue underline font-medium"
                    >
                      Voltar ao site
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              <form onSubmit={handleRSVP} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm uppercase tracking-widest text-stone-500 font-semibold">Nome Completo</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue focus:ring-1 focus:ring-dusty-blue outline-none transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm uppercase tracking-widest text-stone-500 font-semibold">Telefone / WhatsApp</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue focus:ring-1 focus:ring-dusty-blue outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm uppercase tracking-widest text-stone-500 font-semibold">E-mail</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue focus:ring-1 focus:ring-dusty-blue outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm uppercase tracking-widest text-stone-500 font-semibold">Nº de Acompanhante</label>
                    <select
                      name="guests"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue focus:ring-1 focus:ring-dusty-blue outline-none transition-all appearance-none bg-white"
                    >
                      {[0, 1].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm uppercase tracking-widest text-stone-500 font-semibold block">Você comparecerá?</label>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        required
                        type="radio"
                        name="attending"
                        value="sim"
                        className="w-5 h-5 text-dusty-blue border-stone-300 focus:ring-dusty-blue"
                      />
                      <span className="text-stone-700 group-hover:text-dusty-blue transition-colors">Sim, com certeza!</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        required
                        type="radio"
                        name="attending"
                        value="nao"
                        className="w-5 h-5 text-dusty-blue border-stone-300 focus:ring-dusty-blue"
                      />
                      <span className="text-stone-700 group-hover:text-dusty-blue transition-colors">Infelizmente não poderei</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={rsvpStatus === 'submitting'}
                  className="w-full bg-dusty-blue text-white py-4 rounded-full hover:bg-deep-dusty transition-all shadow-lg font-medium disabled:opacity-50"
                >
                  {rsvpStatus === 'submitting' ? 'Enviando...' : 'Confirmar Presença'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- Mensagens --- */}
      <section id="mensagens" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Mensagens e Depoimentos" subtitle="Deixe uma mensagem carinhosa para o casal." />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-soft-cream p-8 rounded-2xl border border-stone-100 sticky top-24">
                <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-stone-700">
                      <ShieldCheck className="w-5 h-5 text-dusty-blue" />
                      <span className="text-sm font-semibold uppercase tracking-widest">Área do casal</span>
                    </div>

                    {!isAdmin ? (
                      <button
                        type="button"
                        onClick={() => setAdminPanelOpen(!adminPanelOpen)}
                        className="text-sm text-dusty-blue underline"
                      >
                        {adminPanelOpen ? 'Fechar' : 'Entrar'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="inline-flex items-center gap-2 text-sm text-red-500 underline"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    )}
                  </div>

                  {isAdmin ? (
                    <p className="mt-3 text-sm text-sage-green font-medium">
                      Modo administrador ativo. Agora a lixeira aparece para você.
                    </p>
                  ) : adminPanelOpen ? (
                    <form onSubmit={handleAdminLogin} className="mt-4 space-y-3">
                      <input
                        type="password"
                        value={adminPasswordInput}
                        onChange={(e) => setAdminPasswordInput(e.target.value)}
                        placeholder="Senha do administrador"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue outline-none bg-white"
                      />
                      <button
                        type="submit"
                        disabled={adminStatus === 'loading'}
                        className="w-full bg-dusty-blue text-white py-3 rounded-full hover:bg-deep-dusty transition-all disabled:opacity-50"
                      >
                        {adminStatus === 'loading' ? 'Entrando...' : 'Ativar modo administrador'}
                      </button>
                      {adminError && (
                        <p className="text-sm text-red-500 text-center">{adminError}</p>
                      )}
                    </form>
                  ) : null}
                </div>

                <h4 className="heading-serif text-2xl text-stone-800 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-dusty-blue" />
                  Deixe sua Mensagem
                </h4>

                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Seu Nome</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">Mensagem</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      maxLength={500}
                      placeholder="Escreva aqui uma mensagem especial para Natan & Marina..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-dusty-blue outline-none bg-white resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={msgStatus === 'submitting'}
                    className="w-full bg-dusty-blue text-white py-3 rounded-full hover:bg-deep-dusty transition-all disabled:opacity-50"
                  >
                    {msgStatus === 'submitting' ? 'Enviando...' : 'Publicar Mensagem'}
                  </button>
                  {msgStatus === 'success' && (
                    <p className="text-sage-green text-sm text-center font-medium">Mensagem enviada com sucesso!</p>
                  )}
                </form>
              </div>
            </div>

            {/* Wall */}
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow relative group overflow-hidden"
                    >
                      <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMessageToDelete(msg.id);
                            }}
                            className="p-2 text-stone-400 hover:text-red-500 transition-all bg-white/80 hover:bg-red-50 rounded-full backdrop-blur-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border border-stone-100 shadow-sm"
                            title="Apagar mensagem"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <MessageSquare className="w-8 h-8 text-dusty-blue/10" />
                      </div>
                      <p className="text-stone-600 italic mb-4 relative z-10 pr-10">“{msg.message}”</p>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-px bg-dusty-blue"></div>
                          <span className="heading-serif text-lg text-stone-800">{msg.name}</span>
                        </div>
                        <span className="text-xs text-stone-400">
                          {formatMessageDate(msg.created_at)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {messages.length === 0 && (
                  <div className="col-span-full text-center py-12 text-stone-400 italic">
                    Ainda não há mensagens por aqui. Seja o primeiro a deixar um carinho para o casal!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-deep-dusty text-white section-padding py-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-serif text-3xl md:text-4xl mb-4">Natan <span className="text-floral-blue">&</span> Marina</h2>
            <p className="tracking-[0.3em] text-soft-blue/60 mb-12">27 DE JUNHO DE 2026</p>

            <div className="flex justify-center space-x-6 mb-12">
              {navItems.slice(0, 4).map(item => (
                <a key={item.id} href={`#${item.id}`} className="text-sm uppercase tracking-widest hover:text-floral-blue transition-colors">
                  {item.name}
                </a>
              ))}
            </div>

            <div className="w-full h-px bg-white/10 mb-12"></div>

            <p className="text-soft-blue/40 text-sm">
              Feito com carinho para celebrar o amor. &copy; 2026 Natan & Marina.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* --- Image Modal --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-stone-900/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Delete Confirmation Modal --- */}
      <AnimatePresence>
        {messageToDelete !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMessageToDelete(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="heading-serif text-2xl text-stone-800 mb-2">Excluir Mensagem?</h3>
              <p className="text-stone-500 mb-8">
                Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setMessageToDelete(null)}
                  className="flex-1 px-6 py-3 rounded-full border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteMessage}
                  className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}