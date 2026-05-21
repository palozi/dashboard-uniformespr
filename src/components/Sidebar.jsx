import React from 'react';
import { Home, Users, AlertTriangle, FileText, UploadCloud } from 'lucide-react';

export default function Sidebar({ paginaAtiva, setPaginaAtiva }) {
  const menus = [
    { id: 'VisaoGeral', nome: 'Visão Geral', icone: <Home size={20} /> },
    { id: 'Desempenho', nome: 'Desempenho', icone: <Users size={20} /> },
    { id: 'Qualidade', nome: 'Qualidade', icone: <AlertTriangle size={20} /> },
    { id: 'Relatorios', nome: 'Relatórios', icone: <FileText size={20} /> },
    { id: 'Uploads', nome: 'Upload de Dados', icone: <UploadCloud size={20} /> },
  ];

  return (
    <div style={{ width: '280px', backgroundColor: '#3A4F49', padding: '30px 0', display: 'flex', flexDirection: 'column', borderTopRightRadius: '30px', borderBottomRightRadius: '30px', boxShadow: '10px 0 30px rgba(0,0,0,0.1)' }}>
      
      {/* Perfil */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#CFA03E', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 'bold', border: '4px solid rgba(255,255,255,0.2)' }}>
          L
        </div>
        <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Mestre Leandro</h3>
        <p style={{ color: '#A0AEC0', margin: 0, fontSize: '14px' }}>Tech Lead - UP</p>
      </div>

      {/* Links do Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '20px' }}>
        {menus.map((menu) => {
          const ativo = paginaAtiva === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => setPaginaAtiva(menu.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '15px',
                padding: '15px 30px', width: '100%',
                backgroundColor: ativo ? '#E8ECEF' : 'transparent',
                color: ativo ? '#3A4F49' : 'white',
                border: 'none', cursor: 'pointer',
                borderTopRightRadius: '30px', borderBottomRightRadius: '30px',
                fontWeight: ativo ? 'bold' : 'normal',
                transition: 'all 0.3s ease'
              }}
            >
              {menu.icone}
              <span style={{ fontSize: '16px' }}>{menu.nome}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}