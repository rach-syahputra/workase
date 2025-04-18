'use client';

import { Document, Page, Text, View, Image } from '@react-pdf/renderer';

import { certificateStyles as styles } from './certificate-pdf-styles';

interface CertificatePdfProps {
  name: string;
  skill: string;
  qrCodeUrl: string;
  slug: string;
  date: string;
}

const CertificatePdf = ({
  name,
  skill,
  qrCodeUrl,
  slug,
  date,
}: CertificatePdfProps) => (
  <Document>
    <Page size={{ width: 1056, height: 816 }} style={styles.page}>
      <View style={styles.outerBorder}>
        <View style={styles.innerBorder}>
          <View style={styles.content}>
            <Image style={styles.logo} src="/workase.png" />

            <Text style={styles.title}>Certificate of Completion</Text>
            <Text style={styles.description}>
              Awarded for successfully completing a skill-based assessment in
            </Text>
            <View style={styles.skillBox}>
              <Image
                style={styles.skillBoxBackground}
                src="/certificate-skill-background.png"
              />
              <View style={styles.skillBoxText}>
                <Text>{skill}</Text>
              </View>
            </View>
            <Text style={styles.presentedTo}>Presented to</Text>
            <Text style={styles.recipient}>{name}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.signatureContainer}>
              <Text style={styles.signatureDate}>{date}</Text>
              <Image style={styles.signature} src="/signature.png" />
              <View style={styles.signatureFooter}>
                <Text style={styles.signatureName}>Rachmat Syahputra</Text>
                <Text>Chief Executive Officer</Text>
              </View>
            </View>
            <View style={styles.qrCodeContainer}>
              <Image style={styles.qrCodeImage} src={qrCodeUrl} />
              <View style={styles.qrCodeFooter}>
                <Text style={styles.qrCodeText}>Certificate Verification</Text>
                <Text>ID: {slug}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificatePdf;
