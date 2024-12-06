'use client';

import type { ExtendedRecordMap } from 'notion-types';
import type React from 'react';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import { useTheme } from 'next-themes';
import './NotionPage.style.css';
import dynamic from 'next/dynamic';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import 'prismjs/themes/prism-twilight.css';
import { Checkbox } from '@repo/ui/ui/checkbox';
import { useIsMounted } from '@toss/react';

interface NotionPageProps {
  recordMap: ExtendedRecordMap | null;
}

function NextImageComponent(props: ImageProps) {
  return (
    <Image
      className='rounded-lg'
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
const CheckBox = (props: { isChecked: boolean, blockId?: string }) => {
  return (
    <Checkbox
      checked={props.isChecked}
    />
  )
}

const NotionPage: React.FC<NotionPageProps> = ({ recordMap }) => {
  const { resolvedTheme } = useTheme();
  const isMounted = useIsMounted();
  const isDark = resolvedTheme === 'dark' && isMounted;

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
    Checkbox: CheckBox,
  };

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={isDark}
      disableHeader={true}
      hideBlockId={true}
      isShowingSearch={false}
      pageTitle={false}
      showTableOfContents={true}
      showCollectionViewDropdown={false}
      components={components}
      forceCustomImages={true}
    />
  );
};

export default NotionPage;
