import React, { useEffect } from 'react';

function PageTitle({ title, description }) {
  useEffect(() => {
    document.title = `${title} | WebDevAI Tools`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
}

export default PageTitle; 