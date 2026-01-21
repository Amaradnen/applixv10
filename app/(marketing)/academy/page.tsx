"use client";

import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { Book, Clock, Star, Users, Award, Play } from 'lucide-react';

const DEMO_COURSES = [
    {
        id: '1',
        slug: 'nextjs-mastery',
        name: 'Next.js 15 Mastery',
        description: 'Master Next.js App Router, Server Components, and modern web development',
        price: 99,
        duration: '12 hours',
        level: 'Intermediate',
        students: 1543,
        rating: 4.9,
        instructor: 'Sarah Martinez',
        modules: 8,
        image: '/media/courses/nextjs.jpg',
    },
    {
        id: '2',
        slug: 'ai-automation',
        name: 'AI Automation for Business',
        description: 'Build intelligent workflows with n8n and AI tools',
        price: 149,
        duration: '16 hours',
        level: 'Advanced',
        students: 892,
        rating: 5.0,
        instructor: 'Alex Chen',
        modules: 10,
        image: '/media/courses/ai.jpg',
    },
    {
        id: '3',
        slug: 'design-systems',
        name: 'Design Systems Fundamentals',
        description: 'Create scalable design systems from scratch',
        price: 79,
        duration: '8 hours',
        level: 'Beginner',
        students: 2100,
        rating: 4.8,
        instructor: 'Emma Wilson',
        modules: 6,
        image: '/media/courses/design.jpg',
    },
];

export default function AcademyPage() {
    const { t } = useI18N();

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
                        <Book className="w-4 h-4 text-gold" />
                        <span className="text-gold font-bold text-sm">APPLIX Academy</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Apprenez avec les <span className="text-gold">Meilleurs</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Des cours premium pour développeurs, designers, et entrepreneurs
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-16">
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">50+</div>
                        <div className="text-sm text-white/60">Cours</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">10k+</div>
                        <div className="text-sm text-white/60">Étudiants</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">4.9</div>
                        <div className="text-sm text-white/60">Note moyenne</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">100%</div>
                        <div className="text-sm text-white/60">En ligne</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-12">
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Toutes les catégories</option>
                        <option value="development">Développement</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="business">Business</option>
                    </select>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Tous les niveaux</option>
                        <option value="beginner">Débutant</option>
                        <option value="intermediate">Intermédiaire</option>
                        <option value="advanced">Avancé</option>
                    </select>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="popular">Plus populaires</option>
                        <option value="recent">Plus récents</option>
                        <option value="rating">Mieux notés</option>
                    </select>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {DEMO_COURSES.map((course) => (
                        <div key={course.id} className="glass-card rounded-xl overflow-hidden hover:border-gold/50 transition-all group">
                            {/* Image */}
                            <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center relative">
                                <Play className="w-16 h-16 text-white/80 group-hover:scale-110 transition" />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-xs font-bold">
                                    {course.level}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition">
                                    {course.name}
                                </h3>
                                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Instructor */}
                                <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                                    <Users className="w-4 h-4" />
                                    <span>{course.instructor}</span>
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-gold text-gold" />
                                        <span className="font-bold">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-white/60">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="text-white/60">
                                        {course.students} étudiants
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="text-2xl font-bold text-gold">
                                        €{course.price}
                                    </div>
                                    <Link
                                        href={`/academy/courses/${course.slug}`}
                                        className="px-4 py-2 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Benefits */}
                <div className="glass-card rounded-2xl p-12 mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Pourquoi choisir APPLIX Academy ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <Award className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Certificat officiel</h3>
                            <p className="text-white/60 text-sm">Obtenez un certificat reconnu à la fin de chaque cours</p>
                        </div>
                        <div className="text-center">
                            <Users className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Communauté active</h3>
                            <p className="text-white/60 text-sm">Accédez à notre Discord avec 10k+ membres</p>
                        </div>
                        <div className="text-center">
                            <Book className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Ressources téléchargeables</h3>
                            <p className="text-white/60 text-sm">Templates, codes source, et guides PDF inclus</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Rejoignez des milliers d'étudiants qui ont transformé leur carrière
                    </p>
                    <Link
                        href="/pricing"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Voir les abonnements
                    </Link>
                </div>
            </div>
        </div>
    );
}
