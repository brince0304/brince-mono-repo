'use client';

import type { ExtendedRecordMap } from 'notion-types';
import type React from 'react';
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import { useTheme } from 'next-themes';
import './NotionPage.style.css';
import dynamic from 'next/dynamic';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import 'prismjs/themes/prism-twilight.css';
import { UISkeleton } from '@repo/ui/UISkeleton';

interface NotionPageProps {
  recordMap: ExtendedRecordMap | null;
}

function NextImageComponent(props: ImageProps) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      title={props.alt}
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: '100%', height: 'auto' }}
      loading="lazy"
    />
  );
}

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code));

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf), {
  ssr: false,
});
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then((m) => m.Modal), {
  ssr: false,
});

const NotionPage: React.FC<NotionPageProps> = ({ recordMap }) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <UISkeleton.Post />;

  if (!recordMap) {
    return null;
  }

  const components = {
    Code,
    Equation,
    Pdf,
    Modal,
    nextImage: NextImageComponent,
    nextLink: Link,
    Collection: () => null,
  };

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={theme === 'dark'}
      disableHeader={true}
      hideBlockId={true}
      isShowingSearch={false}
      pageTitle={false}
      showTableOfContents={true}
      showCollectionViewDropdown={false}
      components={components}
      previewImages={true}
      forceCustomImages={true}
    />
  );
};

export default NotionPage;
