import { MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "../../../shared/components/ui/card";
import type { FeedbackStats } from "../types";

interface StatsCardsProps {
  stats: FeedbackStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Feedback</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pendientes}</p>
            </div>
            <div className="p-2 rounded-lg bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">En Revisión</p>
              <p className="text-2xl font-bold text-blue-600">{stats.enRevision}</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resueltos</p>
              <p className="text-2xl font-bold text-green-600">{stats.resueltos}</p>
            </div>
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
