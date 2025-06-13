'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (isCheckingAuth || hasRedirected) return;

        if (!authUser) {
            if (!pathname.startsWith('/auth')) {
                setHasRedirected(true);
                router.replace('/auth/login');
            }
            return;
        }

        if (pathname.startsWith('/admin') && authUser.role !== 'admin') {
            setHasRedirected(true);
            router.replace('/home');
            return;
        }

        if (pathname === '/' || pathname.startsWith('/auth')) {
            setHasRedirected(true);
            if (authUser.role === 'admin') {
                router.replace('/admin/categories');
            } else {
                router.replace('/home');
            }
        }
    }, [authUser, isCheckingAuth, pathname, router, hasRedirected]);
    return <>{children}</>;
}
