'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { ComponentType } from '@/lib/registry';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Simple client-side cache for component codes
const codeCache = new Map<string, string>();

export function ComponentCode({ component }: { component: ComponentType }) {
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch all component files with client-side caching
    const fetchFiles = async () => {
      setLoading(true);
      const contents: Record<string, string> = {};

      try {
        // Process files in parallel for faster loading
        await Promise.all(
          component.files.map(async (file) => {
            const filePath = file.path;

            // Check client-side cache first
            if (codeCache.has(filePath)) {
              contents[filePath] = codeCache.get(filePath)!;
              return;
            }

            try {
              const response = await fetch(
                `/api/component-code?path=${filePath}`,
                {
                  // Use cache: 'force-cache' to leverage browser's HTTP cache
                  cache: 'force-cache',
                },
              );
              console.log(filePath);

              if (response.ok) {
                const data = await response.json();
                contents[filePath] = data.code;

                // Store in client-side cache
                codeCache.set(filePath, data.code);
              } else {
                contents[filePath] = `// Error loading file: ${filePath}`;
              }
            } catch (error) {
              console.error(`Error loading file ${filePath}:`, error);
              contents[filePath] = `// Error loading file: ${filePath}`;
            }
          }),
        );

        setFileContents(contents);

        // Set the first file as active by default
        if (component.files.length > 0) {
          setActiveFile(component.files[0].path);
        }
      } catch (error) {
        console.error('Error fetching component files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [component]);

  const copyToClipboard = () => {
    if (activeFile && fileContents[activeFile]) {
      navigator.clipboard.writeText(fileContents[activeFile]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine language for syntax highlighting
  const getLanguage = (filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase() || '';

    switch (extension) {
      case 'tsx':
        return 'tsx';
      case 'ts':
        return 'typescript';
      case 'jsx':
        return 'jsx';
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'scss':
        return 'scss';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'javascript';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[320px]">
        Loading code...
      </div>
    );
  }

  if (component.files.length === 0) {
    return (
      <div className="flex items-center justify-center h-[320px] text-muted-foreground">
        No code files available.
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full">
      {component.files.length > 1 && (
        <Tabs
          value={activeFile}
          onValueChange={setActiveFile}
          className="w-full"
        >
          <TabsList className="w-full justify-start">
            {component.files.map((file) => (
              <TabsTrigger
                key={file.path}
                value={file.path}
                className="text-xs"
              >
                {file.path.split('/').pop()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="relative min-h-[400px] overflow-auto">
        <Button
          variant="outline"
          size="icon"
          className="absolute right-5 top-2 z-10"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>

        {activeFile && (
          <SyntaxHighlighter
            language={getLanguage(activeFile)}
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '0.5rem',
              padding: '1.5rem',
              fontSize: '0.875rem',
              height: '100%',
              margin: 0,
            }}
          >
            {fileContents[activeFile] || '// File content not available'}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
