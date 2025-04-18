import Link from 'next/link';

import { UserAssessmentActiveTab } from '@/lib/interfaces/user-assessment';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import AssessmentDiscovery from './assessment-discovery';
import AssessmentHistory from './assessment-history';

interface AssessmentTabProps {
  activeTab: UserAssessmentActiveTab;
}

const AssessmentTab = ({ activeTab }: AssessmentTabProps) => {
  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger asChild value="discovery" className="w-full">
          <Link href="/dashboard/assessments?tab=discovery">Discovery</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="history" className="w-full">
          <Link href="/dashboard/assessments?tab=history">History</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="discovery">
        <AssessmentDiscovery />
      </TabsContent>
      <TabsContent value="history">
        <AssessmentHistory />
      </TabsContent>
    </Tabs>
  );
};

export default AssessmentTab;
