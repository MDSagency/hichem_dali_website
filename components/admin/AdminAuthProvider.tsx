"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, LogIn, LogOut, ExternalLink } from "lucide-react";
import { Field } from "@/components/admin/AdminFields";

type AdminAuthContextValue = {
  authenticated: boolean;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

export default function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const checkAuth = async () => {
    const res = await fetch("/api/admin/auth");
    const data = await res.json();
    setAuthenticated(data.authenticated);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        setPassword("");
      } else {
        const data = await res.json();
        setLoginError(data.error ?? "Mot de passe incorrect");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setPassword("");
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal">
        <Loader2 className="animate-spin text-gold" size={36} />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal px-6">
        <div className="w-full max-w-md border border-gold/25 bg-cream p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center border border-gold/50 bg-charcoal">
              <LogIn size={22} className="text-gold" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-medium text-charcoal">Connexion</h1>
              <p className="text-sm text-stone">Administration du site — Cabinet DALI</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Field
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              hint="Accès réservé à l'administrateur du cabinet."
            />
            {loginError && (
              <p className="text-sm text-red-700" role="alert">
                {loginError}
              </p>
            )}
            <button type="submit" disabled={loggingIn} className="btn-primary w-full">
              {loggingIn ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-stone transition-colors hover:text-gold"
          >
            ← Retour au site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ authenticated, logout }}>
      <div className="min-h-screen bg-cream">
        <header className="sticky top-0 z-50 border-b border-gold/25 bg-charcoal px-4 py-3 text-cream lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="font-serif text-lg">Administration</p>
              <p className="text-xs text-cream/60">Cabinet Maître DALI Hichem</p>
            </div>
            <div className="flex gap-2">
              <Link href="/" target="_blank" className="btn-outline-light px-4 py-2 text-xs">
                <span className="flex items-center gap-1">
                  <ExternalLink size={14} aria-hidden="true" />
                  Voir le site
                </span>
              </Link>
              <button type="button" onClick={logout} className="btn-outline-light px-4 py-2 text-xs">
                <span className="flex items-center gap-1">
                  <LogOut size={14} aria-hidden="true" />
                  Déconnexion
                </span>
              </button>
            </div>
          </div>
        </header>
        {children}
      </div>
    </AdminAuthContext.Provider>
  );
}
