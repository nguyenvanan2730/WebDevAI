import React, { useState, useEffect, useRef } from 'react';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import './ToolGrid.css';
import './ToolsFilter.css';

function ToolGrid() {
  // Sample data for the tools
  const allTools = [
    { 
      id: 1, 
      name: 'DeepSeek', 
      rating: 5, 
      type: 'Free', 
      role: 'Developer', 
      process: 'Development',
      likes: 235,
      description: 'DeepSeek is an advanced AI coding assistant that helps developers write, debug, and understand code across multiple programming languages.',
      url: 'https://deepseek.com',
      logoUrl: 'https://deepseek.com/logo.png'
    },
    { 
      id: 2, 
      name: 'ChatGPT', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Developer', 
      process: 'Research',
      likes: 512,
      description: 'ChatGPT is an AI-powered chatbot that can generate human-like text, assist with coding, answer questions, and help with content creation.',
      url: 'https://chat.openai.com',
      logoUrl: 'https://chat.openai.com/logo.png'
    },
    { 
      id: 3, 
      name: 'Midjourney', 
      rating: 4, 
      type: 'Paid', 
      role: 'Designer', 
      process: 'Design',
      likes: 423,
      description: 'Midjourney is an AI art generator that creates stunning images based on text prompts, perfect for designers and creative professionals.',
      url: 'https://midjourney.com',
      logoUrl: 'https://midjourney.com/logo.png'
    },
    { 
      id: 4, 
      name: 'GitHub Copilot', 
      rating: 5, 
      type: 'Paid', 
      role: 'Developer', 
      process: 'Development',
      likes: 312,
      description: 'GitHub Copilot is an AI pair programmer that offers autocomplete-style suggestions as you code, supporting multiple languages and IDEs.',
      url: 'https://github.com/features/copilot',
      logoUrl: 'https://github.com/features/copilot/logo.png'
    },
    { 
      id: 5, 
      name: 'Figma AI', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Designer', 
      process: 'Design',
      likes: 246,
      description: 'Figma AI assists designers with automated layout suggestions, component creation, and design system maintenance.',
      url: 'https://figma.com',
      logoUrl: 'https://figma.com/logo.png'
    },
    { 
      id: 6, 
      name: 'Cursor', 
      rating: 5, 
      type: 'Free', 
      role: 'Developer', 
      process: 'Development',
      likes: 289,
      description: 'Cursor is an AI-powered code editor that helps developers understand, edit, and generate code with natural language.',
      url: 'https://cursor.com',
      logoUrl: 'https://cursor.com/logo.png'
    },
    { 
      id: 7, 
      name: 'Notion AI', 
      rating: 4, 
      type: 'Paid', 
      role: 'Product Manager', 
      process: 'Planning',
      likes: 378,
      description: 'Notion AI helps you draft, edit, summarize, and brainstorm content within your Notion workspace to boost productivity.',
      url: 'https://notion.so',
      logoUrl: 'https://notion.so/logo.png'
    },
    { 
      id: 8, 
      name: 'Jasper', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 267,
      description: 'Jasper is an AI content creation platform that helps marketers generate high-quality copy for blogs, ads, emails, and more.',
      url: 'https://jasper.ai',
      logoUrl: 'https://jasper.ai/logo.png'
    },
    { 
      id: 9, 
      name: 'Tabnine', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Developer', 
      process: 'Development',
      likes: 198,
      description: 'Tabnine is an AI code completion assistant that helps developers write code faster with context-aware suggestions.',
      url: 'https://tabnine.com',
      logoUrl: 'https://tabnine.com/logo.png'
    },
    { 
      id: 10, 
      name: 'Grammarly', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Developer', 
      process: 'Testing',
      likes: 456,
      description: 'Grammarly is an AI writing assistant that helps you write clear, mistake-free, and effective content with real-time suggestions.',
      url: 'https://grammarly.com',
      logoUrl: 'https://grammarly.com/logo.png'
    },
    { 
      id: 11, 
      name: 'Canva AI', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Designer', 
      process: 'Design',
      likes: 321,
      description: 'Canva AI provides intelligent design suggestions, text effects, and image editing tools for creating professional graphics.',
      url: 'https://canva.com',
      logoUrl: 'https://canva.com/logo.png'
    },
    { 
      id: 12, 
      name: 'RunwayML', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Designer', 
      process: 'Design',
      likes: 278,
      description: 'RunwayML is an AI-powered creative suite that enables users to edit videos, generate images, and create visual content.',
      url: 'https://runwayml.com',
      logoUrl: 'https://runwayml.com/logo.png'
    },
    { 
      id: 13, 
      name: 'Codeium', 
      rating: 4, 
      type: 'Free', 
      role: 'Developer', 
      process: 'Development',
      likes: 187,
      description: 'Codeium provides AI-powered code completions to help developers write code faster and with fewer errors.',
      url: 'https://codeium.com',
      logoUrl: 'https://codeium.com/logo.png'
    },
    { 
      id: 14, 
      name: 'Perplexity AI', 
      rating: 5, 
      type: 'Free', 
      role: 'Analyst', 
      process: 'Research',
      likes: 256,
      description: 'Perplexity AI is a conversational search engine that provides comprehensive answers with citations to your questions.',
      url: 'https://perplexity.ai',
      logoUrl: 'https://perplexity.ai/logo.png'
    },
    { 
      id: 15, 
      name: 'Monkeylearn', 
      rating: 3, 
      type: 'Paid', 
      role: 'Analyst', 
      process: 'Testing',
      likes: 145,
      description: 'MonkeyLearn is a text analysis platform that uses AI to automate tasks like sentiment analysis, classification, and extraction.',
      url: 'https://monkeylearn.com',
      logoUrl: 'https://monkeylearn.com/logo.png'
    },
    { 
      id: 16, 
      name: 'Gamma', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Product Manager', 
      process: 'Planning',
      likes: 234,
      description: 'Gamma is an AI-powered presentation tool that helps you create beautiful, engaging presentations with minimal effort.',
      url: 'https://gamma.app',
      logoUrl: 'https://gamma.app/logo.png'
    },
    { 
      id: 17, 
      name: 'Synthesia', 
      rating: 5, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 312,
      description: 'Synthesia is an AI video creation platform that allows you to create professional videos with AI avatars and voiceovers.',
      url: 'https://synthesia.io',
      logoUrl: 'https://synthesia.io/logo.png'
    },
    { 
      id: 18, 
      name: 'Lumen5', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'Lumen5 is an AI-powered video creation platform that transforms blog posts and articles into engaging videos.',
      url: 'https://lumen5.com',
      logoUrl: 'https://lumen5.com/logo.png'
    },
    { 
      id: 19, 
      name: 'Frase', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Research',
      likes: 198,
      description: 'Frase is an AI content optimization tool that helps you research, write, and optimize high-quality SEO content.',
      url: 'https://frase.io',
      logoUrl: 'https://frase.io/logo.png'
    },
    { 
      id: 20, 
      name: 'Copy.ai', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 256,
      description: 'Copy.ai is an AI-powered copywriting tool that helps you generate high-quality marketing copy for various purposes.',
      url: 'https://copy.ai',
      logoUrl: 'https://copy.ai/logo.png'
    },
    { 
      id: 21, 
      name: 'Surfer SEO', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Research',
      likes: 145,
      description: 'Surfer SEO is an AI-powered content optimization tool that helps you create SEO-friendly content to rank higher on search engines.',
      url: 'https://surferseo.com',
      logoUrl: 'https://surferseo.com/logo.png'
    },
    { 
      id: 22, 
      name: 'MarketMuse', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Research',
      likes: 234,
      description: 'MarketMuse is an AI-powered content research and optimization platform that helps you create high-quality content.',
      url: 'https://marketmuse.com',
      logoUrl: 'https://marketmuse.com/logo.png'
    },
    { 
      id: 23, 
      name: 'Scalenut', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Research',
      likes: 312,
      description: 'Scalenut is an AI-powered content research and writing platform that helps you create SEO-friendly content.',
      url: 'https://scalenut.com',
      logoUrl: 'https://scalenut.com/logo.png'
    },
    { 
      id: 24, 
      name: 'INK Editor', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'INK Editor is an AI-powered writing assistant that helps you create high-quality, SEO-friendly content.',
      url: 'https://inkforall.com',
      logoUrl: 'https://inkforall.com/logo.png'
    },
    { 
      id: 25, 
      name: 'Writesonic', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 198,
      description: 'Writesonic is an AI-powered writing assistant that helps you create high-quality marketing copy for various purposes.',
      url: 'https://writesonic.com',
      logoUrl: 'https://writesonic.com/logo.png'
    },
    { 
      id: 26, 
      name: 'Rytr', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 256,
      description: 'Rytr is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://rytr.me',
      logoUrl: 'https://rytr.me/logo.png'
    },
    { 
      id: 27, 
      name: 'Peppertype.ai', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 145,
      description: 'Peppertype.ai is an AI-powered writing assistant that helps you create high-quality marketing copy for various purposes.',
      url: 'https://peppertype.ai',
      logoUrl: 'https://peppertype.ai/logo.png'
    },
    { 
      id: 28, 
      name: 'ContentBot', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 234,
      description: 'ContentBot is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://contentbot.ai',
      logoUrl: 'https://contentbot.ai/logo.png'
    },
    { 
      id: 29, 
      name: 'Kafkai', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 312,
      description: 'Kafkai is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://kafkai.com',
      logoUrl: 'https://kafkai.com/logo.png'
    },
    { 
      id: 30, 
      name: 'Article Forge', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'Article Forge is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://articleforge.com',
      logoUrl: 'https://articleforge.com/logo.png'
    },
    { 
      id: 31, 
      name: 'Wordtune', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 198,
      description: 'Wordtune is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://wordtune.com',
      logoUrl: 'https://wordtune.com/logo.png'
    },
    { 
      id: 32, 
      name: 'QuillBot', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 256,
      description: 'QuillBot is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://quillbot.com',
      logoUrl: 'https://quillbot.com/logo.png'
    },
    { 
      id: 33, 
      name: 'Grammarly', 
      rating: 5, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 145,
      description: 'Grammarly is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://grammarly.com',
      logoUrl: 'https://grammarly.com/logo.png'
    },
    { 
      id: 34, 
      name: 'ProWritingAid', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 234,
      description: 'ProWritingAid is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://prowritingaid.com',
      logoUrl: 'https://prowritingaid.com/logo.png'
    },
    { 
      id: 35, 
      name: 'Hemingway Editor', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 312,
      description: 'Hemingway Editor is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://hemingwayapp.com',
      logoUrl: 'https://hemingwayapp.com/logo.png'
    },
    { 
      id: 36, 
      name: 'Slick Write', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'Slick Write is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://slickwrite.com',
      logoUrl: 'https://slickwrite.com/logo.png'
    },
    { 
      id: 37, 
      name: 'Ginger Software', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 198,
      description: 'Ginger Software is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://gingersoftware.com',
      logoUrl: 'https://gingersoftware.com/logo.png'
    },
    { 
      id: 38, 
      name: 'WhiteSmoke', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 256,
      description: 'WhiteSmoke is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://whitesmoke.com',
      logoUrl: 'https://whitesmoke.com/logo.png'
    },
    { 
      id: 39, 
      name: 'PaperRater', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 145,
      description: 'PaperRater is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://paperrater.com',
      logoUrl: 'https://paperrater.com/logo.png'
    },
    { 
      id: 40, 
      name: 'Scribens', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 234,
      description: 'Scribens is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://scribens.com',
      logoUrl: 'https://scribens.com/logo.png'
    },
    { 
      id: 41, 
      name: 'LanguageTool', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 312,
      description: 'LanguageTool is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://languagetool.org',
      logoUrl: 'https://languagetool.org/logo.png'
    },
    { 
      id: 42, 
      name: 'After the Deadline', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'After the Deadline is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://afterthedeadline.com',
      logoUrl: 'https://afterthedeadline.com/logo.png'
    },
    { 
      id: 43, 
      name: 'AutoCrit', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 198,
      description: 'AutoCrit is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://autocrit.com',
      logoUrl: 'https://autocrit.com/logo.png'
    },
    { 
      id: 44, 
      name: 'Slick Write', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 256,
      description: 'Slick Write is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://slickwrite.com',
      logoUrl: 'https://slickwrite.com/logo.png'
    },
    { 
      id: 45, 
      name: 'Ginger Software', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 145,
      description: 'Ginger Software is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://gingersoftware.com',
      logoUrl: 'https://gingersoftware.com/logo.png'
    },
    { 
      id: 46, 
      name: 'WhiteSmoke', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 234,
      description: 'WhiteSmoke is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://whitesmoke.com',
      logoUrl: 'https://whitesmoke.com/logo.png'
    },
    { 
      id: 47, 
      name: 'PaperRater', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 312,
      description: 'PaperRater is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://paperrater.com',
      logoUrl: 'https://paperrater.com/logo.png'
    },
    { 
      id: 48, 
      name: 'Scribens', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'Scribens is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://scribens.com',
      logoUrl: 'https://scribens.com/logo.png'
    },
    { 
      id: 49, 
      name: 'LanguageTool', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 198,
      description: 'LanguageTool is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://languagetool.org',
      logoUrl: 'https://languagetool.org/logo.png'
    },
    { 
      id: 50, 
      name: 'After the Deadline', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 256,
      description: 'After the Deadline is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://afterthedeadline.com',
      logoUrl: 'https://afterthedeadline.com/logo.png'
    },
    { 
      id: 51, 
      name: 'AutoCrit', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 145,
      description: 'AutoCrit is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://autocrit.com',
      logoUrl: 'https://autocrit.com/logo.png'
    },
    { 
      id: 52, 
      name: 'Slick Write', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 234,
      description: 'Slick Write is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://slickwrite.com',
      logoUrl: 'https://slickwrite.com/logo.png'
    },
    { 
      id: 53, 
      name: 'Ginger Software', 
      rating: 4, 
      type: 'Freemium', 
      role: 'Marketer', 
      process: 'Development',
      likes: 312,
      description: 'Ginger Software is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://gingersoftware.com',
      logoUrl: 'https://gingersoftware.com/logo.png'
    },
    { 
      id: 54, 
      name: 'WhiteSmoke', 
      rating: 4, 
      type: 'Paid', 
      role: 'Marketer', 
      process: 'Development',
      likes: 278,
      description: 'WhiteSmoke is an AI-powered writing assistant that helps you create high-quality content for various purposes.',
      url: 'https://whitesmoke.com',
      logoUrl: 'https://whitesmoke.com/logo.png'
    },
  ];

  // Get unique roles, processes, and prices from the data
  const roles = [...new Set(allTools.map(tool => tool.role))];
  const processes = [...new Set(allTools.map(tool => tool.process))];
  const prices = [...new Set(allTools.map(tool => tool.type))];
  // Generate rating options (1-5)
  const ratings = [1, 2, 3, 4, 5];
  // Generate likes ranges
  const likesRanges = [
    { min: 0, max: 200, label: '0-200' },
    { min: 201, max: 300, label: '201-300' },
    { min: 301, max: 400, label: '301-400' },
    { min: 401, max: 500, label: '401-500' },
    { min: 501, max: 1000, label: '501+' }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLikesRanges, setSelectedLikesRanges] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  
  // UI state for dropdowns
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [processDropdownOpen, setProcessDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [likesDropdownOpen, setLikesDropdownOpen] = useState(false);
  
  const toolsPerPage = 9;

  // Create refs for the dropdowns
  const roleDropdownRef = useRef(null);
  const processDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);
  const likesDropdownRef = useRef(null);
  
  // Initialize filtered tools with all tools
  useEffect(() => {
    setFilteredTools(allTools);
  }, []);

  // Add event listener to detect outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
      if (processDropdownRef.current && !processDropdownRef.current.contains(event.target)) {
        setProcessDropdownOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setPriceDropdownOpen(false);
      }
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setRatingDropdownOpen(false);
      }
      if (likesDropdownRef.current && !likesDropdownRef.current.contains(event.target)) {
        setLikesDropdownOpen(false);
      }
    }
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle checkbox changes
  const handleRoleChange = (role) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role]
    );
  };

  const handleProcessChange = (process) => {
    setSelectedProcesses(prev => 
      prev.includes(process) 
        ? prev.filter(p => p !== process) 
        : [...prev, process]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrices(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price) 
        : [...prev, price]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  const handleLikesRangeChange = (rangeIndex) => {
    setSelectedLikesRanges(prev => 
      prev.includes(rangeIndex) 
        ? prev.filter(r => r !== rangeIndex) 
        : [...prev, rangeIndex]
    );
  };

  // Apply filters when user clicks Apply Filters button
  const handleApplyFilters = () => {
    let result = [...allTools];
    
    // Apply search filter - search by name or description only
    if (searchTerm) {
      result = result.filter(tool => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
               tool.description.toLowerCase().includes(lowerCaseSearchTerm);
      });
    }
    
    // Apply role filters
    if (selectedRoles.length > 0) {
      result = result.filter(tool => 
        selectedRoles.includes(tool.role)
      );
    }
    
    // Apply process filters
    if (selectedProcesses.length > 0) {
      result = result.filter(tool => 
        selectedProcesses.includes(tool.process)
      );
    }
    
    // Apply price filters
    if (selectedPrices.length > 0) {
      result = result.filter(tool => 
        selectedPrices.includes(tool.type)
      );
    }
    
    // Apply rating filters
    if (selectedRatings.length > 0) {
      result = result.filter(tool => 
        selectedRatings.includes(tool.rating)
      );
    }
    
    // Apply likes range filters
    if (selectedLikesRanges.length > 0) {
      result = result.filter(tool => {
        return selectedLikesRanges.some(rangeIndex => {
          const range = likesRanges[rangeIndex];
          if (range.max === 1000) { // For the 501+ range
            return tool.likes >= range.min;
          } else {
            return tool.likes >= range.min && tool.likes <= range.max;
          }
        });
      });
    }
    
    setFilteredTools(result);
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterApplied(true);
  };

  // Reset filters and display all tools
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRoles([]);
    setSelectedProcesses([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
    setSelectedLikesRanges([]);
    setFilteredTools(allTools);
    setIsFilterApplied(false);
  };

  // Real-time search filter
  useEffect(() => {
    if (searchTerm) {
      const searchResults = allTools.filter(tool => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        // Search by name or description only
        return tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
               tool.description.toLowerCase().includes(lowerCaseSearchTerm);
      });
      
      // Apply other active filters to search results
      let result = [...searchResults];
      
      if (selectedRoles.length > 0) {
        result = result.filter(tool => selectedRoles.includes(tool.role));
      }
      
      if (selectedProcesses.length > 0) {
        result = result.filter(tool => selectedProcesses.includes(tool.process));
      }
      
      if (selectedPrices.length > 0) {
        result = result.filter(tool => selectedPrices.includes(tool.type));
      }
      
      if (selectedRatings.length > 0) {
        result = result.filter(tool => selectedRatings.includes(tool.rating));
      }
      
      if (selectedLikesRanges.length > 0) {
        result = result.filter(tool => {
          return selectedLikesRanges.some(rangeIndex => {
            const range = likesRanges[rangeIndex];
            if (range.max === 1000) { // For the 501+ range
              return tool.likes >= range.min;
            } else {
              return tool.likes >= range.min && tool.likes <= range.max;
            }
          });
        });
      }
      
      setFilteredTools(result);
    } else if (isFilterApplied) {
      // If there's no search term but other filters are applied, reapply those filters
      handleApplyFilters();
    } else {
      // If no filters are applied, show all tools
      setFilteredTools(allTools);
    }
  }, [searchTerm]);

  // Get current tools
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper to close other dropdowns when one is opened
  const handleDropdownToggle = (dropdown) => {
    if (dropdown === 'role') {
      setRoleDropdownOpen(!roleDropdownOpen);
      setProcessDropdownOpen(false);
      setPriceDropdownOpen(false);
      setRatingDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'process') {
      setProcessDropdownOpen(!processDropdownOpen);
      setRoleDropdownOpen(false);
      setPriceDropdownOpen(false);
      setRatingDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'price') {
      setPriceDropdownOpen(!priceDropdownOpen);
      setRoleDropdownOpen(false);
      setProcessDropdownOpen(false);
      setRatingDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'rating') {
      setRatingDropdownOpen(!ratingDropdownOpen);
      setRoleDropdownOpen(false);
      setProcessDropdownOpen(false);
      setPriceDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'likes') {
      setLikesDropdownOpen(!likesDropdownOpen);
      setRoleDropdownOpen(false);
      setProcessDropdownOpen(false);
      setPriceDropdownOpen(false);
      setRatingDropdownOpen(false);
    }
  };

  return (
    <div className="tool-grid-container">
      <h2 className="section-title">All AI Tools</h2>

      <div className="tools-filter">
        <div className="filter-row">
          <div className="filter-input">
            <label>Search</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search by tool name or description" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon"><FaSearch /></span>
            </div>
          </div>
        </div>
        
        <div className="filter-row">
          {/* Role Filter Dropdown */}
          <div className="filter-dropdown" ref={roleDropdownRef}>
            <label>Role</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('role')}>
              <span>
                {selectedRoles.length === 0 
                  ? 'All Roles' 
                  : selectedRoles.length === 1 
                    ? selectedRoles[0] 
                    : `${selectedRoles.length} roles selected`}
              </span>
              <span className={`dropdown-arrow ${roleDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {roleDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoles(roles);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoles([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {roles.map(role => (
                  <label key={role} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleChange(role)}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Process Filter Dropdown */}
          <div className="filter-dropdown" ref={processDropdownRef}>
            <label>Process</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('process')}>
              <span>
                {selectedProcesses.length === 0 
                  ? 'All Processes' 
                  : selectedProcesses.length === 1 
                    ? selectedProcesses[0] 
                    : `${selectedProcesses.length} processes selected`}
              </span>
              <span className={`dropdown-arrow ${processDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {processDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProcesses(processes);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProcesses([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {processes.map(process => (
                  <label key={process} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedProcesses.includes(process)}
                      onChange={() => handleProcessChange(process)}
                    />
                    <span>{process}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Price Filter Dropdown */}
          <div className="filter-dropdown" ref={priceDropdownRef}>
            <label>Price</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('price')}>
              <span>
                {selectedPrices.length === 0 
                  ? 'All Prices' 
                  : selectedPrices.length === 1 
                    ? selectedPrices[0] 
                    : `${selectedPrices.length} prices selected`}
              </span>
              <span className={`dropdown-arrow ${priceDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {priceDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPrices(prices);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPrices([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {prices.map(price => (
                  <label key={price} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedPrices.includes(price)}
                      onChange={() => handlePriceChange(price)}
                    />
                    <span>{price}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="filter-row">
          {/* Rating Filter Dropdown */}
          <div className="filter-dropdown" ref={ratingDropdownRef}>
            <label>Rating</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('rating')}>
              <span>
                {selectedRatings.length === 0 
                  ? 'All Ratings' 
                  : selectedRatings.length === 1 
                    ? `${selectedRatings[0]} Star` 
                    : `${selectedRatings.length} ratings selected`}
              </span>
              <span className={`dropdown-arrow ${ratingDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {ratingDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRatings(ratings);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRatings([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {ratings.map(rating => (
                  <label key={rating} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <span>{rating} {rating === 1 ? 'Star' : 'Stars'}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Likes Filter Dropdown */}
          <div className="filter-dropdown" ref={likesDropdownRef}>
            <label>Likes</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('likes')}>
              <span>
                {selectedLikesRanges.length === 0 
                  ? 'All Likes' 
                  : selectedLikesRanges.length === 1 
                    ? likesRanges[selectedLikesRanges[0]].label 
                    : `${selectedLikesRanges.length} ranges selected`}
              </span>
              <span className={`dropdown-arrow ${likesDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {likesDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLikesRanges(likesRanges.map((_, index) => index));
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLikesRanges([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {likesRanges.map((range, index) => (
                  <label key={index} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedLikesRanges.includes(index)}
                      onChange={() => handleLikesRangeChange(index)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="filter-buttons">
          <button className="filter-button reset-button" onClick={resetFilters}>Reset</button>
          <button className="filter-button apply-button" onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      </div>
    
      <div className="tool-grid">
        {currentTools.length > 0 ? (
          currentTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="no-tools-message">
            <p>No tools found matching your search criteria.</p>
            <button className="reset-search-button" onClick={resetFilters}>Reset Filters</button>
          </div>
        )}
      </div>
      
      <Pagination 
        itemsPerPage={toolsPerPage} 
        totalItems={filteredTools.length} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ToolGrid;