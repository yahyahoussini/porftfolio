import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  RefreshCw,
  X
} from 'lucide-react';
import { useCrawlErrors } from '@/hooks/useSEO';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const CrawlErrorsWidget = () => {
  const { errors, loading, resolveError } = useCrawlErrors(10);
  const { toast } = useToast();

  const unresolvedErrors = errors.filter(error => !error.resolved);
  const criticalErrors = unresolvedErrors.filter(error => 
    error.status_code && error.status_code >= 500
  );

  const getErrorTypeColor = (errorType: string) => {
    switch (errorType.toLowerCase()) {
      case '404':
      case 'not_found':
        return 'destructive';
      case '500':
      case 'server_error':
        return 'destructive';
      case '403':
      case 'forbidden':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusCodeBadge = (statusCode?: number) => {
    if (!statusCode) return null;
    
    if (statusCode >= 500) return 'destructive';
    if (statusCode >= 400) return 'secondary';
    return 'outline';
  };

  const handleResolveError = async (errorId: string) => {
    try {
      await resolveError(errorId);
      toast({
        title: "Error Resolved",
        description: "The crawl error has been marked as resolved."
      });
    } catch (error) {
      toast({
        title: "Failed to Resolve",
        description: "Could not mark the error as resolved. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Crawl Errors
          {criticalErrors.length > 0 && (
            <Badge variant="destructive">
              {criticalErrors.length} Critical
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Monitor crawling issues and server errors
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            Loading crawl errors...
          </div>
        ) : unresolvedErrors.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Active Issues</h3>
            <p className="text-sm text-muted-foreground">
              All crawl errors have been resolved
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {unresolvedErrors.slice(0, 5).map((error) => (
              <div
                key={error.id}
                className="flex items-start justify-between p-3 border rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getErrorTypeColor(error.error_type)}>
                      {error.error_type}
                    </Badge>
                    {error.status_code && (
                      <Badge variant={getStatusCodeBadge(error.status_code)}>
                        {error.status_code}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium truncate">
                    {error.url}
                  </p>
                  {error.error_message && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {error.error_message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Discovered {formatDistanceToNow(new Date(error.discovered_at))} ago
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(error.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveError(error.id)}
                  >
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            {unresolvedErrors.length > 5 && (
              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  +{unresolvedErrors.length - 5} more errors
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CrawlErrorsWidget;