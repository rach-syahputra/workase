import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Geist',
  fonts: [
    { src: '/fonts/Geist-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Geist-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Geist-Medium.ttf', fontWeight: 'medium' },
  ],
});

export const styles = StyleSheet.create({
  main: {
    fontFamily: 'Geist',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
    paddingBottom: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#121216',
    padding: '20px 24px',
    color: '#ffffff',
    gap: 12,
  },
  headerHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  headerName: {
    fontWeight: 700,
    fontSize: 28,
  },
  headerRole: {
    fontWeight: 700,
  },
  headerContact: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  headerContactTitle: {
    fontWeight: 500,
    padding: '4px 8px',
    backgroundColor: '#ffffff',
    color: '#121216',
    textTransform: 'uppercase',
    marginBottom: 4,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px 24px',
  },
  sectionTitle: {
    fontWeight: 500,
    padding: '4px 8px',
    backgroundColor: '#121216',
    color: '#ffffff',
    textTransform: 'uppercase',
    marginBottom: 8,
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
