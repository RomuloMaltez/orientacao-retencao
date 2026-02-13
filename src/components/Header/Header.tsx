"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Instagram, Search, X } from "lucide-react";
import IlustracaoCidade from "@/components/ui/ilustracao-cidade";
import LogoPrefeitura from "@/components/ui/logo-prefeitura";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";

const SEARCH_ROOT_SELECTOR = "[data-search-root]";
const HIGHLIGHT_ATTRIBUTE = "data-search-highlight";
const HIGHLIGHT_CLASS_NAME = "site-search-highlight";

const getSearchRoots = () => {
    if (typeof document === "undefined") return [];
    return Array.from(document.querySelectorAll<HTMLElement>(SEARCH_ROOT_SELECTOR));
};

const openDetailsAncestors = (element: HTMLElement) => {
    let parent: HTMLElement | null = element.parentElement;
    while (parent) {
        if (parent instanceof HTMLDetailsElement) parent.open = true;
        parent = parent.parentElement;
    }
};

const collectTextNodes = (root: HTMLElement): Text[] => {
    const nodes: Text[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (
                parent.closest(`[${HIGHLIGHT_ATTRIBUTE}]`) ||
                parent.closest("[data-search-ignore='true']") ||
                parent.closest("script, style") ||
                parent.closest("[aria-hidden='true']")
            ) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    let currentNode = walker.nextNode();
    while (currentNode) {
        nodes.push(currentNode as Text);
        currentNode = walker.nextNode();
    }
    return nodes;
};

const highlightMatches = (term: string) => {
    if (typeof document === "undefined" || !term) return [];
    const normalizedTerm = term.toLowerCase();
    const hits: HTMLElement[] = [];
    const roots = getSearchRoots();

    roots.forEach((root) => {
        const textNodes = collectTextNodes(root);
        textNodes.forEach((node) => {
            const remainingText = node.data;
            let matchIndex = remainingText.toLowerCase().indexOf(normalizedTerm);
            let currentNode = node;

            while (matchIndex !== -1) {
                const matchNode = currentNode.splitText(matchIndex);
                const afterMatchNode = matchNode.splitText(normalizedTerm.length);
                const highlight = document.createElement("mark");
                highlight.className = HIGHLIGHT_CLASS_NAME;
                highlight.setAttribute(HIGHLIGHT_ATTRIBUTE, "true");
                highlight.setAttribute("tabindex", "-1");
                matchNode.parentNode?.insertBefore(highlight, matchNode);
                highlight.appendChild(matchNode);
                openDetailsAncestors(highlight);
                hits.push(highlight);
                currentNode = afterMatchNode;
                matchIndex = currentNode.data.toLowerCase().indexOf(normalizedTerm);
            }
        });
    });
    return hits;
};

const clearHighlights = () => {
    if (typeof document === "undefined") return;
    const highlights = document.querySelectorAll<HTMLElement>(`mark[${HIGHLIGHT_ATTRIBUTE}]`);
    highlights.forEach((highlight) => {
        const parent = highlight.parentNode;
        if (!parent) return;
        const textContent = highlight.textContent ?? "";
        parent.replaceChild(document.createTextNode(textContent), highlight);
        parent.normalize();
    });
};

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const searchFormRef = useRef<HTMLFormElement>(null);
    const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showFeedback = useCallback((message: string) => {
        setFeedback(message);
        if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = setTimeout(() => {
            setFeedback(null);
            feedbackTimeoutRef.current = null;
        }, 4000);
    }, []);

    const handleSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery.length < 3) {
            clearHighlights();
            showFeedback("Por favor, informe ao menos 3 caracteres para buscar.");
            return;
        }

        clearHighlights();
        const hits = highlightMatches(trimmedQuery);
        if (!hits.length) {
            showFeedback("Nenhum resultado encontrado.");
            return;
        }

        hits[0].scrollIntoView({ behavior: "smooth", block: "center" });
        showFeedback(`${hits.length} resultado(s) encontrado(s).`);
    }, [query, showFeedback]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchFormRef.current && !searchFormRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchOpen]);

    return (
        <>
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:items-center lg:gap-8">
                    {/* Logo */}
                    <div className="order-1 flex w-full items-center justify-center lg:justify-start">
                        <Link href="/" aria-label="Página Inicial" className="shrink-0">
                            <LogoPrefeitura size="hero" />
                        </Link>
                    </div>

                    {/* Ilustração central */}
                    <div className="order-3 flex w-full items-center lg:order-2">
                        <IlustracaoCidade />
                    </div>

                    {/* Botões laterais e Busca */}
                    <div className="order-2 flex flex-col items-center gap-3 lg:order-3 lg:items-end relative">
                        <div className="flex items-center justify-center gap-3 lg:justify-end">
                            <a
                                href="https://www.instagram.com/semec.pvh/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md border border-rose-100 bg-rose-50 text-[#E1306C] shadow-sm transition hover:scale-105"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://api.whatsapp.com/send?phone=556999425251"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm transition hover:scale-105"
                            >
                                <WhatsappIcon size={24} />
                            </a>
                            <button
                                id="search-toggle"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
                            >
                                <Search size={24} />
                            </button>
                        </div>

                        {/* Busca Retrátil (Absolute positioning as requested) */}
                        {isSearchOpen && (
                            <form
                                ref={searchFormRef}
                                className="absolute top-[55px] lg:top-[12px] right-0 lg:left-1/2 lg:-translate-x-1/2 z-50 w-[280px] sm:w-[320px] bg-white border border-slate-200 rounded-md shadow-xl flex flex-col p-1 animate-fadeIn"
                                onSubmit={handleSearch}
                            >
                                <div className="flex items-center">
                                    <input
                                        id="site-search"
                                        autoFocus
                                        type="search"
                                        placeholder="O que você procura?"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-full border-0 bg-transparent px-3 py-2 text-sm text-slate-900 focus:outline-none"
                                    />
                                    <button type="submit" className="bg-pv-yellow-500 px-4 py-2 font-bold text-sm rounded-md hover:bg-yellow-400 transition shrink-0">
                                        Buscar
                                    </button>
                                </div>
                                {feedback && <p className="text-[10px] px-2 py-1 text-primary italic">{feedback}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
