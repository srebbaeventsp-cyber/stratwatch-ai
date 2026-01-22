'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [key, setKey] = useState('');
    const router = useRouter();

    const handleAuth = () => {
        if (key === 'STRAT-ALPHA-2026-X') {
            document.cookie = "strat_token=authorized; path=/; max-age=3600";
            router.push('/');
        } else {
            alert('ACCÈS REFUSÉ : SIGNATURE INVALIDE');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center font-sans">
            <div className="p-8 border border-gray-800 bg-gray-900/20 w-96">
                <h2 className="text-blue-500 font-bold uppercase text-xs tracking-widest mb-4">Authentification Souveraine</h2>
                <input 
                    type="password" 
                    placeholder="CLÉ D'ACCÈS" 
                    className="w-full bg-black border border-gray-700 p-2 text-white font-mono mb-4 focus:border-blue-600 outline-none"
                    onChange={(e) => setKey(e.target.value)}
                />
                <button 
                    onClick={handleAuth}
                    className="w-full bg-blue-700 text-white font-black py-2 hover:bg-blue-600 transition-all uppercase text-xs"
                >
                    Déverrouiller l'Usine
                </button>
            </div>
        </div>
    );
}

