"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Lottie from "lottie-react";
import animationData from "@/assets/ponto_interrogacao_animation.json";

type Section = "selection" | "home" | "ir" | "iss" | "legal" | "help";
type PortalType = "orgaos" | "demais";

export default function PortalPage() {
  const [currentSection, setCurrentSection] = useState<Section>("selection");
  const [portalType, setPortalType] = useState<PortalType>("orgaos");
  const [activeAccordions, setActiveAccordions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showPortal = (type: PortalType) => {
    setPortalType(type);
    setCurrentSection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showSection = (section: Section) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (section === "selection") {
      setPortalType("orgaos");
    }
    setIsMenuOpen(false);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-pv-gray-100 font-sans text-dark flex flex-col">
      <Header />

      {/* Navigation Bar - Refined SEMEC Green */}
      <div className="w-full bg-[#70B643] border-b-4 border-[#FFDD00] sticky top-0 z-40 print:hidden shadow-lg transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex flex-col md:flex-row items-center justify-between min-h-[48px] py-2 md:py-0">
            {/* Mobile Header for Nav */}
            <div className="flex w-full md:hidden items-center justify-between mb-2 sm:mb-0">
              <span className="text-white font-black text-xs uppercase tracking-widest">Menu de Navegação</span>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white focus:outline-none"
              >
                {isMenuOpen ? (
                  <span className="text-2xl">✕</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </button>
            </div>

            <ul className={`
              ${isMenuOpen ? "flex" : "hidden md:flex"} 
              flex-col md:flex-row w-full items-center justify-center gap-2 md:gap-4 lg:gap-8 pb-4 md:pb-0
            `}>
              {[
                { label: "Início", id: "selection" },
                { label: "Portal", id: "home" },
                { label: "IR Retido", id: "ir", hidden: portalType !== "orgaos" },
                { label: "ISS Retido", id: "iss" },
                { label: "Base Legal", id: "legal" },
                { label: "Ajuda", id: "help" },
              ].map((item) => (
                !item.hidden && (
                  <li key={item.id} className="relative group w-full md:w-auto">
                    <button
                      onClick={() => showSection(item.id as Section)}
                      className={`
                        w-full md:w-auto relative px-4 py-3 md:py-4 text-sm sm:text-[14px] font-black uppercase tracking-wider transition-all duration-300
                        ${currentSection === item.id
                          ? "text-[#FFDD00] bg-black/20 md:bg-white/10 rounded-xl md:rounded-lg shadow-inner"
                          : "text-white hover:text-[#FFDD00] hover:bg-white/5 rounded-xl md:rounded-lg"}
                      `}
                    >
                      {item.label}

                      {/* Sub-indicator line (Yellow on Green) */}
                      <span className={`
                        hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-[#FFDD00] transition-all duration-300 rounded-t-full
                        ${currentSection === item.id ? "w-3/4 opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"}
                      `} />
                    </button>
                  </li>
                )
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <main
        className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-5xl flex-grow bg-white sm:my-8 rounded-none sm:rounded-[20px] shadow-none sm:shadow-xl border-x-0 sm:border border-slate-200 animate-fadeIn overflow-hidden"
        data-search-root
      >
        {/* Cabeçalho de Impressão */}
        <div className="hidden print:block mb-8 border-b-2 border-pv-blue-900 pb-4">
          <div className="flex justify-between items-center">
            <img src="/logo-semec.svg" alt="SEMEC" className="h-16" />
            <div className="text-right">
              <h2 className="text-xl font-bold text-pv-blue-900">Portal de Orientação Tributária</h2>
              <p className="text-sm text-pv-blue-700">Prefeitura Municipal de Porto Velho</p>
            </div>
          </div>
        </div>

        {/* Seção de Seleção Inicial */}
        {currentSection === "selection" && (
          <div className="animate-fadeIn p-2 sm:p-8">
            <h1 className="text-xl sm:text-[2.5rem] font-black text-pv-blue-900 mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 leading-tight">
              <span className="text-3xl sm:text-4xl">🏛️</span> Portal de Orientação Tributária
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-3xl leading-relaxed">
              Bem-vindo ao Portal de Orientação para Retenção de IR e ISSQN do Município de Porto Velho/RO.
              Aqui você encontrará todas as informações necessárias para realizar corretamente os procedimentos de retenção tributária.
            </p>

            <div className="bg-blue-50 border-l-4 border-pv-blue-700 p-4 sm:p-6 rounded-r-xl mb-8 sm:mb-12 flex items-start gap-4 animate-pulse-custom shadow-sm">
              <span className="text-xl sm:text-2xl mt-1">ℹ️</span>
              <div className="text-[13px] sm:text-base text-blue-900 leading-relaxed font-medium">
                <strong>Importante:</strong> Para acessar os sistemas, utilize o mesmo login e senha. Para login no sistema de retenção do IR, use o CPF com formatação completa (XXX.XXX.XXX-XX).
              </div>
            </div>

            <h2 className="text-center text-pv-blue-900 mb-8 sm:mb-12 text-sm sm:text-2xl font-black uppercase tracking-widest sm:tracking-wider px-4">
              Selecione o tipo de Substituto Tributário:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                onClick={() => showPortal("orgaos")}
                className="group relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-[24px] p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pv-blue-700 to-pv-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-6xl text-center mb-6 animate-float">🏢</div>
                <h3 className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">Substitutos Tributários</h3>
                <h2 className="text-2xl sm:text-3xl font-black text-pv-blue-900 mb-4">Órgãos Públicos</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Administração direta e indireta da União, Estados, Distrito Federal e Municípios</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {["Autarquias", "Empresas Públicas", "Sociedades de Economia Mista", "Fundações Públicas", "Agências Reguladoras"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                      <span className="text-pv-green-600 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-gradient-to-r from-pv-blue-700 to-pv-blue-900 text-white py-4 rounded-xl text-center font-bold shadow-md transition-all group-hover:bg-pv-blue-900">
                  Acessar Portal →
                </div>
              </div>

              <div
                onClick={() => showPortal("demais")}
                className="group relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-[24px] p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pv-green-600 to-pv-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-6xl text-center mb-6 animate-float">🏗️</div>
                <h3 className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">Substitutos Tributários</h3>
                <h2 className="text-2xl sm:text-3xl font-black text-pv-blue-900 mb-4">Demais</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Outras entidades obrigadas à retenção conforme LC 878/21</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {["Instituições Financeiras", "Hospitais e Planos de Saúde", "Concessionárias de Serviços Públicos", "Seguradoras e Operadoras de Cartão", "Demais responsáveis por substituição"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                      <span className="text-pv-green-600 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-gradient-to-r from-pv-green-600 to-pv-blue-700 text-white py-4 rounded-xl text-center font-bold shadow-md transition-all group-hover:bg-pv-blue-700">
                  Acessar Portal →
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Home - Dashboard do Portal */}
        {currentSection === "home" && (
          <div className="animate-fadeIn p-2 sm:p-8">
            <h1 className="text-xl sm:text-4xl font-black text-pv-blue-900 mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4 leading-tight">
              <span className="text-3xl sm:text-4xl">🏛️</span> Portal de Orientação
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
              {portalType === "orgaos"
                ? "Portal de Orientação para Retenção de IR e ISSQN do Município de Porto Velho/RO"
                : "Portal de Orientação para Retenção de ISSQN do Município de Porto Velho/RO"}
            </p>
            <div className={`inline-flex items-center gap-2 group ${portalType === "orgaos" ? "bg-pv-blue-700" : "bg-pv-green-600"} text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-black mb-8 sm:mb-10 shadow-md transition-all`}>
              {portalType === "orgaos" ? "🏢 Órgãos Públicos" : "🏗️ Demais Substitutos"}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
              {portalType === "orgaos" && (
                <div onClick={() => showSection("ir")} className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-pv-yellow-500" />
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-pv-blue-700 rounded-lg flex items-center justify-center text-white text-2xl shadow-inner">💵</div>
                    <h3 className="font-bold text-pv-blue-900 leading-tight">Emissão de DAM - IR Retido</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">Acesse o passo a passo completo para emitir o DAM do Imposto de Renda Retido na Fonte.</p>
                  <span className="text-pv-blue-700 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">Acessar Orientações →</span>
                </div>
              )}

              <div onClick={() => showSection("iss")} className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-pv-green-600" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pv-blue-700 rounded-lg flex items-center justify-center text-white text-2xl shadow-inner">📊</div>
                  <h3 className="font-bold text-pv-blue-900 leading-tight">Emissão de DAM - ISS Retido</h3>
                </div>
                <p className="text-sm text-slate-600 mb-6">Saiba como proceder para emitir o DAM do ISS Retido para notas locais e de outros municípios.</p>
                <span className="text-pv-blue-700 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">Acessar Orientações →</span>
              </div>

              <div onClick={() => showSection("legal")} className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-pv-blue-700" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pv-blue-700 rounded-lg flex items-center justify-center text-white text-2xl shadow-inner">📚</div>
                  <h3 className="font-bold text-pv-blue-900 leading-tight">Legislação Aplicável</h3>
                </div>
                <p className="text-sm text-slate-600 mb-6">Consulte a base legal completa sobre substituição tributária conforme LC 878/21.</p>
                <span className="text-pv-blue-700 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">Consultar Legislação →</span>
              </div>
            </div>

            <div className="text-center bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
              <button
                onClick={() => showSection("selection")}
                className="inline-flex items-center gap-2 text-pv-blue-700 hover:text-pv-blue-900 font-bold transition-all px-8 py-3 rounded-xl hover:bg-white hover:shadow-sm"
              >
                ← Voltar à Seleção Inicial
              </button>
            </div>
          </div>
        )}

        {/* IR Retido - Passos Detalhados */}
        {currentSection === "ir" && (
          <div className="animate-fadeIn p-2 sm:p-8">
            <h2 className="text-xl sm:text-3xl font-black text-pv-blue-900 border-b-4 border-pv-yellow-500 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 leading-tight">
              💰 <span className="hidden sm:inline">Emissão de DAM -</span> IR Retido
            </h2>

            <div className="bg-blue-50 border-l-4 border-pv-blue-700 p-6 sm:p-8 rounded-r-2xl mb-8 sm:mb-12 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 w-full">
                <span className="text-3xl sm:text-4xl">🔗</span>
                <div>
                  <h3 className="font-black text-pv-blue-900 mb-1 text-sm sm:text-base">Acesso Direto</h3>
                  <p className="text-[12px] sm:text-sm text-pv-blue-700 font-medium leading-relaxed">Utilize o sistema GPI-TRB para emitir guias do IRRF.</p>
                </div>
              </div>
              <a href="https://gpi-trb.portovelho.ro.gov.br/" target="_blank" className="bg-pv-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-pv-blue-900 transition-all shadow-lg text-center w-full sm:w-auto text-sm">
                🌐 Acessar Sistema GPI-TRB
              </a>
            </div>

            <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-200">
              <h3 className="text-lg sm:text-xl font-black text-pv-blue-900 mb-6 sm:mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-pv-blue-700 rounded-md flex items-center justify-center text-white text-xs">📝</span>
                Passo a Passo
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { step: 1, title: "Acesse o Menu Principal", desc: "Navegue até: ", code: "Taxas > Movimentação de Tributos > Lançamento de Tributos" },
                  { step: 2, title: "Inicie um Novo Lançamento", desc: 'Clique no botão azul ', code: "+Novo", suffix: " para criar um novo lançamento." },
                  { step: 3, title: "Preencha os Dados do Contribuinte", desc: "No campo 'Contribuinte', informar ", code: "Município de Porto Velho - Código 0004325." },
                  { step: 4, title: "Informe o Processo", desc: "Digite o número do processo administrativo relacionado à retenção." },
                  { step: 5, title: "Adicione Observações", desc: "Inclua os números das Notas Fiscais e o número do empenho." },
                  { step: 6, title: "Selecione o Tributo", desc: "Use o código: ", code: "001.000001.000000582 IRRF – FORNECEDORES" },
                  { step: 7, title: "Informe o Valor", desc: 'No campo "Fator", digite o valor a ser recolhido e clique em "+Adicionar".' },
                  { step: 8, title: "Salve e Gere a Guia", desc: 'Clique em "Salvar", depois em "Gerar guia". O boleto ficará disponível para impressão.' },
                  { step: 9, title: "Gere o PDF", desc: "Exporte o documento em PDF para inserção no sistema e-TCDF (e-PMPV)." }
                ].map((item: { step: number; title: string; desc: string; code?: string; suffix?: string }) => (
                  <div key={item.step} className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-pv-blue-700 transition-all duration-300">
                    <div className="w-10 h-10 shrink-0 bg-pv-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-black text-pv-blue-900 mb-1">{item.title}</h4>
                      <div className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                        {item.code && <code className="bg-slate-100 text-pv-blue-700 px-2 py-0.5 rounded font-mono text-[13px] mx-1 border border-slate-200">{item.code}</code>}
                        {item.suffix}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-amber-50 border-l-4 border-pv-yellow-500 p-8 rounded-r-2xl text-amber-900 shadow-sm animate-pulse-custom">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚠️</span>
                <strong className="text-lg">Observação Importante:</strong>
              </div>
              <p className="text-sm leading-relaxed font-medium">
                Este procedimento de retenção do IR é <strong>exclusivo para servidores da PMPV</strong>, que deverão acessar o sistema GPI-TRB e realizar o passo a passo acima descrito.
              </p>
            </div>
          </div>
        )}

        {/* ISS Retido - Accordion and Detailed Steps */}
        {currentSection === "iss" && (
          <div className="animate-fadeIn p-2 sm:p-8">
            <h2 className="text-xl sm:text-3xl font-black text-pv-blue-900 border-b-4 border-pv-green-600 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 leading-tight">
              📊 <span className="hidden sm:inline">Emissão de DAM -</span> ISS Retido
            </h2>
            <div className="bg-blue-50 border-l-4 border-pv-blue-700 p-6 sm:p-8 rounded-r-2xl mb-8 sm:mb-12 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 w-full">
                <span className="text-3xl sm:text-4xl">🔗</span>
                <div>
                  <h3 className="font-black text-pv-blue-900 mb-1 text-sm sm:text-base">Sistema NSF-e</h3>
                  <p className="text-[12px] sm:text-sm text-pv-blue-700 font-medium leading-relaxed">Acesse o portal da Nota Fiscal Eletrônica para retenções de ISS.</p>
                </div>
              </div>
              <a href="https://nfse.portovelho.ro.gov.br/ServerExec/acessoBase/#/login" target="_blank" className="bg-pv-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-pv-blue-900 transition-all shadow-lg text-center w-full sm:w-auto text-sm">
                🌐 Acessar Sistema NFS-e
              </a>
            </div>

            <div className="space-y-6">
              {/* Accordion 1: Porto Velho */}
              <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <button
                  onClick={() => toggleAccordion("iss-pvh")}
                  className={`w-full text-left px-8 py-6 flex justify-between items-center transition-colors ${activeAccordions.includes("iss-pvh") ? "bg-pv-blue-900 text-white" : "bg-white text-pv-blue-900 hover:bg-slate-50"}`}
                >
                  <h3 className="font-black text-lg flex items-center gap-3">
                    <span className="text-2xl">📍</span> Notas Fiscais de Porto Velho
                  </h3>
                  <span className={`text-xl font-bold transition-transform duration-300 ${activeAccordions.includes("iss-pvh") ? "rotate-180" : ""}`}>▼</span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeAccordions.includes("iss-pvh") ? "max-h-[2000px] opacity-100 p-8 bg-slate-50" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-4">
                    {[
                      { s: 1, t: "Acesse o Menu", d: "Navegue até: ", c: "Substituição Tributária &gt; Declaração" },
                      { s: 2, t: "Selecione a Competência", d: "Se necessário, altere o mês/ano para corresponder à NF." },
                      { s: 3, t: "Localize a Nota Fiscal", d: 'Use o campo "Filtrar" para encontrar a NF desejada.' },
                      { s: 4, t: "Declare a NF", d: 'Selecione a nota e clique em "Declare".' },
                      { s: 5, t: "Encerre a Declaração", d: 'Clique em "Encerrar Declaração". A linha ficará verde.' },
                      { s: 6, t: "Imprima o Boleto", d: 'Clique em "Impressão Boleto(s)" e gere o PDF.' }
                    ].map(step => (
                      <div key={step.s} className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100">
                        <span className="w-8 h-8 bg-pv-green-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">{step.s}</span>
                        <div>
                          <p className="font-black text-pv-blue-900 text-sm mb-1">{step.t}</p>
                          <p className="text-slate-600 text-xs">
                            {step.d} {step.c && <code className="bg-slate-50 px-2 py-0.5 rounded border font-mono">{step.c}</code>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accordion 2: Outros Municípios */}
              <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-md transition-all hover:shadow-lg bg-white">
                <button
                  onClick={() => toggleAccordion("iss-outros")}
                  className={`w-full text-left px-6 sm:px-10 py-6 flex justify-between items-center transition-all ${activeAccordions.includes("iss-outros") ? "bg-pv-blue-900 text-white" : "text-pv-blue-900 hover:bg-slate-50"}`}
                >
                  <h3 className="font-black text-base sm:text-xl flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl">🌐</span> Notas de Outros Municípios
                  </h3>
                  <span className={`text-xl font-bold transition-transform duration-500 ${activeAccordions.includes("iss-outros") ? "rotate-180" : ""}`}>▼</span>
                </button>

                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeAccordions.includes("iss-outros") ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-4 sm:p-10 bg-slate-50">
                    {/* Alerta Importante Redesenhado */}
                    <div className="bg-white border-2 border-rose-100 rounded-[2rem] p-6 sm:p-8 mb-12 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-2 h-full bg-rose-500" />
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-3xl shrink-0 animate-pulse-custom">
                          ❗
                        </div>
                        <div className="text-center sm:text-left">
                          <h4 className="text-rose-600 font-black text-lg uppercase tracking-widest mb-2">Atenção Necessária</h4>
                          <p className="text-slate-600 font-medium leading-relaxed">
                            Prestadores de <span className="text-rose-600 font-bold underline decoration-2 underline-offset-4">outros municípios</span> devem realizar o credenciamento prévio obrigatório antes de qualquer lançamento no sistema de Porto Velho.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
                      {/* Lado 1: Credenciamento */}
                      <section className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 bg-pv-blue-900 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">👤</div>
                          <h4 className="text-xl sm:text-2xl font-black text-pv-blue-900 tracking-tight">Etapa 01: Credenciamento</h4>
                        </div>

                        <div className="space-y-4">
                          {[
                            { s: 1, t: 'Acesse "Credenciamentos"', d: 'Na tela inicial do sistema NFS-e, clique na aba superior de "Credenciamentos".' },
                            { s: 2, t: "Selecione o Tipo Jurídico", d: 'Marque "Pessoa Jurídica" e na opção "Pertence ao município" selecione obrigatoriamente: NÃO.' },
                            { s: 3, t: "Validação de CNPJ", d: 'Informe o CNPJ da empresa e clique em "Avançar" para validar os dados na base nacional.' },
                            { s: 4, t: "Dados Cadastrais", d: "Complete o formulário, defina sua senha de acesso e submeta a solicitação." },
                            { s: 5, t: "Vínculo de Usuários", d: "Após aprovação, vincule o CPF dos responsáveis que farão os lançamentos mensais." }
                          ].map(step => (
                            <div key={step.s} className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-pv-blue-700 transition-all group shadow-sm flex gap-5">
                              <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 font-black flex items-center justify-center shrink-0 group-hover:bg-pv-blue-700 group-hover:text-white transition-colors">{step.s}</span>
                              <div>
                                <h5 className="font-bold text-pv-blue-900 text-sm sm:text-base mb-1">{step.t}</h5>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.d}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Lado 2: Lançamento */}
                      <section className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 bg-pv-green-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">📝</div>
                          <h4 className="text-xl sm:text-2xl font-black text-pv-blue-900 tracking-tight">Etapa 02: Lançar NFS-e</h4>
                        </div>

                        <div className="space-y-4">
                          {[
                            { s: 1, t: "Acesso ao Sistema", d: "Realize o login utilizando o CPF e a senha definidos na etapa anterior." },
                            { s: 2, t: "Módulo DAPS", d: 'Navegue até o menu DAPS &gt; Emissão e selecione o perfil "Prestador".' },
                            { s: 3, t: "Definição do Tomador", d: "Busque e selecione o Município de Porto Velho (Código 0004325) como o tomador do serviço." },
                            { s: 4, t: "Dados da Operação", d: "Informe os dados da NF exatamente como emitidos no município de origem (Valor, Alíquota, ISS Retido)." }
                          ].map(step => (
                            <div key={step.s} className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-pv-green-600 transition-all group shadow-sm flex gap-5">
                              <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 font-black flex items-center justify-center shrink-0 group-hover:bg-pv-green-600 group-hover:text-white transition-colors">{step.s}</span>
                              <div>
                                <h5 className="font-bold text-pv-blue-900 text-sm sm:text-base mb-1">{step.t}</h5>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.d}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Banner de Sucesso Final */}
                        <div className="mt-8 bg-gradient-to-r from-pv-blue-900 to-pv-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl border border-white/10 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                          <div className="flex items-start gap-4 sm:gap-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shrink-0">
                              ✨
                            </div>
                            <div>
                              <h5 className="text-lg sm:text-xl font-black mb-2">Conclusão para Servidores</h5>
                              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed opacity-90">
                                Após o lançamento pelo prestador, a NF ficará visível no portal.
                                Basta localizá-la em <strong className="text-pv-yellow-500">Substituição Tributária &gt; Declaração</strong> para finalizar o processo.
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Base Legal - LC 878/21 */}
        {currentSection === "legal" && (
          <div className="animate-fadeIn p-2 sm:p-8">
            <h2 className="text-xl sm:text-3xl font-black text-pv-blue-900 border-b-4 border-pv-blue-700 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 leading-tight">
              ⚖️ Base Legal <span className="hidden sm:inline">- LC 878/21</span>
            </h2>

            <div className="bg-slate-50 border-l-4 border-pv-blue-900 p-6 sm:p-8 rounded-r-3xl mb-8 sm:mb-10 shadow-sm">
              <h3 className="text-lg sm:text-xl font-black text-pv-blue-900 mb-2 sm:mb-4 leading-tight">
                <a href="https://sapl.portovelho.ro.leg.br/norma/14805?display" target="_blank" className="flex flex-col sm:flex-row sm:items-center gap-2">
                  Lei Complementar nº 878/2021 <span className="text-[10px] sm:text-sm text-pv-blue-700 font-bold">↗️ ver texto completo</span>
                </a>
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs leading-relaxed">Código Tributário de Porto Velho/RO</p>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {/* Main Article Header */}
              <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 p-6 sm:p-12 shadow-xl sm:shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-pv-blue-900/5 rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32 blur-2xl sm:blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-pv-blue-900 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-black mb-6 sm:mb-8 shadow-md">
                    <span className="animate-pulse">⚖️</span> DISPOSITIVO LEGAL
                  </div>

                  <h3 className="text-2xl sm:text-5xl font-black text-pv-blue-900 mb-4 sm:mb-6 tracking-tight leading-tight">
                    Artigo 264 <br />
                    <span className="text-pv-blue-700 text-lg sm:text-2xl font-bold opacity-80 leading-tight">Responsabilidade por Substituição</span>
                  </h3>

                  <div className="max-w-3xl">
                    <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium border-l-4 border-pv-yellow-500 pl-4 sm:pl-6 py-1 sm:py-2">
                      "São responsáveis por substituição os tomadores e intermediários dos serviços dispostos na Lista de Serviços,
                      ainda que imune ou isento..."
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of Responsibility Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { id: "I", title: "Serviços do Exterior", desc: "Tomadores de serviços provenientes do exterior." },
                  { id: "II", title: "Gestão Pública", desc: "Órgãos da administração direta e empresas públicas." },
                  { id: "III", title: "Setor Financeiro", desc: "Estabelecimentos bancários autorizadas pelo BACEN." },
                  { id: "IV", title: "Eventos e Lazer", desc: "Promotores ou intermediários de eventos e shows." },
                  { id: "V", title: "Saúde e Consórcios", desc: "Planos de saúde e administradoras de consórcios." },
                  { id: "VI", title: "Rede Lotérica", desc: "C.E.F e seus respectivos agentes lotéricos." },
                  { id: "VII", title: "Rede Hospitalar", desc: "Hospitais, clínicas e laboratórios de análises." },
                  { id: "VIII", title: "Serviço Social", desc: "Entidades do serviço social autônomo (Sistemas S)." },
                  { id: "IX", title: "Serviços Públicos", desc: "Concessionárias e permissionárias de serviços públicos." },
                  { id: "X", title: "Construção Civil", desc: "Pessoas físicas tomadoras de obras de engenharia." },
                  { id: "XI", title: "Mídia e Propaganda", desc: "Agências de propaganda, rádio e televisão." },
                  { id: "XII", title: "Cartões e Seguros", desc: "Seguradoras e operadoras de cartões de crédito." },
                  { id: "XIII", title: "Não Estabelecidos", desc: "Tomador de serviço de prestador não estabelecido." }
                ].map((item) => (
                  <div key={item.id} className="bg-white border border-slate-100 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm hover:shadow-lg hover:border-pv-blue-700 transition-all duration-300 group relative flex flex-col">
                    <div className="absolute top-4 right-6 text-pv-blue-900/10 font-black text-2xl sm:text-4xl group-hover:text-pv-blue-900/20 transition-colors">
                      {item.id}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-pv-blue-900 font-black mb-3 sm:mb-4 group-hover:bg-pv-blue-900 group-hover:text-white transition-colors text-xs sm:text-base">
                      {item.id}
                    </div>
                    <h4 className="font-black text-pv-blue-900 mb-1 sm:mb-2 truncate pr-8 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-slate-500 text-[11px] sm:text-sm leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Special Considerations Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-pv-green-600/20 rounded-full blur-2xl" />
                  <h4 className="text-pv-yellow-500 font-black uppercase tracking-widest text-[10px] sm:text-sm mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pv-yellow-500 rounded-full" /> Parágrafo Primeiro
                  </h4>
                  <p className="text-blue-50 text-sm sm:text-lg leading-relaxed font-medium">
                    "O responsável fornecerá ao prestador o respectivo comprovante de retenção sempre que solicitado."
                  </p>
                </div>

                <div className="bg-pv-blue-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                  <h4 className="text-pv-green-600 font-black uppercase tracking-widest text-[10px] sm:text-sm mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pv-green-600 rounded-full" /> Parágrafo Segundo
                  </h4>
                  <p className="text-blue-50 text-sm sm:text-lg leading-relaxed font-medium">
                    "Ficam desobrigados os órgãos quando prestadores forem Bancos, Autônomos, Imunes ou MEI."
                  </p>
                  <p className="mt-4 sm:mt-6 text-pv-green-600 text-[9px] sm:text-xs font-black uppercase tracking-tighter opacity-80">
                    * Verifique as exceções completas na LC 878/21
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ajuda / FAQ Section */}
        {currentSection === "help" && (
          <div className="animate-fadeIn p-2 sm:p-8">
            <h2 className="text-xl sm:text-3xl font-black text-pv-blue-900 border-b-4 border-pv-yellow-500 pb-3 sm:pb-4 mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 leading-tight">
              ❓ <span className="hidden sm:inline">Dúvidas</span> Frequentes
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  id: "faq-1",
                  q: "Como obtenho minhas credenciais de acesso?",
                  a: "As credenciais para acesso são enviadas automaticamente para seu e-mail. Caso não tenha recebido, efetue o procedimento de recuperar senha, clicando em 'Esqueceu sua Senha?' no portal de acesso."
                },
                {
                  id: "faq-2",
                  q: "Qual o prazo de vencimento do DAM?",
                  a: "Para o IR ou ISS Retido, o vencimento é de 30 dias depois da declaração da retenção. No entanto, o ISS retido por órgãos públicos segue o regime de caixa, possibilitando ajustes conforme o fluxo de pagamento do órgão."
                },
                {
                  id: "faq-3",
                  q: "Como proceder com notas de outros municípios?",
                  a: "O prestador de outro município deve primeiro realizar o credenciamento no sistema de Porto Velho e cadastrar suas notas fiscais manualmente para que fiquem disponíveis para retenção."
                },
                {
                  id: "faq-4",
                  q: "Quem está obrigado à retenção?",
                  a: "Conforme o Art. 264 da LC 878/21, todos os tomadores listados (órgãos públicos, bancos, hospitais, concessionárias, etc.) devem reter o imposto no momento do pagamento."
                },
                {
                  id: "faq-5",
                  q: "Existem vídeos tutoriais disponíveis?",
                  a: "Os vídeos estão em produção. Enquanto isso, disponibilizamos um manual detalhado com telas e instruções passo a passo.",
                  link: "https://semfaz.portovelho.ro.gov.br/uploads/arquivos/2025/09/67765/1758035465orientacao-retencao.pdf",
                  label: "Baixar Manual em PDF"
                }
              ].map((faq) => (
                <div key={faq.id} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className={`w-full text-left px-8 py-5 flex justify-between items-center transition-colors ${activeAccordions.includes(faq.id) ? "bg-pv-blue-900 text-white" : "bg-white text-pv-blue-900 hover:bg-slate-50"}`}
                  >
                    <h3 className="font-black text-sm sm:text-base leading-tight pr-4">{faq.q}</h3>
                    <span className={`text-xl transition-transform duration-300 font-bold ${activeAccordions.includes(faq.id) ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${activeAccordions.includes(faq.id) ? "max-h-96 opacity-100 p-8 bg-slate-50" : "max-h-0 opacity-0"}`}>
                    <div className="text-slate-600 text-sm leading-relaxed font-medium">
                      {faq.a}
                      {faq.link && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <a href={faq.link} target="_blank" className="inline-flex items-center gap-2 bg-pv-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-xs hover:bg-pv-blue-900 transition-all shadow-md">
                            📄 {faq.label}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-br from-pv-blue-900 to-pv-blue-700 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-2xl font-black mb-4">Ainda tem dúvidas?</h3>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto leading-relaxed">Nossa equipe está pronta para auxiliar você em qualquer processo de retenção tributária.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://api.whatsapp.com/send?phone=556999425251" target="_blank" className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                  💬 WhatsApp Suporte
                </a>
                <button onClick={() => showSection("selection")} className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all border border-white/30">
                  Ir para Início
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Floating help */}
      <button
        onClick={() => showSection("help")}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 print:hidden border-2 border-slate-200 cursor-pointer"
        title="Precisa de ajuda?"
      >
        <div className="w-10 h-10 sm:w-12 h-12 flex items-center justify-center pointer-events-none">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full"
          />
        </div>
      </button>
    </div>
  );
}
