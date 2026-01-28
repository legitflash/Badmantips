'use client';

import { useState } from 'react';
import type { Tip } from '@/lib/types';
import { getQualityAssessment } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, Calendar, CheckCircle2, CircleDashed, Flame, Trophy, XCircle, Loader2 } from 'lucide-react';
import type { AssessTipQualityOutput } from '@/ai/flows/assess-tip-quality';
import { format } from 'date-fns';

function ResultBadge({ result }: { result: Tip['result'] }) {
  if (result === 'Won') {
    return <Badge className="border-transparent bg-green-600 text-primary-foreground hover:bg-green-600/80"><Trophy className="mr-1 h-3 w-3" /> Won</Badge>;
  }
  if (result === 'Lost') {
    return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Lost</Badge>;
  }
  return <Badge variant="secondary"><CircleDashed className="mr-1 h-3 w-3" /> Pending</Badge>;
}

export function TipCard({ tip }: { tip: Tip }) {
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<AssessTipQualityOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAssessClick = async () => {
    setIsDialogOpen(true);
    if (assessment) return;

    setIsAssessing(true);
    const result = await getQualityAssessment(tip.details);
    setAssessment(result);
    setIsAssessing(false);
  };
  
  const handleDialogChange = (open: boolean) => {
      setIsDialogOpen(open);
  }

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <CardDescription className="flex items-center gap-2 text-xs">
              <Calendar className="h-4 w-4" />
              {format(new Date(tip.date), 'MMM d, yyyy')}
            </CardDescription>
            <ResultBadge result={tip.result} />
          </div>
          <CardTitle className="text-base font-normal">{tip.league}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-4">
          <div className="space-y-1 text-center text-lg font-semibold">
            <p>{tip.match.homeTeam}</p>
            <p className="text-sm font-normal text-muted-foreground">vs</p>
            <p>{tip.match.awayTeam}</p>
          </div>
          <div className="mt-4 rounded-lg bg-secondary/30 p-3 text-center">
            <p className="text-sm text-muted-foreground">Prediction</p>
            <p className="text-xl font-bold text-primary">{tip.prediction}</p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
             <Flame className="h-4 w-4 text-accent" />
             <span>Confidence: {tip.confidence}%</span>
          </div>
        </CardContent>
        <CardFooter className="bg-secondary/30 p-4">
          <Button onClick={handleAssessClick} className="w-full" variant="outline">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Assess Tip Quality
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BrainCircuit />
              AI Quality Assessment
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 min-h-[120px] flex items-center justify-center">
            {isAssessing && (
              <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p className="text-lg">Analyzing tip rationale...</p>
              </div>
            )}
            {assessment && (
              <Alert variant={assessment.isHighQuality ? "default" : "destructive"}>
                {assessment.isHighQuality ? (
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {assessment.isHighQuality ? 'High Quality Tip' : 'Low Quality Tip'}
                </AlertTitle>
                <AlertDescription>
                  {assessment.qualityAssessment}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
