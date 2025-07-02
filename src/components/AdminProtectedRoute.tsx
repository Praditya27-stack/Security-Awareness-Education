import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../utils/firebase';

interface Props {
  children: React.ReactNode;
}

/**
 * Komponen proteksi route untuk admin.
 * Hanya user yang memiliki custom claim `admin: true` yang bisa mengakses halaman anak.
 */
const AdminProtectedRoute: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const tokenResult = await firebaseUser.getIdTokenResult(true); // force refresh untuk ambil custom claim terbaru
        setUser(firebaseUser);
        setIsAdmin(tokenResult.claims.admin === true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Saat masih loading (mengecek auth + claim)
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">Memuat...</div>;
  }

  // Jika belum login atau bukan admin, redirect ke login
  if (!user || isAdmin === false) {
    return <Navigate to="/adminlogin" replace />;
  }

  // Jika sudah login dan punya akses admin
  return <>{children}</>;
};

export default AdminProtectedRoute;
