'use client';

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { FileText, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";

interface ContentData {
  content_id: string;
  total_pages: number;
  processed_at: string;
  pdf_info: {
    filename?: string;
    file_size?: number;
  };
  pages: Array<{
    page_number: number;
    text: string;
    text_length: number;
    image_count: number;
  }>;
}

interface ContentViewerProps {
  contentId: string;
  title: string;
}

export function ContentViewer({ contentId, title }: ContentViewerProps) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'text' | 'pdf'>('text');

  useEffect(() => {
    loadContent();
  }, [contentId]);

  const loadContent = async () => {
    try {
      console.log('📖 Loading extracted content for:', contentId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setContent(result.data);
          console.log('✅ Content loaded:', result.data);
        } else {
          setError('Failed to load content data');
        }
      } else {
        setError(`Failed to fetch content: ${response.status}`);
      }
    } catch (err) {
      console.error('❌ Error loading content:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageContent = () => {
    if (!content || !content.pages) return null;
    return content.pages.find(p => p.page_number === currentPage - 1) || content.pages[0];
  };

  const nextPage = () => {
    if (content && currentPage < content.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadPdf = () => {
    const pdfUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdf/${contentId}`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = content?.pdf_info?.filename || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewPdf = () => {
    const pdfUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdf/${contentId}`;
    window.open(pdfUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading extracted content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-semibold mb-2">Failed to Load Content</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={loadContent} className="w-full">
                  Try Again
                </Button>
                <Button variant="outline" onClick={downloadPdf} className="w-full">
                  Download Original PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Content Available</h3>
              <p className="text-muted-foreground mb-4">The document content could not be extracted.</p>
              <Button variant="outline" onClick={downloadPdf}>
                Download Original PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPageContent = getCurrentPageContent();

  return (
    <div className="h-full flex flex-col">
      {/* Header with controls */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">
                {content.total_pages} pages • {content.pages?.reduce((acc, p) => acc + p.text_length, 0).toLocaleString()} characters extracted
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'text' ? 'pdf' : 'text')}
            >
              <Eye className="h-4 w-4 mr-2" />
              {viewMode === 'text' ? 'View PDF' : 'View Text'}
            </Button>
            <Button variant="outline" size="sm" onClick={downloadPdf}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'text' ? (
        <>
          {/* Page navigation */}
          <div className="bg-muted/50 border-b p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {content.total_pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === content.total_pages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {currentPageContent && (
                <div className="text-sm text-muted-foreground">
                  {currentPageContent.text_length.toLocaleString()} characters
                  {currentPageContent.image_count > 0 && (
                    <> • {currentPageContent.image_count} images</>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content display */}
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-6">
                {currentPageContent ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="bg-muted/30 p-3 rounded-lg mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Page {currentPageContent.page_number + 1} Content
                      </h3>
                    </div>
                    
                    {currentPageContent.text ? (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {currentPageContent.text}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No text content found on this page</p>
                        {currentPageContent.image_count > 0 && (
                          <p className="text-sm text-muted-foreground mt-2">
                            This page contains {currentPageContent.image_count} images
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Page content not available</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </>
      ) : (
        /* PDF View Mode */
        <div className="flex-1">
          <iframe
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/pdf/${contentId}#page=${currentPage}`}
            className="w-full h-full border-0"
            title={title}
          />
        </div>
      )}
    </div>
  );
}
