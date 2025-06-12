import NavBarAdmin from '@/components/NavBarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBarAdmin />
            <main>{children}</main>
        </>
    );
}
