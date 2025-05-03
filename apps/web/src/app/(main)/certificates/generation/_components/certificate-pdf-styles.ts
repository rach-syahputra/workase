import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Geist',
  fonts: [
    { src: '/fonts/Geist-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Geist-Medium.ttf', fontWeight: 'medium' },
    { src: '/fonts/Geist-Bold.ttf', fontWeight: 'bold' },
  ],
});

Font.register({
  family: 'Tex',
  fonts: [
    {
      src: '/fonts/texgyretermes-regular.otf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/texgyretermes-bold.otf',
      fontWeight: 'bold',
    },
  ],
});

const color = {
  dark: '#121216',
};

export const certificateStyles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: 'white',
    width: 1056,
    height: 816,
  },
  outerBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 32,
    borderColor: color.dark,
    padding: 64,
  },
  innerBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: color.dark,
    padding: 32,
    justifyContent: 'space-between',
  },
  content: {
    padding: 16,
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 24,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: color.dark,
    fontFamily: 'Tex',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: color.dark,
    fontFamily: 'Geist',
  },
  skillBox: {
    position: 'relative',
    color: 'white',
    width: 500,
    height: 60,
    fontSize: 18,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  skillBoxBackground: {
    width: '100%',
    height: '100%',
  },
  skillBoxText: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 26,
    fontFamily: 'Geist',
    fontWeight: 'medium',
  },
  presentedTo: {
    fontSize: 16,
    marginBottom: 8,
    color: color.dark,
    fontFamily: 'Geist',
  },
  recipient: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066ff',
    fontFamily: 'Geist',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  signatureContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  signature: {
    width: 125,
    height: 72.14,
    objectFit: 'cover',
  },
  signatureDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signatureFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  signatureName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  qrCodeImage: {
    height: 100,
    width: 100,
  },
  qrCodeFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-end',
  },
  qrCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrCode: {},
});
