// src/components/Sidebar.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaListUl, FaUser, FaSignOutAlt } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

const Sidebar: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const auth = getAuth();
    const user = auth.currentUser;
    const emailName = user?.email?.split("@")[0] || "Usuario";

    const handleLogout = () => {
        if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            signOut(auth).then(() => navigate("/"));
        }
    };

    const menuItems = [
        { name: "Home", icon: <FaHome />, path: "/home" },
        { name: "Calendario", icon: <FaCalendarAlt />, path: "/calendar" },
        { name: "Órdenes", icon: <FaListUl />, path: "/orders" },
    ];

    return (
        <nav
            style={{
                ...styles.sidebar,
                width: expanded ? 200 : 70,
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {/* Perfil */}
            <div style={styles.profile}>
                <FaUser size={30} color="#fff" />
                {expanded && <span style={styles.emailText}>{emailName}</span>}
            </div>

            {/* Menú */}
            <div style={styles.menu}>
                {menuItems.map(({ name, icon, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <button
                            key={name}
                            onClick={() => navigate(path)}
                            onMouseDown={(e) => e.preventDefault()} // <- evita el cambio visual
                            style={{
                                ...styles.menuButton,
                                ...(isActive ? styles.active : {}),
                            }}
                        >
                            <span style={styles.icon}>{icon}</span>
                            {expanded && <span style={styles.text}>{name}</span>}
                        </button>
                    );
                })}
            </div>

            {/* Cerrar sesión */}
            <button
                onClick={handleLogout}
                onMouseDown={(e) => e.preventDefault()}
                style={styles.logoutButton}
            >
                <span style={styles.icon}>
                    <FaSignOutAlt />
                </span>
                {expanded && <span style={styles.text}>Cerrar sesión</span>}
            </button>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    sidebar: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        backgroundColor: "#f48fb1",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 20,
        transition: "width 0.3s ease",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
        overflow: "hidden",
    },
    profile: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 20px",
        color: "#fff",
        marginBottom: 30,
    },
    emailText: {
        fontSize: 14,
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },
    menu: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },
    active: {
        backgroundColor: "#f06292", // un tono más fuerte del rosado
        borderLeft: "4px solid #fff",
    },
    menuButton: {
        display: "flex",
        alignItems: "center",
        gap: 15,
        padding: "12px 20px",
        backgroundColor: "transparent", // asegúrate de que sea transparente
        border: "none",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        transition: "background 0.2s",
        textAlign: "left",
        outline: "none",               // elimina contorno al click
        userSelect: "none",            // previene selección accidental
        WebkitTapHighlightColor: "transparent", // evita el highlight en móvil
    },
    logoutButton: {
        display: "flex",
        alignItems: "center",
        gap: 15,
        padding: "12px 20px",
        backgroundColor: "transparent", // aquí también
        border: "none",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        transition: "background 0.2s",
        textAlign: "left",
        outline: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
    },
    icon: {
        fontSize: 20,
    },
    text: {
        whiteSpace: "nowrap",
    },
};

export default Sidebar;
