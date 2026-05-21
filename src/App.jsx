import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import VisaoGeral from './pages/VisaoGeral';
import Desempenho from './pages/Desempenho';
import Qualidade from './pages/Qualidade';
import Relatorios from './pages/Relatorios';
import Uploads from './pages/Uploads';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// DADOS FALSOS PARA A SUA APRESENTAÇÃO AMANHÃ! (O GitHub vai levar isso)
const DADOS_SEMENTE = [
  {
    id: 3, tag: 'Mutirão de Jaquetas', dataHora: '20/05/2026 16:30',
    dados: [
      { Produto: 'Jaqueta', Quantidade_Produzida: 80, Meta_Diaria: 40, Pecas_Com_Defeito: 0 },
      { Produto: 'Avental', Quantidade_Produzida: 120, Meta_Diaria: 60, Pecas_Com_Defeito: 0 }
    ]
  },
  {
    id: 2, tag: 'Terça do Caos', dataHora: '19/05/2026 18:00',
    dados: [
      { Produto: 'Camisa Polo', Quantidade_Produzida: 15, Meta_Diaria: 40, Pecas_Com_Defeito: 4 },
      { Produto: 'Calça Brim', Quantidade_Produzida: 30, Meta_Diaria: 60, Pecas_Com_Defeito: 8 }
    ]
  },
  {
    id: 1, tag: 'Segunda Normal', dataHora: '18/05/2026 17:00',
    dados: [
      { Produto: 'Camisa Polo', Quantidade_Produzida: 40, Meta_Diaria: 40, Pecas_Com_Defeito: 0 },
      { Produto: 'Calça Brim', Quantidade_Produzida: 60, Meta_Diaria: 60, Pecas_Com_Defeito: 1 }
    ]
  }
];

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('VisaoGeral');
  
  // MÁQUINA DO TEMPO COM MEMÓRIA (localStorage)
  const [historicoUploads, setHistoricoUploads] = useState(() => {
    const salvo = localStorage.getItem('up_historico');
    if (salvo) return JSON.parse(salvo);
    return DADOS_SEMENTE; // Se estiver vazio, carrega os dados pro seu chefe ver
  }); 
  
  const [uploadAtivoId, setUploadAtivoId] = useState(historicoUploads.length > 0 ? historicoUploads[0].id : null);
  const [alertaExpandido, setAlertaExpandido] = useState(false);

  // Toda vez que o histórico mudar, salva no navegador
  useEffect(() => {
    localStorage.setItem('up_historico', JSON.stringify(historicoUploads));
    // Se deletar tudo, zera o ativo
    if (historicoUploads.length === 0) setUploadAtivoId(null);
  }, [historicoUploads]);

  const uploadAtivo = historicoUploads.find(u => u.id === uploadAtivoId);
  const dadosProducao = uploadAtivo ? uploadAtivo.dados : [];

  const isPassado = historicoUploads.length > 0 && uploadAtivoId !== historicoUploads[0].id;

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'VisaoGeral': return <VisaoGeral dadosProducao={dadosProducao} />;
      case 'Desempenho': return <Desempenho />;
      case 'Qualidade': return <Qualidade />;
      case 'Relatorios': return <Relatorios />;
      case 'Uploads': return <Uploads 
                        historicoUploads={historicoUploads} 
                        setHistoricoUploads={setHistoricoUploads}
                        uploadAtivoId={uploadAtivoId}
                        setUploadAtivoId={setUploadAtivoId}
                        setPaginaAtiva={setPaginaAtiva} 
                      />;
      default: return <VisaoGeral dadosProducao={dadosProducao} />;
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar paginaAtiva={paginaAtiva} setPaginaAtiva={setPaginaAtiva} />

      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', height: '100vh' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#2D3748' }}>Painel de Produção</h1>
            <p style={{ margin: 0, color: '#A0AEC0' }}>Uniformes Paraná - Visão Estratégica</p>
          </div>
        </header>

        {isPassado && (
          <div style={{ backgroundColor: '#CFA03E', borderRadius: '16px', marginBottom: '30px', boxShadow: '0px 10px 30px rgba(207, 160, 62, 0.3)', color: 'white', overflow: 'hidden' }}>
            <div onClick={() => setAlertaExpandido(!alertaExpandido)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', cursor: 'pointer', fontWeight: 'bold' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><AlertCircle size={24} /><span>CUIDADO: Visualizando dados históricos!</span></div>
              {alertaExpandido ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {alertaExpandido && (
              <div style={{ padding: '0 25px 20px 25px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '10px 0' }}>Estes dados são referentes ao upload <b>"{uploadAtivo?.tag}"</b>.</p>
                <button onClick={() => setUploadAtivoId(historicoUploads[0].id)} style={{ backgroundColor: '#3A4F49', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                  Voltar para o Mais Recente
                </button>
              </div>
            )}
          </div>
        )}

        {renderizarPagina()}

      </div>
    </div>
  );
}

export default App;