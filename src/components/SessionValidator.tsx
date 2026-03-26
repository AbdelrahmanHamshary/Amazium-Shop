import { useEffect } from 'react';
import { useStore } from '../store';
import { features } from '../weekConfig';
import { getSessionEmail, setSessionEmail } from '../lib/session';

const apiBase = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Profile / orders / notifications / wishlist are loaded from MySQL via the API.
 * We only keep a session email in sessionStorage (not full profile) so refresh can restore login.
 */
export default function SessionValidator() {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);
  const clearStaleSession = useStore((s) => s.clearStaleSession);
  /** Restore session after refresh from session email (user not in localStorage). */
  useEffect(() => {
    if (!features.auth) return;
    if (user) return;

    const email = getSessionEmail();
    if (!email) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/auth/verify-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, userId: null })
        });
        if (cancelled || !res.ok) return;
        const data = (await res.json()) as {
          valid?: boolean;
          user?: {
            id: number;
            name: string;
            email: string;
            address: string;
            phone: string;
            avatar: string;
            createdAt?: string;
            created_at?: string;
          };
        };
        if (!data.valid) {
          setSessionEmail(null);
          return;
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            address: data.user.address || '',
            phone: data.user.phone || '',
            avatar: data.user.avatar || '',
            password: '',
            createdAt: data.user.createdAt || data.user.created_at
          });
        }
      } catch {
        // offline
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, setUser, clearStaleSession]);

  useEffect(() => {
    if (!features.auth || !user?.email) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/auth/verify-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, userId: user.id ?? null })
        });

        if (cancelled) return;

        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as {
          valid?: boolean;
          user?: {
            id: number;
            name: string;
            email: string;
            address: string;
            phone: string;
            avatar: string;
            createdAt?: string;
            created_at?: string;
          };
        };

        if (!data.valid) {
          clearStaleSession();
          return;
        }

        if (data.user) {
          const current = useStore.getState().user;
          if (!current) return;
          setUser({
            ...current,
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            address: data.user.address,
            phone: data.user.phone,
            avatar: data.user.avatar,
            password: '',
            createdAt: data.user.createdAt || data.user.created_at
          });
        }
      } catch {
        // Network failure — do not log out
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.email, user?.id, setUser, clearStaleSession]);

  return null;
}
