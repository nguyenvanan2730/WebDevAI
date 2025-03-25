import React, { useState, useEffect } from 'react';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import './ToolGrid.css';

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

  const [currentPage, setCurrentPage] = useState(1);
  const [currentTools, setCurrentTools] = useState([]);
  const itemsPerPage = 16;

  // Calculate current page of tools
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentTools(allTools.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, allTools]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the grid when page changes
    window.scrollTo({
      top: document.querySelector('.tool-grid').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div className="tool-grid-container">
      <div className="tool-grid">
        {currentTools.map(tool => (
          <div key={tool.id} className="tool-grid-item">
            <ToolCard 
              id={tool.id}
              name={tool.name}
              rating={tool.rating}
              type={tool.type}
              role={tool.role}
              process={tool.process}
              likes={tool.likes}
              description={tool.description}
              url={tool.url}
            />
          </div>
        ))}
      </div>
      <Pagination 
        totalItems={allTools.length} 
        itemsPerPage={itemsPerPage} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}

export default ToolGrid; 