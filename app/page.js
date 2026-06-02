'use client';
import { AdminCard } from './Components/adminServiceCard';
// import { ClientCard } from './Components/serviceCard';
import React, { useState } from 'react';
import { Shirt, Calendar, ShieldCheck, Clock, Menu, X, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  // Gestion de l'état dynamique du menu mobile (UX Mobile-First)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-serif selection:bg-blue-500/30">
      
      {/* Navbar Professionnelle */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shirt className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NDJIMO Press
              </span>
            </div>
            
            {/* Menu Bar - Desktop */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#services" className="hover:text-blue-600 transition-colors font-semibold">Services</a>
              <a href="#services" className="hover:text-blue-600 transition-colors font-semibold">Contact</a>
              <Link href="/auth/signup" className="hover:text-blue-600 transition-colors text-green-500 font-extrabold">S'Enregistrer</Link>
              <Link href="/auth/login" className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-all">
                Réserver Un Ramassage
              </Link>
            </div>

            {/* Menu Mobile Button (Trigger) */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 bg-white transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Menu Bar Overlay - Mobile First Container */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop flouté pour fermer au clic extérieur */}
          <div 
            className="fixed inset-0 top-16 z-40 bg-slate-950/20 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Tiroir de Navigation de style Shadcn Content */}
          <div className="fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 p-6 shadow-xl md:hidden animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-4">
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-slate-50"
              >
                Services
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-slate-50"
              >
                Contact
              </a>
              <Link 
                href="/auth/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-balance font-extrabold text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-slate-50"
              >
                S'Enregistrer
              </Link>
              <Link
                href={"/auth/login"} 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-xs transition-colors text-center"
              >
                Réserver un ramassage
              </Link>
            </nav>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold w-fit">
              <Clock className="w-3.5 h-3.5" /> Service Express en 24h disponible
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
              Votre linge mérite une expertise <span className="text-blue-600">Premium</span>.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              NDJIMO press-dressing prend soin de vos vêtements les plus délicats avec des technologies écologiques et un service de ramassage à domicile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all">
                Planifier une réservation
              </button>
              <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-center px-6 py-3 rounded-xl font-medium transition-all">
                Voir nos tarifs
              </button>
            </div>
          </div>
          
          {/* Visuel d'impact */}
          <div className="relative flex justify-center">
            <div className="w-full h-96 bg-linear-to-tr from-blue-600 to-indigo-500 rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-black/10 opacity-40"></div>
              <div className="text-white text-center z-10">
                <Shirt className="w-32 h-32 mx-auto opacity-90 animate-pulse" />
                <p className="mt-4 text-xl font-semibold tracking-wide uppercase">Press-Dressing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Pourquoi nous faire confiance ?</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Soin Haute Qualité</h3>
            <p className="text-slate-600 text-sm">Traitement adapté à chaque type de tissu, même les plus délicats comme la soie ou le lin.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Réservation en Ligne</h3>
            <p className="text-slate-600 text-sm">Planifiez le dépôt ou la collecte de vos vêtements en quelques clics depuis votre espace.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Respect des Délais</h3>
            <p className="text-slate-600 text-sm">Nous nous engageons à vous restituer vos vêtements propres et repassés à l'heure convenue.</p>
          </div>
        </div>
      </section>

      {/* Section: CTA */}
      <section className="py-16 bg-white border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Prêt à redonner de l'éclat à votre garde-robe ?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Rejoignez les clients exigeants qui font confiance à NDJIMO pour un entretien impeccable, sans quitter le confort de leur domicile.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
                <button className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-600/95 shadow-sm">
                  Passer ma première commande <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-800 bg-transparent px-6 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                  Découvrir nos formules
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: CONTACT */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Infos de Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Contactez-nous</h2>
              <p className="text-sm text-slate-500 mt-2">
                Une question, une demande de devis spécifique ou besoin d'un ramassage urgent ? Notre équipe est à votre écoute.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Notre Atelier Central</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ancien Dalip, Rue des Écoles, Douala</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Téléphone / WhatsApp</h4>
                  <p className="text-xs text-slate-500 mt-0.5">+237 655 xxx xxx / +237 677 xxx xxx</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Support Courriel</h4>
                  <p className="text-xs text-slate-500 mt-0.5">contact@ndjimo-press.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Nom complet</label>
                  <input type="text" placeholder="Ex: Jean Ewane" className="w-full text-sm px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 placeholder:text-slate-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Numéro de téléphone</label>
                  <input type="tel" placeholder="Ex: +237 6..." className="w-full text-sm px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 placeholder:text-slate-400 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Adresse e-mail</label>
                <input type="email" placeholder="jean.ewane@exemple.com" className="w-full text-sm px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 placeholder:text-slate-400 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Votre message</label>
                <textarea rows="4" placeholder="Détaillez votre besoin (ex: Nettoyage robe de mariée, volume de linge...)" className="w-full text-sm px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 placeholder:text-slate-400 transition-all resize-none"></textarea>
              </div>
              <button className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-slate-800 transition-colors">
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Bloc Marque */}
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Shirt className="h-5 w-5 text-blue-600" />
              <span>NDJIMO Press</span>
            </div>
            <p className="text-slate-500 pr-4 leading-relaxed">
              L'alliance d'un soin textile haute définition et d'une logistique connectée pour un dressing toujours impeccable.
            </p>
          </div>

          {/* Liens Rapides */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-900 text-sm tracking-tight">Services</h5>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Nettoyage à sec</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Blanchisserie premium</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Repassage main</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Soin des cuirs & tapis</a></li>
            </ul>
          </div>

          {/* Horaires d'ouverture */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-900 text-sm tracking-tight">Horaires d'Atelier</h5>
            <ul className="space-y-2 text-slate-500">
              <li className="flex justify-between"><span>Lundi - Vendredi</span> <span className="font-medium text-slate-800">07h30 - 20h00</span></li>
              <li className="flex justify-between"><span>Samedi</span> <span className="font-medium text-slate-800">08h00 - 18h00</span></li>
              <li className="flex justify-between"><span>Dimanche</span> <span className="text-amber-600 font-medium bg-amber-50 px-1.5 rounded">Fermé</span></li>
            </ul>
          </div>


          {/* Mentions de réassurance */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-900 text-sm tracking-tight">Engagements</h5>
            <div className="space-y-2 text-slate-500">
              <p className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Solvants Éco-certifiés
              </p>
              <p className="flex items-center gap-1.5 text-blue-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Garantie Zéro Perte
              </p>
            </div>
          </div>
        </div>

        {/* Pied de page Droits */}
        <div className="border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <p>&copy; {new Date().getFullYear()} NDJIMO press-dressing. Tous droits réservés.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Mentions légales</a>
              <a href="#" className="hover:underline">CGU & Tarifs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}