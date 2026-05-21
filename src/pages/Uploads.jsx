import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadCloud, Clock, CheckCircle, ChevronDown, ChevronUp, Trash2, AlertTriangle } from 'lucide-react';

export default function Uploads({ historicoUploads, setHistoricoUploads, uploadAtivoId, setUploadAtivoId, setPaginaAtiva }) {
  
  const [tagInput, setTagInput] = useState('');
  const [sanfonaAberta, setSanfonaAberta] = useState(true);
  
  // NOVA MEMÓRIA: Guarda qual arquivo queremos deletar. Se for null, o modal fica invisível.
  const [modalDeleteId, setModalDeleteId] = useState(null);

  const lerPlanilha = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evento) => {
      const bstr = evento.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      const novoUpload = {
        id: Date.now(),
        tag: tagInput || `Upload ${historicoUploads.length + 1}`,
        dataHora: new Date().toLocaleString('pt-BR'),
        dados: jsonData
      };
      
      const novoHistorico = [novoUpload, ...historicoUploads];
      setHistoricoUploads(novoHistorico);
      setUploadAtivoId(novoUpload.id);
      setPaginaAtiva('VisaoGeral');
    };
    reader.readAsBinaryString(file);
  };

  // NOVA FUNÇÃO: Executa a deleção de fato e fecha o pop-up
  const confirmarDelecao = () => {
    const novoHistorico = historicoUploads.filter(upload => upload.id !== modalDeleteId);
    setHistoricoUploads(novoHistorico);
    
    // Se apagou o que estava ativo, ativa o mais recente (se sobrar algum)
    if (uploadAtivoId === modalDeleteId) {
      setUploadAtivoId(novoHistorico.length > 0 ? novoHistorico[0].id : null);
    }
    
    setModalDeleteId(null); // Esconde o modal depois de apagar
  };

  return (
    // Colocamos um position relative aqui para o modal saber onde ele mora
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
      
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '40px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#E8ECEF', padding: '20px', borderRadius: '50%' }}><UploadCloud size={64} color="#3A4F49" /></div>
        </div>
        <h2 style={{ color: '#2D3748', marginBottom: '10px' }}>Importar Novo Relatório</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginBottom: '20px', marginTop: '20px' }}>
          <input 
            type="text" 
            placeholder="Tag (Ex: Fechamento Turno 1)" 
            value={tagInput} 
            onChange={(e) => setTagInput(e.target.value)} 
            style={{ 
              padding: '12px 20px', borderRadius: '12px', border: '1px solid #3A4F49', 
              width: '300px', outline: 'none', color: '#FFFFFF', backgroundColor: '#3A4F49' 
            }} 
          />
          <label style={{ backgroundColor: tagInput.length > 0 ? '#CFA03E' : '#A0AEC0', color: 'white', padding: '12px 30px', borderRadius: '12px', fontWeight: 'bold', cursor: tagInput.length > 0 ? 'pointer' : 'not-allowed' }}>
            Selecionar e Enviar
            <input type="file" accept=".xlsx, .xls, .csv" onChange={lerPlanilha} style={{ display: 'none' }} disabled={tagInput.length === 0} />
          </label>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        <div onClick={() => setSanfonaAberta(!sanfonaAberta)} style={{ padding: '20px 30px', backgroundColor: '#3A4F49', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={24} /><h3 style={{ margin: 0, fontSize: '18px' }}>Timeline de Histórico</h3></div>
          {sanfonaAberta ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>

        {sanfonaAberta && (
          <div style={{ padding: '20px 30px' }}>
            {historicoUploads.length === 0 ? (
              <p style={{ color: '#A0AEC0', textAlign: 'center', padding: '20px 0' }}>Nenhum upload foi realizado.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {historicoUploads.map((historico) => {
                  const isAtivo = historico.id === uploadAtivoId;
                  
                  return (
                    <div key={historico.id} onClick={() => setUploadAtivoId(historico.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderRadius: '12px', cursor: 'pointer', border: isAtivo ? '2px solid #CFA03E' : '1px solid #E8ECEF', backgroundColor: isAtivo ? 'rgba(207, 160, 62, 0.05)' : '#FFFFFF' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#2D3748', fontSize: '16px' }}>{historico.tag}</h4>
                        <span style={{ color: '#A0AEC0', fontSize: '14px' }}>{historico.dataHora} • {historico.dados.length} registros</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {isAtivo ? <span style={{ color: '#CFA03E', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={20}/> Ativo</span> : <span style={{ color: '#A0AEC0', fontSize: '14px', fontWeight: 'bold' }}>Visualizar</span>}
                        
                        {/* BOTÃO DA LIXEIRA (AGORA CHAMA O NOSSO MODAL BONITÃO) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalDeleteId(historico.id); // Avisa o sistema: "Abre o pop-up e foca neste ID!"
                          }}
                          style={{ backgroundColor: 'transparent', border: 'none', color: '#e53e3e', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '5px', borderRadius: '50%' }}
                          title="Deletar este upload"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* O POP-UP / MODAL CUSTOMIZADO (Só aparece se modalDeleteId tiver algum valor) */}
      {modalDeleteId && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro transparente
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
          backdropFilter: 'blur(4px)' // Efeito de desfoque no fundo Premium
        }}>
          <div style={{ 
            backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '24px', 
            width: '400px', textAlign: 'center', boxShadow: '0px 20px 40px rgba(0,0,0,0.2)' 
          }}>
            
            <AlertTriangle size={64} color="#e53e3e" style={{ margin: '0 auto 20px' }} />
            
            <h3 style={{ color: '#2D3748', fontSize: '24px', margin: '0 0 10px 0' }}>Excluir Relatório?</h3>
            <p style={{ color: '#A0AEC0', marginBottom: '30px', fontSize: '16px' }}>
              Esta ação não pode ser desfeita. Tem certeza que deseja remover este histórico do sistema?
            </p>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={() => setModalDeleteId(null)} // O "Não" simplesmente fecha o modal
                style={{ padding: '12px 25px', borderRadius: '12px', border: 'none', backgroundColor: '#E8ECEF', color: '#3A4F49', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s' }}
              >
                Cancelar
              </button>
              
              <button 
                onClick={confirmarDelecao} // O "Sim" roda a função de matar o registro
                style={{ padding: '12px 25px', borderRadius: '12px', border: 'none', backgroundColor: '#e53e3e', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s' }}
              >
                Sim, Excluir
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}