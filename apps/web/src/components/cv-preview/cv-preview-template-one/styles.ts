import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Times-New-Roman',
  fonts: [
    { src: '/fonts/times-new-roman.ttf', fontWeight: 'normal' },
    { src: '/fonts/times-new-roman-bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/times-new-roman-italic.ttf', fontStyle: 'italic' },
  ],
});

export const styles = StyleSheet.create({
  main: {
    fontFamily: 'Times-New-Roman',
    padding: 24,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  headerName: {
    fontWeight: 700,
  },
  headerContact: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  sectionHeaderSeparator: {
    height: 2,
    width: '100%',
    backgroundColor: '#000000',
    marginBottom: 4,
  },
  summaryContent: {
    lineHeight: 24,
  },
  educationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  educationInstitutionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  educationInstitutionName: {
    fontWeight: 700,
  },
  experienceHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  experienceList: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  experienceItem: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  experienceCompany: {
    fontWeight: 700,
  },
  experienceRole: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  experienceTasksList: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 14,
    gap: 4,
  },
  experienceTaskItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  experienceTaskItemBulletWrapper: {
    paddingTop: 4,
  },
  experienceTaskItemBullet: {
    width: 5,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 999,
  },
  skillList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  skillItem: {
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skillItemBullet: {
    width: 5,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 999,
  },
});
