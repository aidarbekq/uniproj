import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { RefreshCw, FileText } from 'lucide-react';
import api from '@/services/api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StatYear {
  total: number;
  employed: number;
  unemployed: number;
  percent_employed: number;
}

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Record<string, StatYear>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('analytics/employment-stats/');
        setStats(res.data);
      } catch (error) {
        console.error('Ошибка загрузки статистики', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const years = Object.keys(stats);
  const lineData = years.map((year) => ({ year, rate: stats[year].percent_employed }));
  const totalGraduates = years.length > 0 ? stats[years[years.length - 1]].total : 0;
  const employedGraduates = years.length > 0 ? stats[years[years.length - 1]].employed : 0;
  const lastYear = years[years.length - 1];

  if (loading) return <p className="text-center mt-8">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{t('admin.dashboard')}</h1>
          <p className="text-gray-500">{t('Employment statistics overview')}</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={() => window.location.reload()}>
            {t('Refresh')}
          </Button>
          <Button variant="outline" size="sm" leftIcon={<FileText className="h-4 w-4" />}>
            {t('Export Report')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>{t('Overall Employment')}</CardTitle></CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-primary-600 mb-2">{Math.round((employedGraduates / totalGraduates) * 100)}%</div>
            <p className="text-gray-500">{t('Graduates employed for')} {lastYear}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('Total Graduates')}</CardTitle></CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-secondary-600 mb-2">{totalGraduates}</div>
            <p className="text-gray-500">{t('in')} {lastYear}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('Note')}</CardTitle></CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-500">{t('Some charts below are based on demo data and will be linked to backend soon.')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader><CardTitle>{t('Employment Rate Trend')}</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: any) => [`${v}%`, t('Employment Rate')]} />
                  <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
