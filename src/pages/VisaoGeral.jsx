import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as BarTooltip } from 'recharts';

export default function VisaoGeral({ dadosProducao }) {
  
  // LÓGICA DE DADOS REAIS
  // Se ainda não fizemos upload, usamos um Mock básico para não ficar em branco
  const temDados = dadosProducao && dadosProducao.length > 0;
  
  // 1. Cálculos de KPIs (Somas matemáticas das colunas)
  const totalProduzido = temDados 
    ? dadosProducao.reduce((acc, item) => acc + (Number(item.Quantidade_Produzida) || 0), 0)
    : 12450; // Mock

  const totalDefeitos = temDados
    ? dadosProducao.reduce((acc, item) => acc + (Number(item.Pecas_Com_Defeito) || 0), 0)
    : 15; // Mock

  const totalMeta = temDados
    ? dadosProducao.reduce((acc, item) => acc + (Number(item.Meta_Diaria) || 0), 0)
    : 13200; // Mock

  const eficiencia = totalMeta > 0 
    ? ((totalProduzido / totalMeta) * 100).toFixed(1) 
    : 94.2;

  // 2. Agrupando itens para o Gráfico (Ex: Soma todas as "Camisa Polo")
  const produtosAgrupados = {};
  if (temDados) {
    dadosProducao.forEach(item => {
      const nome = item.Produto || 'Outros';
      produtosAgrupados[nome] = (produtosAgrupados[nome] || 0) + (Number(item.Quantidade_Produzida) || 0);
    });
  }

  // Transformando o objeto agrupado no formato que o Recharts exige
  const dadosGrafico = temDados
    ? Object.keys(produtosAgrupados).map(key => ({ nome: key, quantidade: produtosAgrupados[key] }))
    : [
        { nome: 'Camisas', quantidade: 4000 },
        { nome: 'Calças', quantidade: 2400 },
        { nome: 'Aventais', quantidade: 3200 },
      ]; // Mock se estiver vazio

  // Estilos
  const coresDonut = ['#3A4F49', '#CFA03E', '#A0AEC0', '#2D3748'];
  const cardStyle = {
    backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '25px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)', display: 'flex',
    flexDirection: 'column', justifyContent: 'space-between'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* AVISO SE NÃO TIVER DADOS */}
      {!temDados && (
        <div style={{ backgroundColor: '#e53e3e', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold' }}>
          ⚠️ Exibindo dados de exemplo. Vá em "Upload de Dados" para carregar a planilha real.
        </div>
      )}

      {/* FAIXA 1: KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        <div style={{ ...cardStyle, flexDirection: 'row', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#A0AEC0', margin: '0 0 10px 0', fontWeight: 'bold' }}>Total Produzido</p>
            <h2 style={{ color: '#3A4F49', margin: 0, fontSize: '32px' }}>{totalProduzido} un.</h2>
          </div>
        </div>
        
        <div style={{ ...cardStyle, flexDirection: 'row', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#A0AEC0', margin: '0 0 10px 0', fontWeight: 'bold' }}>Peças com Defeito</p>
            <h2 style={{ color: '#3A4F49', margin: 0, fontSize: '32px' }}>{totalDefeitos}</h2>
          </div>
          <div style={{ backgroundColor: totalDefeitos > 5 ? '#e53e3e' : '#CFA03E', color: 'white', padding: '10px', borderRadius: '12px', fontWeight: 'bold' }}>Atenção</div>
        </div>

        <div style={{ ...cardStyle, backgroundColor: '#3A4F49', color: 'white', justifyContent: 'center' }}>
          <p style={{ color: '#A0AEC0', margin: '0 0 10px 0', fontWeight: 'bold' }}>Taxa de Eficiência</p>
          <h2 style={{ margin: 0, fontSize: '32px' }}>{eficiencia}%</h2>
        </div>
      </div>

      {/* FAIXA 2: GRÁFICOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        
        <div style={cardStyle}>
          <h3 style={{ color: '#2D3748', margin: '0 0 20px 0' }}>Divisão de Produtos</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dadosGrafico} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="quantidade">
                  {dadosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={coresDonut[index % coresDonut.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: '#2D3748', margin: '0 0 20px 0' }}>Produção por Tipo</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <XAxis dataKey="nome" axisLine={false} tickLine={false} />
                <BarTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="quantidade" fill="#CFA03E" radius={[8, 8, 8, 8]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}