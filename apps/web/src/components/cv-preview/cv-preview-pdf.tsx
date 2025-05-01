import { Page, Text, View, Document } from '@react-pdf/renderer';

import { ICvData } from '@/lib/interfaces/cv';
import { cvPreviewStyles as styles } from './cv-preview-pdf-styles';

interface CvPreviewPdfProps {
  cv: {
    slug: string;
    data: ICvData;
  };
}

const CvPreviewPdf = ({ cv }: CvPreviewPdfProps) => {
  const { header, summary, experience, education, skill } = cv.data;

  return (
    <Document
      title={`CV-${cv.data.header?.content.name.toUpperCase()}-${cv.data.header?.content.role.toUpperCase()}-${cv.slug}`}
      creator={header?.content.name.toUpperCase()}
      producer="Workase"
      pageLayout="singlePage"
    >
      <Page size="A4" style={styles.main}>
        {header?.content && (
          <View style={styles.header}>
            <Text style={styles.headerName}>{header?.content.name}</Text>
            <Text>{header?.content.role}</Text>
            <View style={styles.headerContact}>
              <Text>{header?.content.email}</Text>
              <Text>•</Text>
              <Text>{header?.content.phoneNumber}</Text>
            </View>
          </View>
        )}

        {summary?.content && (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <View style={styles.sectionHeaderSeparator}></View>
            <Text>{summary.content}</Text>
          </View>
        )}

        {education && education?.contents.length > 0 && (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.sectionHeaderSeparator}></View>
            {education.contents.map((content, index) => (
              <View key={index} style={styles.educationWrapper}>
                <View style={styles.educationInstitutionWrapper}>
                  <Text style={styles.educationInstitutionName}>
                    {content.institution}
                  </Text>
                  <Text>{content.major}</Text>
                </View>
                <Text>
                  {content.startDate} - {content.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {experience && experience.contents.length > 0 && (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            <View style={styles.sectionHeaderSeparator}></View>
            <View style={styles.experienceList}>
              {experience.contents.map((content, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceCompany}>
                      {content.company}
                    </Text>
                    <Text>
                      {content.startDate} - {content.endDate}
                    </Text>
                  </View>
                  <Text style={styles.experienceRole}>{content.role}</Text>
                  <View style={styles.experienceTasksList}>
                    {content.tasks &&
                      content.tasks.length > 0 &&
                      content.tasks.map((task, i) => (
                        <View key={index} style={styles.experienceTaskItem}>
                          <View style={styles.experienceTaskItemBulletWrapper}>
                            <View
                              style={styles.experienceTaskItemBullet}
                            ></View>
                          </View>
                          <Text>{task}</Text>
                        </View>
                      ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {skill && skill.contents.length > 0 && (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>SKILL</Text>
            <View style={styles.sectionHeaderSeparator}></View>
            <View style={styles.skillList}>
              {skill.contents.map((content, index) => (
                <View key={index} style={styles.skillItem}>
                  <View style={styles.skillItemBullet}></View>
                  <Text>{content}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CvPreviewPdf;
